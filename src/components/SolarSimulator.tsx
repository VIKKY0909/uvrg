import React, { useState, useEffect, useRef } from 'react';
import { Sun, Cloud, CloudRain, CloudSun, Battery, Zap, Info, RotateCcw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SimulationState } from '../types';

interface SolarSimulatorProps {
  onApplyToCalculator: (panelsCount: number) => void;
}

export default function SolarSimulator({ onApplyToCalculator }: SolarSimulatorProps) {
  // 1. STATE INITIALIZATION
  const [sim, setSim] = useState<SimulationState>({
    sunPosition: 120, // 120 degrees (~12 PM noon-ish, 0 is 6 AM, 180 is 6 PM)
    roofAngle: 25, // degrees
    panelEfficiency: 21.5, // %
    cloudCover: 10, // %
    panelCount: 12, // panels on roof
    shadingLevel: 15, // %
    hasBattery: true,
    batteryLevel: 65, // %
  });

  const [activeWeather, setActiveWeather] = useState<'sunny' | 'cloudy' | 'rainy'>('sunny');
  const [realtimePower, setRealtimePower] = useState({
    solarGen: 0,
    homeConsumption: 0,
    netGrid: 0,
    batteryPower: 0, // positive = charging, negative = discharging
  });

  const animationFrameRef = useRef<number | null>(null);
  const [particleOffset, setParticleOffset] = useState(0);

  // 2. WEATHER HANDLER
  const handleWeatherChange = (type: 'sunny' | 'cloudy' | 'rainy') => {
    setActiveWeather(type);
    if (type === 'sunny') {
      setSim(prev => ({ ...prev, cloudCover: 5, shadingLevel: 5 }));
    } else if (type === 'cloudy') {
      setSim(prev => ({ ...prev, cloudCover: 60, shadingLevel: 30 }));
    } else {
      setSim(prev => ({ ...prev, cloudCover: 90, shadingLevel: 60 }));
    }
  };

  // 3. REALTIME ENERGY BALANCE CALCULATOR
  // Computes instantaneous kW values based on sun angle, panel count, clouds, and battery.
  useEffect(() => {
    // Sun Elevation Multiplier: maximum at 90 degrees (12 PM), drops to 0 at 0 and 180.
    const radians = (sim.sunPosition * Math.PI) / 180;
    const sunIntensity = Math.max(0, Math.sin(radians)); // 0 to 1

    // Ideal peak generation per panel is 450W = 0.45kW
    const panelCapacityKw = 0.45;
    const maxCapacity = sim.panelCount * panelCapacityKw;

    // Angle of incidence factor (roof angle relative to sun)
    // Optimal tilt is around 25-30 degrees in India.
    const angleMismatch = Math.abs(sim.roofAngle - 28);
    const angleEfficiencyFactor = Math.max(0.85, 1 - (angleMismatch / 100) * 0.3);

    // Weather / Cloud factor
    const weatherFactor = 1 - (sim.cloudCover / 100) * 0.85;

    // Shading / Dust factor
    const shadingFactor = 1 - (sim.shadingLevel / 100) * 0.9;

    // Final Instantaneous Solar Generation (kW)
    const solarGen = Number((maxCapacity * sunIntensity * angleEfficiencyFactor * weatherFactor * shadingFactor).toFixed(2));

    // Dynamic Household consumption (kW)
    // Peak in mornings (8-10 AM) and evenings (6-10 PM) due to appliances, ACs, lights.
    const hour = 6 + (sim.sunPosition / 180) * 12; // mapping 6 AM to 6 PM
    let homeConsumption = 1.2; // baseline load (fridge, wifi)
    if (hour >= 8 && hour <= 11) {
      homeConsumption = 2.8; // morning chores, kitchen appliances
    } else if (hour > 11 && hour < 17) {
      homeConsumption = 1.8; // mid-day baseline
    } else if (hour >= 17 && hour <= 18) {
      homeConsumption = 3.2; // early evening lights, entertainment
    }
    // AC load factor scaled by weather (cloudy = cooler, sunny = hotter)
    if (activeWeather === 'sunny') {
      homeConsumption += 1.5; // AC running hard
    }

    homeConsumption = Number(homeConsumption.toFixed(2));

    // Battery & Grid power logic
    let batteryPower = 0;
    let netGrid = 0;
    const difference = solarGen - homeConsumption;

    if (sim.hasBattery) {
      if (difference > 0) {
        // Charging battery with excess
        batteryPower = Math.min(difference, 3.0); // max charge speed 3kW
        netGrid = Number((difference - batteryPower).toFixed(2));
      } else {
        // Discharging battery to cover deficit
        batteryPower = Math.max(difference, -3.0); // max discharge speed 3kW
        netGrid = Number((difference - batteryPower).toFixed(2));
      }
    } else {
      netGrid = Number(difference.toFixed(2));
    }

    setRealtimePower({
      solarGen,
      homeConsumption,
      netGrid,
      batteryPower: Number(batteryPower.toFixed(2)),
    });

    // Dynamic battery level update (simulated flow)
    if (sim.hasBattery && Math.abs(batteryPower) > 0.1) {
      const interval = setInterval(() => {
        setSim(prev => {
          const delta = batteryPower > 0 ? 0.2 : -0.2;
          const nextVal = Math.min(100, Math.max(0, prev.batteryLevel + delta));
          return { ...prev, batteryLevel: Number(nextVal.toFixed(1)) };
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [sim.sunPosition, sim.roofAngle, sim.panelCount, sim.cloudCover, sim.shadingLevel, sim.hasBattery, activeWeather]);

  // 4. PARTICLE ANIMATION LOOP
  useEffect(() => {
    const animate = () => {
      setParticleOffset(prev => (prev + 0.5) % 100);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Helper to convert slider sun position to human-readable time
  const formatTime = (degrees: number) => {
    const startHour = 6; // 6 AM
    const totalHours = 12; // until 6 PM
    const exactHour = startHour + (degrees / 180) * totalHours;
    const hours = Math.floor(exactHour);
    const minutes = Math.floor((exactHour - hours) * 60);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Shadow calculation based on sun position
  // At 90 degrees (noon), shadow is vertical. At 0 and 180, shadows are long.
  const shadowX = -(sim.sunPosition - 90) / 1.5;
  const shadowOpacity = Math.max(0.1, Math.sin((sim.sunPosition * Math.PI) / 180) * 0.4);

  // Generate dynamic 24H generation data array for SVG chart
  const getGraphDataPoints = () => {
    const pointsGen: [number, number][] = [];
    const pointsCons: [number, number][] = [];
    
    for (let i = 0; i <= 24; i++) {
      // Scale coordinates: width is 400px, height is 120px
      const x = (i / 24) * 400;
      
      // Generation logic (sun shines between 6 AM [index 6] and 18 PM [index 18])
      let genKw = 0;
      if (i >= 6 && i <= 18) {
        const rad = ((i - 6) / 12) * Math.PI;
        const maxCapacity = sim.panelCount * 0.45;
        const weatherFactor = 1 - (sim.cloudCover / 100) * 0.85;
        const shadingFactor = 1 - (sim.shadingLevel / 100) * 0.9;
        genKw = maxCapacity * Math.sin(rad) * weatherFactor * shadingFactor;
      }
      const yGen = 120 - Math.min(110, (genKw / 10) * 110);
      pointsGen.push([x, yGen]);

      // Consumption curve logic
      let consKw = 1.2;
      if (i >= 8 && i <= 11) consKw = 2.8;
      else if (i >= 18 && i <= 22) consKw = 4.2; // Evening heavy peak
      else if (i >= 12 && i <= 17) consKw = 1.8;
      const yCons = 120 - Math.min(110, (consKw / 10) * 110);
      pointsCons.push([x, yCons]);
    }

    return {
      genPath: `M 0 120 ` + pointsGen.map(p => `L ${p[0]} ${p[1]}`).join(' ') + ` L 400 120 Z`,
      consPath: `M 0 120 ` + pointsCons.map(p => `L ${p[0]} ${p[1]}`).join(' ') + ` L 400 120 Z`,
      genLine: pointsGen.map(p => `${p[0]},${p[1]}`).join(' '),
      consLine: pointsCons.map(p => `${p[0]},${p[1]}`).join(' '),
    };
  };

  const graphPaths = getGraphDataPoints();
  const currentGraphX = ((6 + (sim.sunPosition / 180) * 12) / 24) * 400;

  return (
    <div id="interactive-simulator" className="max-w-7xl mx-auto w-full bg-slate-950 text-white rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl overflow-hidden my-8 sm:my-12">
      {/* Banner / Header */}
      <div className="bg-gradient-to-r from-blue-900/60 via-slate-900 to-orange-950/40 px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="min-w-0">
          <span className="bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Live WebGL-Style Sandbox
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
            Solar Generation &amp; Grid Flow Simulator
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Drag the sun, add panels, and trigger weather storm events to see energy optimization in real-time.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSim({
                sunPosition: 120,
                roofAngle: 25,
                panelEfficiency: 21.5,
                cloudCover: 10,
                panelCount: 12,
                shadingLevel: 15,
                hasBattery: true,
                batteryLevel: 65,
              });
              handleWeatherChange('sunny');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Demo
          </button>
        </div>
      </div>

      {/* Grid: Left Simulator / Right Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* LEFT PANEL: ANIMATION & METRIC READOUTS (7 Cols) */}
        <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950/40">
          
          {/* Top Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 text-center relative overflow-hidden">
              <Sun className={`w-5 h-5 mx-auto mb-1.5 ${realtimePower.solarGen > 0 ? 'text-amber-400 animate-spin-slow' : 'text-slate-600'}`} />
              <div className="text-slate-400 text-[9px] sm:text-[10px] font-mono uppercase">Solar Output</div>
              <div className="text-base sm:text-xl font-bold text-amber-400 font-mono mt-0.5">{realtimePower.solarGen} <span className="text-xs">kW</span></div>
              {realtimePower.solarGen > 0 && <div className="absolute inset-x-0 bottom-0 h-1 bg-amber-500 animate-pulse" />}
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 text-center relative overflow-hidden">
              <Zap className="w-5 h-5 mx-auto mb-1.5 text-sky-400" />
              <div className="text-slate-400 text-[10px] font-mono uppercase">Home Load</div>
              <div className="text-xl font-bold text-sky-400 font-mono mt-0.5">{realtimePower.homeConsumption} <span className="text-xs">kW</span></div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-sky-500" />
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 text-center relative overflow-hidden">
              <Battery className={`w-5 h-5 mx-auto mb-1.5 ${realtimePower.batteryPower > 0 ? 'text-green-400 animate-pulse' : realtimePower.batteryPower < 0 ? 'text-orange-400' : 'text-slate-600'}`} />
              <div className="text-slate-400 text-[10px] font-mono uppercase">Battery ({sim.batteryLevel}%)</div>
              <div className="text-xl font-bold text-green-400 font-mono mt-0.5">
                {sim.hasBattery ? `${realtimePower.batteryPower > 0 ? '+' : ''}${realtimePower.batteryPower} kW` : 'None'}
              </div>
              {sim.hasBattery && <div className="absolute inset-x-0 bottom-0 h-1 bg-green-500" style={{ width: `${sim.batteryLevel}%` }} />}
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 text-center relative overflow-hidden">
              <div className="w-5 h-5 mx-auto mb-1.5 flex items-center justify-center font-bold text-xs rounded-full border border-blue-400 text-blue-400">G</div>
              <div className="text-slate-400 text-[10px] font-mono uppercase">Net Grid Flow</div>
              <div className="text-xl font-bold text-blue-400 font-mono mt-0.5">
                {realtimePower.netGrid > 0 ? `Export -${realtimePower.netGrid}` : `Import +${Math.abs(realtimePower.netGrid)}`} <span className="text-xs">kW</span>
              </div>
              {realtimePower.netGrid > 0 && <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-500 animate-pulse" />}
            </div>
          </div>

          {/* Core Interactive Sandbox Stage */}
          <div className="relative bg-slate-900 border border-slate-800 rounded-2xl aspect-[16/10] flex items-center justify-center overflow-hidden p-4">
            
            {/* Ambient Lighting Gradients mapped to Sun Degree */}
            <div 
              className="absolute inset-0 transition-all duration-300 pointer-events-none" 
              style={{
                background: `radial-gradient(circle at ${50 + Math.cos((sim.sunPosition * Math.PI) / 180) * 40}% ${40 - Math.sin((sim.sunPosition * Math.PI) / 180) * 30}%, rgba(245, 158, 11, ${0.15 * Math.sin((sim.sunPosition * Math.PI) / 180)}), rgba(15, 23, 42, 1) 70%)`
              }}
            />

            {/* Weather Overlay Animators (Cloud or Rain vectors) */}
            <AnimatePresence>
              {activeWeather === 'rainy' && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 0.25 }} 
                  exit={{ opacity: 0 }} 
                  className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(59,130,246,0.1))] bg-[size:20px_20px]"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
                    backgroundSize: '12px 24px',
                    animation: 'rainFlow 0.8s linear infinite'
                  }}
                />
              )}
            </AnimatePresence>

            {/* SVG Visualizer Canvas */}
            <svg viewBox="0 0 600 380" className="w-full h-full relative z-10 select-none">
              
              {/* Sky Arc Guide */}
              <path d="M 50,300 A 250,250 0 0,1 550,300" fill="none" stroke="#334155" strokeDasharray="6,6" strokeWidth="1.5" />
              
              {/* Sun Orbital Node */}
              {/* Sun coordinates based on degree */}
              {(() => {
                const angleRad = (sim.sunPosition * Math.PI) / 180;
                // Center (300, 300) with Radius 250
                const sunX = 300 - 250 * Math.cos(angleRad);
                const sunY = 300 - 250 * Math.sin(angleRad);
                const isDaylight = sunY < 300;

                if (!isDaylight) return null;

                return (
                  <g>
                    {/* Sun Rays emanating towards Roof */}
                    {realtimePower.solarGen > 0 && (
                      <g opacity={1 - sim.cloudCover / 100}>
                        <line x1={sunX} y1={sunY} x2="260" y2="210" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="4,6" className="animate-pulse" />
                        <line x1={sunX} y1={sunY} x2="340" y2="210" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="4,6" className="animate-pulse" />
                      </g>
                    )}

                    {/* Glowing Sun Aura */}
                    <circle cx={sunX} cy={sunY} r="35" fill="url(#sunGlow)" opacity="0.4" className="animate-pulse" />
                    {/* Core Sun */}
                    <circle cx={sunX} cy={sunY} r="18" fill="#FBBF24" />

                    <defs>
                      <radialGradient id="sunGlow">
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </g>
                );
              })()}

              {/* Cloud Vectors matching slider */}
              {sim.cloudCover > 20 && (
                <g opacity={sim.cloudCover / 100} transform="translate(180, 50)" className="animate-bounce-slow">
                  <path d="M 25 30 A 20 20 0 0 1 65 30 A 25 25 0 0 1 110 35 A 20 20 0 0 1 130 50 A 15 15 0 0 1 120 70 L 20 70 A 15 15 0 0 1 15 55 A 20 20 0 0 1 25 30 Z" fill="#475569" opacity="0.85" />
                  <path d="M 125 40 A 15 15 0 0 1 155 40 A 20 20 0 0 1 190 45 A 15 15 0 0 1 205 58 A 12 12 0 0 1 195 70 L 120 70 Z" fill="#64748B" opacity="0.6" />
                </g>
              )}

              {/* --- 3D ISOMETRIC HOUSE DRAWING --- */}
              {/* Dynamic Isometric Shadow polygon based on Sun Angle */}
              <polygon 
                points={`200,320 ${200 + shadowX},${320 + Math.abs(shadowX)*0.2} ${400 + shadowX},${320 + Math.abs(shadowX)*0.2} 400,320`} 
                fill="#020617" 
                opacity={shadowOpacity} 
                className="transition-all duration-300"
              />

              {/* House Main Coordinates */}
              {/* Center peak of house at (300, 160). Width of front slope 120px, depth 150px */}
              
              {/* Left Wall (Front Facing, shaded) */}
              <polygon points="180,240 180,310 300,340 300,270" fill="#1E293B" stroke="#334155" strokeWidth="1" />
              {/* Right Wall (Side Facing, light) */}
              <polygon points="300,340 300,270 420,240 420,310" fill="#334155" stroke="#475569" strokeWidth="1" />
              
              {/* Triangular Front Gable */}
              <polygon points="180,240 300,270 300,195" fill="#1E293B" stroke="#334155" strokeWidth="1" />

              {/* Roof Panels Foundation (Dynamic Tilt based on Slider) */}
              {/* Let's draw an isometric Roof Slope that offsets vertically based on sim.roofAngle */}
              {(() => {
                const angleOffset = (sim.roofAngle - 25) * 0.8;
                const peakY = 175 - angleOffset;
                const rightPeakY = 145 - angleOffset;
                const eavesY = 240;
                const rightEavesY = 210;

                return (
                  <g>
                    {/* Left Roof Slope Face (Faced towards sun) */}
                    <polygon 
                      points={`180,${eavesY} 300,${peakY} 420,${rightPeakY} 420,${rightEavesY}`} 
                      fill="#0F172A" 
                      stroke="#475569" 
                      strokeWidth="1.5" 
                    />

                    {/* Solar Panel Blocks Mounted on Roof */}
                    {/* Dynamically distribute based on panel count */}
                    <g transform={`translate(0, 0)`}>
                      {/* Subdivided Grid drawing representing solar arrays */}
                      <polygon 
                        points={`205,${eavesY - 12} 300,${peakY + 12} 405,${rightPeakY + 12} 405,${rightEavesY - 12}`} 
                        fill="#1E3A8A" 
                        stroke="#2563EB" 
                        strokeWidth="1.5" 
                        opacity="0.85"
                      />
                      {/* Grid lines simulating array gaps */}
                      {sim.panelCount > 6 && (
                        <line x1="305" y1={eavesY - 5} x2="305" y2={rightPeakY + 15} stroke="#3B82F6" strokeWidth="1" />
                      )}
                      {sim.panelCount > 12 && (
                        <>
                          <line x1="250" y1={eavesY - 8} x2="350" y2={rightPeakY + 10} stroke="#3B82F6" strokeWidth="1" />
                          <line x1="350" y1={eavesY - 15} x2="380" y2={rightPeakY + 5} stroke="#3B82F6" strokeWidth="1" />
                        </>
                      )}
                      
                      {/* Clean/Maintenance visual indicator */}
                      <polygon 
                        points={`205,${eavesY - 12} 300,${peakY + 12} 405,${rightPeakY + 12} 405,${rightEavesY - 12}`} 
                        fill="#475569" 
                        opacity={sim.shadingLevel / 200} // Dust overlay based on shading level!
                      />
                      
                      {/* Glowing "Active Production" Border */}
                      {realtimePower.solarGen > 1.0 && (
                        <polygon 
                          points={`205,${eavesY - 12} 300,${peakY + 12} 405,${rightPeakY + 12} 405,${rightEavesY - 12}`} 
                          fill="none" 
                          stroke="#F59E0B" 
                          strokeWidth="2.5" 
                          strokeDasharray="10,5"
                          className="animate-pulse"
                        />
                      )}
                    </g>
                  </g>
                );
              })()}

              {/* Front Door & Window */}
              <rect x="230" y="270" width="35" height="50" fill="#0F172A" stroke="#334155" />
              <circle cx="238" cy="295" r="2.5" fill="#F59E0B" /> {/* brass handle */}
              <rect x="340" y="260" width="40" height="30" fill="#475569" stroke="#334155" />
              <line x1="360" y1="260" x2="360" y2="290" stroke="#334155" />
              <line x1="340" y1="275" x2="380" y2="275" stroke="#334155" />

              {/* Central Inverter Box on house side wall */}
              <g transform="translate(315, 280)">
                <rect x="0" y="0" width="22" height="30" rx="3" fill="#64748B" stroke="#475569" />
                <circle cx="11" cy="8" r="4" fill={realtimePower.solarGen > 0 ? '#10B981' : '#EF4444'} className={realtimePower.solarGen > 0 ? 'animate-pulse' : ''} />
                <rect x="4" y="16" width="14" height="4" fill="#0F172A" />
                <line x1="6" y1="23" x2="16" y2="23" stroke="#F59E0B" strokeWidth="1" />
              </g>

              {/* --- DYNAMIC ENERGY PATH PARTICLE OVERLAY (SVG Path Animations) --- */}
              {/* Path 1: Solar Roof to Inverter */}
              <path id="roofToInverter" d="M 310,210 L 310,250 L 325,250 L 325,280" fill="none" stroke="transparent" />
              
              {/* Path 2: Inverter to Grid Box */}
              <path id="inverterToGrid" d="M 325,295 L 325,320 L 490,320" fill="none" stroke="transparent" />
              
              {/* Path 3: Inverter to Home */}
              <path id="inverterToHome" d="M 325,290 L 325,310 L 250,310" fill="none" stroke="transparent" />

              {/* Animated Glowing Particles representing flow */}
              {realtimePower.solarGen > 0 && (
                <g>
                  {/* Energy from Roof to Inverter */}
                  <circle r="4" fill="#F59E0B">
                    <animateMotion dur="2s" repeatCount="indefinite" path="M 310,210 L 310,250 L 325,250 L 325,280" />
                  </circle>
                  <circle r="4" fill="#F59E0B">
                    <animateMotion dur="2s" begin="0.7s" repeatCount="indefinite" path="M 310,210 L 310,250 L 325,250 L 325,280" />
                  </circle>
                  <circle r="4" fill="#F59E0B">
                    <animateMotion dur="2s" begin="1.4s" repeatCount="indefinite" path="M 310,210 L 310,250 L 325,250 L 325,280" />
                  </circle>
                </g>
              )}

              {/* Energy Flowing inside Home */}
              <circle r="4.5" fill="#3B82F6">
                <animateMotion dur="2.5s" repeatCount="indefinite" path="M 325,290 L 325,310 L 250,310" />
              </circle>

              {/* Flow to/from Power Grid Node at (500, 320) */}
              {/* If exporting: flow goes right, yellow-green. If importing: flow goes left, blue-red */}
              {realtimePower.netGrid > 0 ? (
                // Exporting excess energy to grid
                <g>
                  <circle r="4.5" fill="#10B981">
                    <animateMotion dur="1.8s" repeatCount="indefinite" path="M 325,310 L 490,310" />
                  </circle>
                  <circle r="4.5" fill="#10B981">
                    <animateMotion dur="1.8s" begin="0.9s" repeatCount="indefinite" path="M 325,310 L 490,310" />
                  </circle>
                </g>
              ) : realtimePower.netGrid < 0 ? (
                // Importing shortfall from grid
                <g>
                  <circle r="4.5" fill="#EF4444">
                    <animateMotion dur="2.2s" repeatCount="indefinite" path="M 490,310 L 325,310" />
                  </circle>
                  <circle r="4.5" fill="#EF4444">
                    <animateMotion dur="2.2s" begin="1.1s" repeatCount="indefinite" path="M 490,310 L 325,310" />
                  </circle>
                </g>
              ) : null}

              {/* Grid Utility Pole Visual */}
              <g transform="translate(490, 240)">
                <line x1="20" y1="0" x2="20" y2="100" stroke="#475569" strokeWidth="4.5" />
                <line x1="0" y1="20" x2="40" y2="20" stroke="#475569" strokeWidth="3" />
                <line x1="5" y1="40" x2="35" y2="40" stroke="#475569" strokeWidth="3" />
                {/* Isolators */}
                <circle cx="2" cy="20" r="3" fill="#94A3B8" />
                <circle cx="38" cy="20" r="3" fill="#94A3B8" />
                <circle cx="7" cy="40" r="3" fill="#94A3B8" />
                <circle cx="33" cy="40" r="3" fill="#94A3B8" />
                {/* Connection line to house */}
                <path d="M 20,20 C -40,30 -110,65 -165,70" fill="none" stroke="#334155" strokeWidth="2.5" />
              </g>

              {/* Grid Label */}
              <text x="500" y="360" fill="#94A3B8" fontSize="11" fontFamily="monospace" textAnchor="middle">GRID FEED</text>

            </svg>

            {/* Time of Day Indicator HUD in corner */}
            <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <div className="text-xs font-mono font-bold tracking-wider">{formatTime(sim.sunPosition)}</div>
            </div>

            {/* Weather status indicator HUD */}
            <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-xl px-3 py-1.5 flex items-center gap-2 text-xs">
              {activeWeather === 'sunny' && <span className="text-amber-400 flex items-center gap-1"><Sun className="w-3.5 h-3.5" /> Full Sun</span>}
              {activeWeather === 'cloudy' && <span className="text-sky-300 flex items-center gap-1"><CloudSun className="w-3.5 h-3.5" /> Scattered Clouds</span>}
              {activeWeather === 'rainy' && <span className="text-blue-400 flex items-center gap-1" style={{ animation: 'pulse 1s infinite' }}><CloudRain className="w-3.5 h-3.5" /> Rain Storm</span>}
            </div>
          </div>

          {/* Bottom Graph Section */}
          <div className="mt-4 bg-slate-900 border border-slate-800/80 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2 gap-2 flex-wrap">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" /> 24-Hour Energy Balancing Curve
              </div>
              <div className="flex gap-3 sm:gap-4 text-[9px] sm:text-[10px] font-mono">
                <span className="flex items-center gap-1 text-amber-400">
                  <span className="w-2.5 h-1.5 bg-amber-500 rounded-sm inline-block" /> Solar Gen
                </span>
                <span className="flex items-center gap-1 text-sky-400">
                  <span className="w-2.5 h-1.5 bg-sky-400 rounded-sm inline-block" /> Home Load
                </span>
              </div>
            </div>

            {/* SVG Graph Layout */}
            <div className="relative">
              <svg viewBox="0 0 400 120" className="w-full h-[120px] overflow-visible">
                {/* X Axis Grid Lines */}
                <line x1="0" y1="120" x2="400" y2="120" stroke="#334155" strokeWidth="1" />
                <line x1="0" y1="0" x2="0" y2="120" stroke="#1E293B" />
                <line x1="100" y1="0" x2="100" y2="120" stroke="#1E293B" strokeDasharray="2,2" />
                <line x1="200" y1="0" x2="200" y2="120" stroke="#1E293B" strokeDasharray="2,2" />
                <line x1="300" y1="0" x2="300" y2="120" stroke="#1E293B" strokeDasharray="2,2" />
                <line x1="400" y1="0" x2="400" y2="120" stroke="#1E293B" />

                {/* Left/Right Grid Bounds Label */}
                <text x="5" y="115" fill="#475569" fontSize="8" fontFamily="monospace">6 AM</text>
                <text x="200" y="115" fill="#475569" fontSize="8" fontFamily="monospace" textAnchor="middle">12 PM</text>
                <text x="395" y="115" fill="#475569" fontSize="8" fontFamily="monospace" textAnchor="end">6 PM</text>

                {/* Filled Area Paths */}
                {/* Generation Fill */}
                <path d={graphPaths.genPath} fill="#f59e0b" fillOpacity="0.12" />
                {/* Consumption Fill */}
                <path d={graphPaths.consPath} fill="#3b82f6" fillOpacity="0.08" />

                {/* Linear Graphs */}
                <polyline fill="none" stroke="#f59e0b" strokeWidth="2.5" points={graphPaths.genLine} />
                <polyline fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,1" points={graphPaths.consLine} />

                {/* Current Active Tracking Time Line */}
                <line x1={currentGraphX} y1="0" x2={currentGraphX} y2="120" stroke="#EF4444" strokeWidth="1.5" />
                <circle cx={currentGraphX} cy="120" r="4" fill="#EF4444" />
              </svg>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: SLIDERS & PARAMETER CONTROLS (5 Cols) */}
        <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col justify-between bg-slate-950">
          <div>
            <div className="border-b border-slate-800 pb-4 mb-5">
              <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-orange-500" /> Environment Control Panel
              </h4>
            </div>

            {/* Time of Day Control */}
            <div className="mb-5">
              <div className="flex justify-between items-center text-xs text-slate-400 mb-2 font-mono">
                <span>TIME OF DAY (6AM - 6PM)</span>
                <span className="text-amber-400 font-bold">{formatTime(sim.sunPosition)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                value={sim.sunPosition}
                onChange={e => setSim(prev => ({ ...prev, sunPosition: parseInt(e.target.value) }))}
                className="range-slider range-slider-amber w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-mono mt-1">
                <span>Sunrise</span>
                <span>Noon (Peak)</span>
                <span>Sunset</span>
              </div>
            </div>

            {/* Quick Weather Presets */}
            <div className="mb-5">
              <span className="text-xs text-slate-400 block mb-2 font-mono">WEATHER PROFILE PRESETS</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleWeatherChange('sunny')}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                    activeWeather === 'sunny'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" /> Sunny
                </button>
                <button
                  onClick={() => handleWeatherChange('cloudy')}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                    activeWeather === 'cloudy'
                      ? 'bg-sky-500/10 border-sky-500 text-sky-400 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Cloud className="w-3.5 h-3.5" /> Cloudy
                </button>
                <button
                  onClick={() => handleWeatherChange('rainy')}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                    activeWeather === 'rainy'
                      ? 'bg-blue-500/10 border-blue-500 text-blue-400 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <CloudRain className="w-3.5 h-3.5" /> Stormy
                </button>
              </div>
            </div>

            <div className="border-t border-slate-800/60 my-5 pt-4">
              <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5 mb-4">
                <Zap className="w-4 h-4 text-blue-500" /> Engineering Specifications
              </h4>
            </div>

            {/* Panel Count Control */}
            <div className="mb-5">
              <div className="flex justify-between items-center text-xs text-slate-400 mb-2 font-mono">
                <span>PANEL SYSTEM SIZING</span>
                <span className="text-blue-400 font-bold">{sim.panelCount} Panels ({(sim.panelCount * 0.45).toFixed(1)} kW)</span>
              </div>
              <input
                type="range"
                min="4"
                max="40"
                step="2"
                value={sim.panelCount}
                onChange={e => setSim(prev => ({ ...prev, panelCount: parseInt(e.target.value) }))}
                className="range-slider range-slider-blue w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-mono mt-1">
                <span>Small Roof (1.8kW)</span>
                <span>Medium (5.4kW)</span>
                <span>Estate (18kW)</span>
              </div>
            </div>

            {/* Roof Angle Pitch Control */}
            <div className="mb-5">
              <div className="flex justify-between items-center text-xs text-slate-400 mb-2 font-mono">
                <span>ROOF SURFACE PITCH</span>
                <span className="text-emerald-400 font-bold">{sim.roofAngle}° Pitch</span>
              </div>
              <input
                type="range"
                min="10"
                max="45"
                value={sim.roofAngle}
                onChange={e => setSim(prev => ({ ...prev, roofAngle: parseInt(e.target.value) }))}
                className="range-slider range-slider-emerald w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-mono mt-1">
                <span>Flat / Low Slope</span>
                <span>Optimal (28°)</span>
                <span>Steep A-Frame</span>
              </div>
            </div>

            {/* Dust & Cleaning Shading slider */}
            <div className="mb-5">
              <div className="flex justify-between items-center text-xs text-slate-400 mb-2 font-mono gap-2">
                <span className="shrink-0">PANEL SOILING / DUST</span>
                <span className={`font-bold ${sim.shadingLevel > 40 ? 'text-red-400' : sim.shadingLevel > 15 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {sim.shadingLevel}% Dust (Losses)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="75"
                value={sim.shadingLevel}
                onChange={e => setSim(prev => ({ ...prev, shadingLevel: parseInt(e.target.value) }))}
                className="range-slider range-slider-orange w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-mono mt-1">
                <span>Pristine Glass (0%)</span>
                <span>Average Soiled (20%)</span>
                <span>Heavily Blocked (75%)</span>
              </div>
            </div>

            {/* Battery Backup Toggle */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${sim.hasBattery ? 'bg-green-500/10 text-green-400' : 'bg-slate-800 text-slate-500'}`}>
                  <Battery className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">Battery Backup (On Request)</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Optional hybrid storage — see how storing daytime excess reduces grid reliance.</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={sim.hasBattery}
                  onChange={e => setSim(prev => ({ ...prev, hasBattery: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 peer-checked:after:bg-white"></div>
              </label>
            </div>
          </div>

          {/* CTA Box to Apply to Savings Calculator */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <button
              onClick={() => {
                onApplyToCalculator(sim.panelCount);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/15 transition-all duration-300 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Port Sizing to Savings Estimator ({sim.panelCount} Panels)</span>
              <span className="sm:hidden">Apply {sim.panelCount} Panels to Estimator</span>
            </button>
            <p className="text-[10px] text-slate-500 text-center mt-2">
              Bridges this simulated roof size directly into India's central solar subsidies portal.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
