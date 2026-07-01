import React, { useState, useEffect, useRef } from 'react';
import { Sun, Sparkles, Sliders, Activity, Check, Pause, Play, Layers, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Define typed structural models for physical 3D ray-tracing simulation
interface PhysicalRay {
  id: number;
  type: 'direct' | 'specular' | 'diffuse';
  startX: number; startY: number; startZ: number;
  targetX: number; targetY: number; targetZ: number;
  currentX: number; currentY: number; currentZ: number;
  progress: number;
  speed: number;
  color: string;
  intensity: number;
}

interface AlbedoImpact {
  x: number;
  y: number;
  z: number;
  life: number; // 0 to 1 decay
}

export default function WebGLSolarVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // 1. PHYSICAL & GEOMETRICAL CONTROLS
  const [sunAngle, setSunAngle] = useState<number>(55); // Sunrise (15) to Sunset (165)
  const [panelTilt, setPanelTilt] = useState<number>(25); // 10 to 45 degrees
  const [groundClearance, setGroundClearance] = useState<number>(1.0); // 0.2m to 2.0m clearance
  const [albedoMaterial, setAlbedoMaterial] = useState<'Cool Roof Coating' | 'White Concrete' | 'Standard Roof' | 'Green Grass'>('Cool Roof Coating');
  const [soiling, setSoiling] = useState<number>(10); // 0 to 60% dust coverage
  const [bifaciality, setBifaciality] = useState<number>(85); // 50 to 95% Bifaciality Factor of TOPCon modules
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [showAlbedoRays, setShowAlbedoRays] = useState<boolean>(true);
  const [showSpecularRays, setShowSpecularRays] = useState<boolean>(true);
  const [controlTab, setControlTab] = useState<'environment' | 'surface' | 'quality'>('environment');

  const CONTROL_TABS = [
    { id: 'environment' as const, label: 'Sun & angles', short: 'Angles', icon: Sun },
    { id: 'surface' as const, label: 'Floor material', short: 'Surface', icon: Layers },
    { id: 'quality' as const, label: 'Panel quality', short: 'Quality', icon: Zap },
  ];

  // Stats / Metrics State
  const [physicsMetrics, setPhysicsMetrics] = useState({
    frontIrradiance: 850,
    rearIrradiance: 145,
    aoiDegrees: 15,
    fresnelLossFront: 4.1,
    groundViewFactor: 78,
    bifacialGainPercent: 14.5,
    monofacialPowerW: 340,
    bifacialPowerW: 395,
    yieldIncreasePercent: 16.2,
    co2OffsetDeltaKg: 12.5,
  });

  const raysRef = useRef<PhysicalRay[]>([]);
  const impactsRef = useRef<AlbedoImpact[]>([]);
  const nextRayIdRef = useRef<number>(1);
  const animationFrameRef = useRef<number | null>(null);

  // Albedo coefficients
  const albedoCoefficients = {
    'Cool Roof Coating': 0.92,
    'White Concrete': 0.85,
    'Standard Roof': 0.35,
    'Green Grass': 0.20
  };

  // 2. REALTIME OPTICAL PHYSICS MATHEMATICS
  useEffect(() => {
    const a = albedoCoefficients[albedoMaterial];
    
    // Solar constant adjusted by sun angle (sine law)
    const baseSolarConstant = 1000; // W/m2 under perfect STC
    const sunElevRad = (sunAngle * Math.PI) / 180;
    const directNormalIrradiance = baseSolarConstant * Math.sin(sunElevRad);

    // Geometry angles
    const tiltRad = (panelTilt * Math.PI) / 180;
    
    // Dot product for Angle of Incidence (AOI)
    // Unit sun vector (with slight south tilt offset for Indian subcontinent solar path)
    const sunX = -Math.cos(sunElevRad);
    const sunY = 0.22; // Constant south declination
    const sunZ = Math.sin(sunElevRad);
    const sunMag = Math.sqrt(sunX*sunX + sunY*sunY + sunZ*sunZ);
    const sX = sunX / sunMag;
    const sY = sunY / sunMag;
    const sZ = sunZ / sunMag;

    // Unit panel normal vector (tilted towards South - positive Y)
    const nX = 0;
    const nY = Math.sin(tiltRad);
    const nZ = Math.cos(tiltRad);

    // Cosine of Angle of Incidence (AOI)
    const cosAOI = Math.max(0, sX * nX + sY * nY + sZ * nZ);
    const aoiRad = Math.acos(cosAOI);
    const aoiDeg = Number((aoiRad * 180 / Math.PI).toFixed(1));

    // Fresnel reflection losses (air-to-glass, n=1.52)
    const R0 = 0.04;
    const fresnelReflection = R0 + (1 - R0) * Math.pow(1 - cosAOI, 5);
    const fresnelLossPercent = Number((fresnelReflection * 100).toFixed(1));

    // Front-side Irradiance components
    const frontBeam = directNormalIrradiance * cosAOI;
    const frontSkyDiffuse = 120 * Math.sin(sunElevRad) * ((1 + Math.cos(tiltRad)) / 2);
    const frontIrradianceTotal = Number((frontBeam + frontSkyDiffuse).toFixed(1));

    // Ground view factor calculation (how much ground albedo is captured based on clearance height)
    // Higher clearance means less blocking by panel shadow & more diffuse albedo sliding under
    const heightFactor = groundClearance / (groundClearance + 0.35); // clearance efficiency limit
    const groundViewFactorPercent = Math.round(heightFactor * 100);

    // Rear-side Irradiance (Albedo + Sky diffuse reach)
    const viewFactorGroundToRear = (1 - Math.cos(tiltRad)) / 2 + 0.15;
    const rearAlbedo = directNormalIrradiance * a * heightFactor * viewFactorGroundToRear;
    const rearSkyDiffuse = 40 * Math.sin(sunElevRad) * ((1 - Math.cos(tiltRad)) / 2);
    const rearIrradianceTotal = Number((rearAlbedo + rearSkyDiffuse).toFixed(1));

    // Losses factors
    const soilingLossFront = 1 - soiling / 100;
    const soilingLossRear = 1 - (0.35 * soiling) / 100; // back face soils ~65% slower

    // Effective absorbed energy (W/m2)
    const effFrontIrr = frontIrradianceTotal * soilingLossFront * (1 - fresnelReflection);
    const effRearIrr = rearIrradianceTotal * soilingLossRear * 0.95; // 5% average rear Fresnel

    // Bifacial Gain Percent
    const bifacialFactorVal = bifaciality / 100;
    const gainPercent = effFrontIrr > 10 ? (effRearIrr * bifacialFactorVal) / effFrontIrr * 100 : 0;

    // Module power outputs
    const moduleRatingWp = 440; // STC Rating
    const activeFrontIrrRatio = effFrontIrr / 1000;
    const activeRearIrrRatio = (effRearIrr * bifacialFactorVal) / 1000;

    const monofacialPower = Math.max(0, moduleRatingWp * activeFrontIrrRatio);
    const bifacialPower = Math.max(0, moduleRatingWp * (activeFrontIrrRatio + activeRearIrrRatio));

    const yieldIncrease = monofacialPower > 10 ? ((bifacialPower - monofacialPower) / monofacialPower) * 100 : 0;
    const dailyCo2SavedGrams = (bifacialPower - monofacialPower) * 0.82 * 12; // estimated daily offset difference in 12-panel system

    setPhysicsMetrics({
      frontIrradiance: frontIrradianceTotal,
      rearIrradiance: rearIrradianceTotal,
      aoiDegrees: aoiDeg,
      fresnelLossFront: fresnelLossPercent,
      groundViewFactor: groundViewFactorPercent,
      bifacialGainPercent: Number(gainPercent.toFixed(1)),
      monofacialPowerW: Math.round(monofacialPower),
      bifacialPowerW: Math.round(bifacialPower),
      yieldIncreasePercent: Number(yieldIncrease.toFixed(1)),
      co2OffsetDeltaKg: Number((dailyCo2SavedGrams / 1000).toFixed(2)),
    });
  }, [sunAngle, panelTilt, groundClearance, albedoMaterial, soiling, bifaciality]);

  // 3. CANVAS ANIMATION & PHOTON RAY TRACING ENGINE
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;

    // Dynamic scale/resolution adjustment using ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      window.requestAnimationFrame(() => {
        if (canvas && canvas.parentElement) {
          const rect = canvas.parentElement.getBoundingClientRect();
          const parentWidth = rect.width || canvas.parentElement.clientWidth;
          const parentHeight = rect.height || canvas.parentElement.clientHeight;
          const newWidth = Math.floor(parentWidth * window.devicePixelRatio);
          const newHeight = Math.floor(parentHeight * window.devicePixelRatio);
          
          if (canvas.width !== newWidth || canvas.height !== newHeight) {
            canvas.width = newWidth;
            canvas.height = newHeight;
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            width = newWidth;
            height = newHeight;
          }
        }
      });
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Isometric coordinates project
    const project = (x: number, y: number, z: number) => {
      const scale = width / 170;
      const originX = width / 2;
      const originY = height * 0.62;

      const isoX = originX + (x - y) * Math.cos(Math.PI / 6) * scale;
      const isoY = originY + (x + y) * Math.sin(Math.PI / 6) * scale - z * scale;
      return { x: isoX, y: isoY };
    };

    const animate = (time: number) => {
      const isLight = document.documentElement.classList.contains('light');
      const sunElevRad = (sunAngle * Math.PI) / 180;

      // 1. CLEAR CANVAS
      ctx.fillStyle = isLight ? '#f8fafc' : '#030712';
      ctx.fillRect(0, 0, width, height);

      // Technical 3D Isometric Grid on Ground Plane
      ctx.strokeStyle = isLight ? 'rgba(100, 116, 139, 0.28)' : 'rgba(31, 41, 55, 0.35)';
      ctx.lineWidth = 1;
      const stepGrid = 8;
      for (let g = -40; g <= 40; g += stepGrid) {
        // Grid lines parallel to X-axis
        const p1 = project(g, -40, 0);
        const p2 = project(g, 40, 0);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Grid lines parallel to Y-axis
        const p3 = project(-40, g, 0);
        const p4 = project(40, g, 0);
        ctx.beginPath();
        ctx.moveTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.stroke();
      }

      // 2. DEFINE SYSTEM SCENE GEOMETRY
      const W_panel = 34; // Panel rack width
      const L_panel = 16; // Panel rack length along tilt
      const H_clearance = groundClearance * 10; // Clearance height scaled for rendering
      const tiltRad = (panelTilt * Math.PI) / 180;

      const Z_front = H_clearance;
      const Z_back = H_clearance + L_panel * Math.sin(tiltRad);

      const Y_front = (L_panel * Math.cos(tiltRad)) / 2;
      const Y_back = -(L_panel * Math.cos(tiltRad)) / 2;

      // 4 Main frame corners
      const pBL = project(-W_panel / 2, Y_back, Z_back);  // Back-Left
      const pBR = project(W_panel / 2, Y_back, Z_back);   // Back-Right
      const pFR = project(W_panel / 2, Y_front, Z_front); // Front-Right
      const pFL = project(-W_panel / 2, Y_front, Z_front); // Front-Left

      // Draw reflective terrace concrete slab bounds
      const terracePoints = [
        project(-40, -40, 0),
        project(40, -40, 0),
        project(40, 40, 0),
        project(-40, 40, 0)
      ];

      ctx.beginPath();
      ctx.moveTo(terracePoints[0].x, terracePoints[0].y);
      for (let i = 1; i < terracePoints.length; i++) {
        ctx.lineTo(terracePoints[i].x, terracePoints[i].y);
      }
      ctx.closePath();

      // Configure surface color depending on material
      if (albedoMaterial === 'Cool Roof Coating') {
        ctx.fillStyle = isLight ? 'rgba(238, 242, 255, 0.7)' : 'rgba(56, 189, 248, 0.12)';
        ctx.strokeStyle = '#38bdf8';
      } else if (albedoMaterial === 'White Concrete') {
        ctx.fillStyle = isLight ? 'rgba(241, 245, 249, 0.8)' : 'rgba(226, 232, 240, 0.08)';
        ctx.strokeStyle = '#94a3b8';
      } else if (albedoMaterial === 'Standard Roof') {
        ctx.fillStyle = isLight ? 'rgba(226, 230, 235, 0.8)' : 'rgba(71, 85, 105, 0.06)';
        ctx.strokeStyle = '#475569';
      } else {
        ctx.fillStyle = isLight ? 'rgba(240, 253, 244, 0.8)' : 'rgba(16, 185, 129, 0.05)';
        ctx.strokeStyle = '#10b981';
      }
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      // Draw shadow cast on ground
      // Shadow changes position based on Sun angle and height clearance
      const sunRad = (sunAngle * Math.PI) / 180;
      const shadowShiftX = -Math.cos(sunRad) * (H_clearance + 8);
      const shadowShiftY = 4; // Constant southwards offset

      const sBL = project(-W_panel / 2 + shadowShiftX, Y_back + shadowShiftY, 0);
      const sBR = project(W_panel / 2 + shadowShiftX, Y_back + shadowShiftY, 0);
      const sFR = project(W_panel / 2 + shadowShiftX, Y_front + shadowShiftY, 0);
      const sFL = project(-W_panel / 2 + shadowShiftX, Y_front + shadowShiftY, 0);

      ctx.beginPath();
      ctx.moveTo(sBL.x, sBL.y);
      ctx.lineTo(sBR.x, sBR.y);
      ctx.lineTo(sFR.x, sFR.y);
      ctx.lineTo(sFL.x, sFL.y);
      ctx.closePath();
      ctx.fillStyle = isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(0, 0, 0, 0.35)';
      ctx.fill();

      // Draw structural foundation ballast blocks
      const drawBallast = (x: number, y: number) => {
        const bSize = 1.8;
        const bH = 1.5;
        // Draw 3D ballast box
        const ptsBase = [
          project(x - bSize, y - bSize, 0),
          project(x + bSize, y - bSize, 0),
          project(x + bSize, y + bSize, 0),
          project(x - bSize, y + bSize, 0)
        ];
        const ptsTop = [
          project(x - bSize, y - bSize, bH),
          project(x + bSize, y - bSize, bH),
          project(x + bSize, y + bSize, bH),
          project(x - bSize, y + bSize, bH)
        ];

        // Draw sides
        ctx.fillStyle = isLight ? '#cbd5e1' : '#1e293b';
        ctx.strokeStyle = isLight ? '#94a3b8' : '#334155';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(ptsBase[0].x, ptsBase[0].y);
        ctx.lineTo(ptsBase[1].x, ptsBase[1].y);
        ctx.lineTo(ptsTop[1].x, ptsTop[1].y);
        ctx.lineTo(ptsTop[0].x, ptsTop[0].y);
        ctx.closePath();
        ctx.fill(); ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(ptsBase[1].x, ptsBase[1].y);
        ctx.lineTo(ptsBase[2].x, ptsBase[2].y);
        ctx.lineTo(ptsTop[2].x, ptsTop[2].y);
        ctx.lineTo(ptsTop[1].x, ptsTop[1].y);
        ctx.closePath();
        ctx.fill(); ctx.stroke();

        // Top cap
        ctx.fillStyle = isLight ? '#e2e8f0' : '#334155';
        ctx.beginPath();
        ctx.moveTo(ptsTop[0].x, ptsTop[0].y);
        for(let i=1; i<4; i++) ctx.lineTo(ptsTop[i].x, ptsTop[i].y);
        ctx.closePath();
        ctx.fill(); ctx.stroke();
      };

      drawBallast(-W_panel/2, Y_back);
      drawBallast(W_panel/2, Y_back);
      drawBallast(W_panel/2, Y_front);
      drawBallast(-W_panel/2, Y_front);

      // Draw Racking Support Columns (Heavy steel posts)
      const colColor = isLight ? '#94a3b8' : '#475569';
      ctx.strokeStyle = colColor;
      ctx.lineWidth = 3;

      const drawColumn = (ptBase: {x:number, y:number}, ptTop: {x:number, y:number}) => {
        ctx.beginPath();
        ctx.moveTo(ptBase.x, ptBase.y);
        ctx.lineTo(ptTop.x, ptTop.y);
        ctx.stroke();
      };

      drawColumn(project(-W_panel/2, Y_back, 1), pBL);
      drawColumn(project(W_panel/2, Y_back, 1), pBR);
      drawColumn(project(W_panel/2, Y_front, 1), pFR);
      drawColumn(project(-W_panel/2, Y_front, 1), pFL);

      // Draw primary horizontal support beams of the racking system
      ctx.strokeStyle = isLight ? '#cbd5e1' : '#334155';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(pBL.x, pBL.y);
      ctx.lineTo(pBR.x, pBR.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(pFL.x, pFL.y);
      ctx.lineTo(pFR.x, pFR.y);
      ctx.stroke();

      // 3. DRAW DUAL GLASS SOLAR MODULES (4 panels on the frame)
      const N_mod = 4;
      const drawModule = (p1: {x:number, y:number}, p2: {x:number, y:number}, p3: {x:number, y:number}, p4: {x:number, y:number}) => {
        // Frame
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.closePath();
        ctx.fillStyle = isLight ? '#e2e8f0' : '#1e293b';
        ctx.fill();
        ctx.strokeStyle = isLight ? '#cbd5e1' : '#64748b';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Inner silicon layer
        const px = 0.03; // margins
        const p1_i = { x: p1.x * (1-px) + p3.x * px, y: p1.y * (1-px) + p3.y * px };
        const p2_i = { x: p2.x * (1-px) + p4.x * px, y: p2.y * (1-px) + p4.y * px };
        const p3_i = { x: p3.x * (1-px) + p1.x * px, y: p3.y * (1-px) + p1.y * px };
        const p4_i = { x: p4.x * (1-px) + p2.x * px, y: p4.y * (1-px) + p2.y * px };

        ctx.beginPath();
        ctx.moveTo(p1_i.x, p1_i.y);
        ctx.lineTo(p2_i.x, p2_i.y);
        ctx.lineTo(p3_i.x, p3_i.y);
        ctx.lineTo(p4_i.x, p4_i.y);
        ctx.closePath();

        const glassGrad = ctx.createLinearGradient(p1_i.x, p1_i.y, p3_i.x, p3_i.y);
        // Premium blue/navy silicon for TOPCon modules
        glassGrad.addColorStop(0, 'rgba(15, 23, 42, 0.94)');
        glassGrad.addColorStop(0.5, 'rgba(23, 37, 84, 0.9)');
        glassGrad.addColorStop(1, 'rgba(30, 41, 59, 0.96)');
        ctx.fillStyle = glassGrad;
        ctx.fill();

        // Grid lines (electrodes / busbars)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
        ctx.lineWidth = 0.5;
        const gridH = 6;
        for (let j = 1; j < gridH; j++) {
          const r = j / gridH;
          const lx = p1_i.x + (p4_i.x - p1_i.x) * r;
          const ly = p1_i.y + (p4_i.y - p1_i.y) * r;
          const rx = p2_i.x + (p3_i.x - p2_i.x) * r;
          const ry = p2_i.y + (p3_i.y - p2_i.y) * r;
          ctx.beginPath();
          ctx.moveTo(lx, ly);
          ctx.lineTo(rx, ry);
          ctx.stroke();
        }

        const gridV = 3;
        for (let j = 1; j < gridV; j++) {
          const r = j / gridV;
          const tx = p1_i.x + (p2_i.x - p1_i.x) * r;
          const ty = p1_i.y + (p2_i.y - p1_i.y) * r;
          const bx = p4_i.x + (p3_i.x - p4_i.x) * r;
          const by = p4_i.y + (p3_i.y - p4_i.y) * r;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }

        // Apply visual dust / soiling factor representation
        if (soiling > 0) {
          ctx.beginPath();
          ctx.moveTo(p1_i.x, p1_i.y);
          ctx.lineTo(p2_i.x, p2_i.y);
          ctx.lineTo(p3_i.x, p3_i.y);
          ctx.lineTo(p4_i.x, p4_i.y);
          ctx.closePath();
          ctx.fillStyle = `rgba(120, 85, 40, ${soiling / 170})`; // Sandy soil color overlay
          ctx.fill();
        }
      };

      for (let i = 0; i < N_mod; i++) {
        const u1 = i / N_mod + 0.015;
        const u2 = (i + 1) / N_mod - 0.015;

        const mBL = project(-W_panel / 2 + u1 * W_panel, Y_back, Z_back);
        const mBR = project(-W_panel / 2 + u2 * W_panel, Y_back, Z_back);
        const mFR = project(-W_panel / 2 + u2 * W_panel, Y_front, Z_front);
        const mFL = project(-W_panel / 2 + u1 * W_panel, Y_front, Z_front);

        drawModule(mBL, mBR, mFR, mFL);
      }

      // 4. CALCULATE SUN POSITION
      const sunDistance = width * 0.45;
      const sunX = width / 2 - sunDistance * Math.cos(sunRad);
      const sunY = height * 0.48 - sunDistance * Math.sin(sunRad);

      // 5. UPDATE AND RENDER PHYSICS RAYS (Photon tracing)
      // Periodic spawn of direct incoming sunward rays
      if (Math.random() < 0.16 && raysRef.current.length < 65) {
        const isTargetPanel = Math.random() < 0.55;
        let targetPoint3D;

        if (isTargetPanel) {
          // Target random coordinate along the active modular panels
          const randomX = -W_panel / 2 + Math.random() * W_panel;
          const randomU = Math.random(); // along tilted chord
          const randomY = Y_back + randomU * (Y_front - Y_back);
          const randomZ = Z_back - randomU * (Z_back - Z_front);

          targetPoint3D = { x: randomX, y: randomY, z: randomZ };
        } else {
          // Target random coordinate on the reflective concrete terrace floor
          const randomX = -32 + Math.random() * 64;
          const randomY = -32 + Math.random() * 64;
          targetPoint3D = { x: randomX, y: randomY, z: 0 };
        }

        // Work backwards to find starting position in the sky along the sun vector path
        // To make rays look like they are traveling along the real sun angle
        const rayAngleRad = sunElevRad;
        const startOffsetDist = 120;
        const startX3D = targetPoint3D.x - startOffsetDist * Math.cos(rayAngleRad);
        const startY3D = targetPoint3D.y; // keep isometric alignment
        const startZ3D = targetPoint3D.z + startOffsetDist * Math.sin(rayAngleRad);

        const id = nextRayIdRef.current++;
        raysRef.current.push({
          id,
          type: 'direct',
          startX: startX3D, startY: startY3D, startZ: startZ3D,
          targetX: targetPoint3D.x, targetY: targetPoint3D.y, targetZ: targetPoint3D.z,
          currentX: startX3D, currentY: startY3D, currentZ: startZ3D,
          progress: 0,
          speed: 0.012 + Math.random() * 0.01,
          color: '#f59e0b', // bright solar gold
          intensity: 1.0,
        });
      }

      // Render & process each active ray
      const activeRays: PhysicalRay[] = [];
      raysRef.current.forEach((ray) => {
        ray.progress += ray.speed;

        if (ray.progress <= 1.0) {
          ray.currentX = ray.startX + (ray.targetX - ray.startX) * ray.progress;
          ray.currentY = ray.startY + (ray.targetY - ray.startY) * ray.progress;
          ray.currentZ = ray.startZ + (ray.targetZ - ray.startZ) * ray.progress;

          const pt2D = project(ray.currentX, ray.currentY, ray.currentZ);

          // Render ray path with trailing glowing tails
          const prevProgress = Math.max(0, ray.progress - 0.12);
          const prevX = ray.startX + (ray.targetX - ray.startX) * prevProgress;
          const prevY = ray.startY + (ray.targetY - ray.startY) * prevProgress;
          const prevZ = ray.startZ + (ray.targetZ - ray.startZ) * prevProgress;
          const prevPt2D = project(prevX, prevY, prevZ);

          if (ray.type === 'direct') {
            const drawY = Math.max(pt2D.y, sunY);
            const prevDrawY = Math.max(prevPt2D.y, sunY);
            if (drawY > sunY) {
              ctx.beginPath();
              ctx.moveTo(prevPt2D.x, prevDrawY);
              ctx.lineTo(pt2D.x, drawY);
              ctx.strokeStyle = `rgba(245, 158, 11, ${ray.intensity * (isLight ? 1 : 1)})`;
              ctx.lineWidth = isLight ? 2.5 : 2;
              ctx.stroke();

              // Ray head particle (only draw if below the sun)
              if (pt2D.y > sunY) {
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(pt2D.x, pt2D.y, 2.5, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          } else {
            ctx.beginPath();
            ctx.moveTo(prevPt2D.x, prevPt2D.y);
            ctx.lineTo(pt2D.x, pt2D.y);
            if (ray.type === 'specular') {
              ctx.strokeStyle = `rgba(186, 230, 253, ${ray.intensity * (1 - ray.progress)})`;
              ctx.lineWidth = 1.5;
            } else {
              // Diffuse Albedo ray
              ctx.strokeStyle = `rgba(16, 185, 129, ${ray.intensity * (1 - ray.progress * 0.5)})`;
              ctx.lineWidth = 1.5;
            }
            ctx.stroke();

            // Ray head particle
            ctx.fillStyle = ray.type === 'specular' ? '#bae6fd' : '#10b981';
            ctx.beginPath();
            ctx.arc(pt2D.x, pt2D.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }

          activeRays.push(ray);
        } else {
          // Ray completed path! Generate secondary physical ray-tracing behaviors:
          if (ray.type === 'direct') {
            // 1. Specular Reflection (Glass losses / Fresnel losses)
            const isPanelHit = Math.abs(ray.targetZ - H_clearance) >= -0.5 && ray.targetZ > 0;
            if (isPanelHit && showSpecularRays) {
              // Bounce direct ray into the sky
              // Bounce angle relative to panel slope normal
              const id = nextRayIdRef.current++;
              activeRays.push({
                id,
                type: 'specular',
                startX: ray.targetX, startY: ray.targetY, startZ: ray.targetZ,
                targetX: ray.targetX + 15 * Math.cos(sunRad),
                targetY: ray.targetY - 10,
                targetZ: ray.targetZ + 30 * Math.sin(sunRad),
                currentX: ray.targetX, currentY: ray.targetY, currentZ: ray.targetZ,
                progress: 0,
                speed: 0.024,
                color: 'rgba(186, 230, 253, 0.7)',
                intensity: 0.6,
              });
            }

            // 2. Diffuse Albedo Scattering (Lambertian bounce from floor)
            const isGroundHit = ray.targetZ === 0;
            if (isGroundHit && showAlbedoRays) {
              const scatterCount = albedoMaterial === 'Cool Roof Coating' ? 4 : albedoMaterial === 'White Concrete' ? 3 : 2;
              
              for (let s = 0; s < scatterCount; s++) {
                // Lambertian semi-hemisphere scattering:
                // Spawn rays traveling upward, targeting either the panel underside or the sky
                const isUndersideHit = Math.random() < 0.65;
                let tX, tY, tZ;

                if (isUndersideHit) {
                  // Target coordinates on the back of the active bifacial panels
                  tX = -W_panel / 2 + Math.random() * W_panel;
                  const randomU = Math.random();
                  tY = Y_back + randomU * (Y_front - Y_back);
                  tZ = Z_back - randomU * (Z_back - Z_front);
                } else {
                  // Scattering off into diffuse atmosphere
                  tX = ray.targetX + (-20 + Math.random() * 40);
                  tY = ray.targetY + (-20 + Math.random() * 40);
                  tZ = 25 + Math.random() * 15;
                }

                const id = nextRayIdRef.current++;
                activeRays.push({
                  id,
                  type: 'diffuse',
                  startX: ray.targetX, startY: ray.targetY, startZ: ray.targetZ,
                  targetX: tX, targetY: tY, targetZ: tZ,
                  currentX: ray.targetX, currentY: ray.targetY, currentZ: ray.targetZ,
                  progress: 0,
                  speed: 0.015 + Math.random() * 0.012,
                  color: '#10b981',
                  intensity: albedoCoefficients[albedoMaterial], // Intensity reflects albedo coefficient
                });
              }
            }
          } else if (ray.type === 'diffuse') {
            // Diffuse albedo ray hit the panel's underside!
            const isBacksideHit = ray.targetZ > 0;
            if (isBacksideHit) {
              impactsRef.current.push({
                x: ray.targetX,
                y: ray.targetY,
                z: ray.targetZ,
                life: 1.0
              });
            }
          }
        }
      });
      raysRef.current = activeRays;

      // DRAW SUN SOURCE IN SKY ON TOP OF THE RAYS
      // Draw sun corona & core glows
      const glow = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, width * 0.08);
      glow.addColorStop(0, 'rgba(251, 146, 60, 1)');
      glow.addColorStop(0.35, 'rgba(253, 224, 71, 0.45)');
      glow.addColorStop(1, 'rgba(251, 146, 60, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, width * 0.08, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(sunX, sunY, width * 0.016, 0, Math.PI * 2);
      ctx.fill();

      // Draw Sun beam directional indicator line
      ctx.strokeStyle = 'rgba(253, 224, 71, 0.15)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(sunX, sunY);
      ctx.lineTo(width / 2, height * 0.58);
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash

      // 6. DRAW ALBEDO ENERGY IMPACT FLASHES ON BACK FACE
      const remainingImpacts: AlbedoImpact[] = [];
      impactsRef.current.forEach((impact) => {
        impact.life -= 0.04; // Fade out rate

        if (impact.life > 0) {
          const pt2D = project(impact.x, impact.y, impact.z);
          
          // Draw a lovely glowing ring on panel rear side
          const grad = ctx.createRadialGradient(pt2D.x, pt2D.y, 1, pt2D.x, pt2D.y, 8 * (1.5 - impact.life));
          grad.addColorStop(0, `rgba(52, 211, 153, ${impact.life * 0.95})`);
          grad.addColorStop(0.4, `rgba(16, 185, 129, ${impact.life * 0.4})`);
          grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
          
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(pt2D.x, pt2D.y, 8 * (1.5 - impact.life), 0, Math.PI * 2);
          ctx.fill();

          remainingImpacts.push(impact);
        }
      });
      impactsRef.current = remainingImpacts;

      // 7. SEMICONDUCTOR CARRIER FLOW (Electrons flowing from micro-inverter to grid)
      const inverterPos = project(-W_panel * 0.3, Y_front, Z_front);
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(inverterPos.x, inverterPos.y, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Pulsing energy circle
      const pulseRad = 6 + Math.sin(time / 160) * 4;
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(inverterPos.x, inverterPos.y, pulseRad, 0, Math.PI * 2);
      ctx.stroke();

      // Mini text HUD directly on the rendering stage
      ctx.font = '9px monospace';
      ctx.fillStyle = isLight ? '#475569' : '#34d399';
      ctx.fillText(`AOI: ${physicsMetrics.aoiDegrees}°`, pBL.x - 4, pBL.y - 25);
      ctx.fillText(`REAR G: ${physicsMetrics.rearIrradiance} W/m²`, pFR.x - 30, pFR.y + 14);

      if (isAnimating) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      resizeObserver.disconnect();
    };
  }, [sunAngle, panelTilt, groundClearance, albedoMaterial, soiling, isAnimating, showAlbedoRays, showSpecularRays, physicsMetrics]);

  return (
    <div id="ray-traced-bifacial-simulator" className="bifacial-simulator max-w-7xl mx-auto w-full bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl relative">
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 border-b border-slate-800 px-4 sm:px-6 md:px-8 py-5 sm:py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/25 rounded-full text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              Interactive Physics Lab
            </div>
            <h3 className="sim-heading text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Bifacial Albedo Simulator
            </h3>
            <p className="sim-muted text-slate-400 text-sm leading-relaxed max-w-xl">
              Adjust sun angle, floor material, and panel height — watch bifacial gain update in real time.
            </p>
          </div>

          {/* Inline legend + play */}
          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            {[
              { color: 'bg-amber-400', label: 'Direct' },
              { color: 'bg-emerald-400', label: 'Albedo' },
              { color: 'bg-sky-300', label: 'Reflection' },
            ].map(({ color, label }) => (
              <span key={label} className="sim-panel inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
                <span className={`w-2 h-2 rounded-full ${color} shrink-0`} />
                {label}
              </span>
            ))}
            <button
              type="button"
              onClick={() => setIsAnimating(!isAnimating)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all ${
                isAnimating
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'bg-emerald-500 border-emerald-400 text-slate-950 hover:bg-emerald-400'
              }`}
            >
              {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isAnimating ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">

          {/* Canvas + integrated results */}
          <div className="lg:col-span-7 space-y-4">
            <div className="sim-panel bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative min-h-[280px] sm:min-h-[360px] lg:min-h-[420px] aspect-video w-full">
              <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                <span className="bg-slate-950/90 backdrop-blur-md border border-slate-800 px-2.5 py-1 rounded-lg text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  Live ray trace
                </span>
                <span className="hidden sm:inline-flex bg-orange-500/15 border border-orange-500/30 px-2.5 py-1 rounded-lg text-[10px] font-bold text-orange-400">
                  +{physicsMetrics.yieldIncreasePercent}% yield
                </span>
              </div>

              <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" aria-label="3D bifacial solar ray tracing simulation" />

              {/* Unified bottom metrics bar */}
              <div className="absolute bottom-0 inset-x-0 z-10 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-2 sm:px-3 py-2">
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-0 sm:divide-x sm:divide-slate-800 text-center">
                  {[
                    { label: 'Standard', value: `${physicsMetrics.monofacialPowerW}W`, cls: 'text-slate-400' },
                    { label: 'Bifacial', value: `${physicsMetrics.bifacialPowerW}W`, cls: 'text-emerald-400' },
                    { label: 'Front', value: `${physicsMetrics.frontIrradiance}`, cls: 'text-amber-400', unit: 'W/m²' },
                    { label: 'Rear', value: `${physicsMetrics.rearIrradiance}`, cls: 'text-emerald-400', unit: 'W/m²' },
                    { label: 'Albedo', value: `${(albedoCoefficients[albedoMaterial] * 100).toFixed(0)}%`, cls: 'text-slate-200' },
                    { label: 'Height', value: `${groundClearance.toFixed(1)}m`, cls: 'text-blue-400' },
                  ].map(({ label, value, cls, unit }) => (
                    <div key={label} className="px-1 py-0.5">
                      <span className="text-[8px] sm:text-[9px] text-slate-500 block uppercase tracking-wide">{label}</span>
                      <span className={`text-[11px] sm:text-xs font-bold font-mono ${cls}`}>
                        {value}{unit && <span className="text-[8px] text-slate-500 font-normal ml-0.5">{unit}</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Irradiance comparison — compact */}
            <div className="sim-panel bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
              <h4 className="sim-heading text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
                Light on the panel
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="sim-muted text-slate-400">Front surface</span>
                    <span className="font-mono font-bold text-amber-400">{physicsMetrics.frontIrradiance} W/m²</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full transition-all duration-300" style={{ width: `${Math.min(100, (physicsMetrics.frontIrradiance / 1100) * 100)}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="sim-muted text-slate-400">Rear (albedo)</span>
                    <span className="font-mono font-bold text-emerald-400">{physicsMetrics.rearIrradiance} W/m²</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${Math.min(100, (physicsMetrics.rearIrradiance / 300) * 100)}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed controls */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="sim-panel bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
              {/* Tab bar */}
              <div className="scroll-tabs flex gap-1 p-2 border-b border-slate-800 overflow-x-auto">
                {CONTROL_TABS.map(({ id, label, short, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setControlTab(id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap border transition-all shrink-0 ${
                      controlTab === id
                        ? 'sim-tab-active bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                        : 'sim-tab-inactive bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">{short}</span>
                  </button>
                ))}
              </div>

              {/* Tab panels — fixed min height keeps layout stable */}
              <div className="p-4 sm:p-5 min-h-[320px]">
                <AnimatePresence mode="wait">
                  {controlTab === 'environment' && (
                    <motion.div
                      key="environment"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-5"
                    >
                      {[
                        { label: 'Sun elevation', value: `${sunAngle}°`, color: 'text-amber-400', sliderClass: 'range-slider-amber', min: 15, max: 165, step: 1, state: sunAngle, set: (v: number) => setSunAngle(v), hints: ['Morning', 'Noon', 'Evening'] },
                        { label: 'Panel tilt', value: `${panelTilt}°`, color: 'text-blue-400', sliderClass: 'range-slider-blue', min: 10, max: 45, step: 1, state: panelTilt, set: (v: number) => setPanelTilt(v), hints: ['Flat 10°', 'Optimal ~28°', 'Steep 45°'] },
                        { label: 'Ground clearance', value: `${groundClearance.toFixed(1)} m`, color: 'text-emerald-400', sliderClass: 'range-slider-emerald', min: 0.2, max: 1.8, step: 0.1, state: groundClearance, set: (v: number) => setGroundClearance(v), hints: null },
                      ].map((s) => (
                        <div key={s.label} className="space-y-2">
                          <div className="flex justify-between items-baseline gap-2">
                            <label className="sim-heading text-sm text-slate-200">{s.label}</label>
                            <span className={`text-lg font-bold font-mono ${s.color}`}>{s.value}</span>
                          </div>
                          <input
                            type="range"
                            min={s.min}
                            max={s.max}
                            step={s.step}
                            value={s.state}
                            onChange={(e) => s.set(parseFloat(e.target.value))}
                            className={`range-slider ${s.sliderClass} w-full`}
                            aria-label={s.label}
                          />
                          {s.hints && (
                            <div className="flex justify-between text-[10px] sim-muted text-slate-500">
                              {s.hints.map((h) => <span key={h}>{h}</span>)}
                            </div>
                          )}
                        </div>
                      ))}
                      <p className="sim-muted text-[11px] text-slate-500 pt-1 border-t border-slate-800">
                        Ground view factor: <span className="text-emerald-400 font-mono font-bold">{physicsMetrics.groundViewFactor}%</span> — higher clearance lets more light reach the panel rear.
                      </p>
                    </motion.div>
                  )}

                  {controlTab === 'surface' && (
                    <motion.div
                      key="surface"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-3"
                    >
                      <p className="sim-muted text-xs text-slate-400">
                        Reflective terrace surfaces boost rear-side irradiance on bifacial modules.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          { name: 'Cool Roof Coating' as const, label: 'Cool roof', coeff: 0.92, hint: 'Best reflectivity' },
                          { name: 'White Concrete' as const, label: 'White concrete', coeff: 0.85, hint: 'High albedo' },
                          { name: 'Standard Roof' as const, label: 'Standard roof', coeff: 0.35, hint: 'Typical terrace' },
                          { name: 'Green Grass' as const, label: 'Grass / soil', coeff: 0.20, hint: 'Low reflectivity' },
                        ].map((mat) => {
                          const selected = albedoMaterial === mat.name;
                          return (
                            <button
                              key={mat.name}
                              type="button"
                              onClick={() => setAlbedoMaterial(mat.name)}
                              className={`p-3.5 rounded-xl border text-left transition-all ${
                                selected
                                  ? 'bg-emerald-500/10 border-emerald-500/60 ring-1 ring-emerald-500/25'
                                  : 'bg-slate-900 border-slate-800 hover:border-slate-600'
                              }`}
                            >
                              <div className="flex justify-between items-start gap-2">
                                <span className={`text-sm font-semibold flex items-center gap-1.5 ${selected ? 'text-emerald-400' : 'text-slate-200'}`}>
                                  {selected && <Check className="w-3.5 h-3.5 shrink-0" />}
                                  {mat.label}
                                </span>
                                <span className="text-xs font-mono font-bold text-slate-500">{(mat.coeff * 100).toFixed(0)}%</span>
                              </div>
                              <span className="sim-muted text-[11px] text-slate-500 block mt-1">{mat.hint}</span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {controlTab === 'quality' && (
                    <motion.div
                      key="quality"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-baseline">
                          <label className="sim-heading text-sm text-slate-200">Bifaciality factor</label>
                          <span className="text-lg font-bold text-slate-200 font-mono">{bifaciality}%</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="95"
                          value={bifaciality}
                          onChange={(e) => setBifaciality(parseInt(e.target.value))}
                          className="range-slider range-slider-slate w-full"
                          aria-label="Bifaciality factor percentage"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-baseline">
                          <label className="sim-heading text-sm text-slate-200">Dust / soiling</label>
                          <span className={`text-lg font-bold font-mono ${soiling > 25 ? 'text-red-400' : 'text-orange-400'}`}>{soiling}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="60"
                          value={soiling}
                          onChange={(e) => setSoiling(parseInt(e.target.value))}
                          className="range-slider range-slider-orange w-full"
                          aria-label="Glass soiling percentage"
                        />
                        <div className="flex justify-between text-[10px] sim-muted text-slate-500">
                          <span>Clean</span><span>Moderate</span><span>Heavy</span>
                        </div>
                      </div>

                      <div className="space-y-2.5 pt-3 border-t border-slate-800">
                        <p className="sim-heading text-xs font-semibold text-slate-300">Ray visibility</p>
                        {[
                          { checked: showAlbedoRays, set: setShowAlbedoRays, label: 'Albedo bounce rays', color: 'accent-emerald-500' },
                          { checked: showSpecularRays, set: setShowSpecularRays, label: 'Glass reflection rays', color: 'accent-sky-500' },
                        ].map(({ checked, set, label, color }) => (
                          <label key={label} className="flex items-center gap-3 text-sm text-slate-300 cursor-pointer py-1">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => set(e.target.checked)}
                              className={`w-4 h-4 ${color} rounded shrink-0`}
                            />
                            {label}
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-4 text-xs sim-muted text-slate-400 leading-relaxed">
              <span className="font-semibold text-emerald-400 block mb-1">Tip</span>
              Cool roof + 1.0 m clearance at midday can deliver 14–18% more power than monofacial panels on a dark surface.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
