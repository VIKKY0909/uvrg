import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Leaf, Zap, HelpCircle, ChevronRight, IndianRupee, Sparkles } from 'lucide-react';

interface SavingsProjectorChartProps {
  capacityKw: number;
  initialAnnualSavings: number;
  netInvestment: number;
  paybackYears: number;
}

export default function SavingsProjectorChart({
  capacityKw,
  initialAnnualSavings,
  netInvestment,
  paybackYears
}: SavingsProjectorChartProps) {
  const [activeTab, setActiveTab] = useState<'financial' | 'generation' | 'environmental'>('financial');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(500);

  // Measure parent width for responsive SVG calculations
  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = () => {
      if (containerRef.current) {
        const style = window.getComputedStyle(containerRef.current);
        const paddingLeftVal = parseFloat(style.paddingLeft) || 0;
        const paddingRightVal = parseFloat(style.paddingRight) || 0;
        const availableWidth = containerRef.current.clientWidth - paddingLeftVal - paddingRightVal;
        setContainerWidth(Math.max(280, availableWidth));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate 25-year projection data array
  const projectionData = useMemo(() => {
    const data = [];
    let cumulativeSavings = 0;
    const baseGeneration = capacityKw * 120 * 12; // 1kW = 120 units/mo * 12 mos = 1440 units/yr

    for (let year = 1; year <= 25; year++) {
      // 0.5% yearly performance degradation of panels
      const degradationFactor = Math.pow(1 - 0.005, year - 1);
      const yearGeneration = baseGeneration * degradationFactor;

      // 4% yearly DISCOM electricity tariff price escalation
      const tariffEscalation = Math.pow(1.04, year - 1);
      const yearSavings = initialAnnualSavings * tariffEscalation * degradationFactor;
      cumulativeSavings += yearSavings;

      // CO2 calculations: 0.82 kg CO2 saved per solar unit
      const co2OffsetTons = (yearGeneration * 0.82) / 1000;
      const cumulativeCo2Tons = (baseGeneration * year * degradationFactor * 0.82) / 1000; // cumulative approximation

      data.push({
        year,
        yearLabel: `Year ${year}`,
        calendarYear: new Date().getFullYear() + year,
        generation: Math.round(yearGeneration),
        annualSavings: Math.round(yearSavings),
        cumulativeSavings: Math.round(cumulativeSavings),
        co2OffsetTons: Number(co2OffsetTons.toFixed(2)),
        cumulativeCo2Tons: Number(cumulativeCo2Tons.toFixed(2)),
        isPaidBack: cumulativeSavings >= netInvestment
      });
    }
    return data;
  }, [capacityKw, initialAnnualSavings, netInvestment]);

  // Chart coordinate mapping math (D3-style scaling built using pure responsive algebra)
  const chartHeight = 220;
  const paddingLeft = 55;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 30;

  const chartWidth = containerWidth;
  const drawWidth = chartWidth - paddingLeft - paddingRight;
  const drawHeight = chartHeight - paddingTop - paddingBottom;

  // Find max bounds depending on active dataset
  const maxVal = useMemo(() => {
    if (activeTab === 'financial') {
      const maxCumul = projectionData[projectionData.length - 1].cumulativeSavings;
      return Math.max(maxCumul, netInvestment) * 1.05;
    } else if (activeTab === 'generation') {
      return projectionData[0].generation * 1.1; // Generation is highest in Year 1
    } else {
      return projectionData[projectionData.length - 1].cumulativeCo2Tons * 1.05;
    }
  }, [activeTab, projectionData, netInvestment]);

  // Compute SVG Points
  const points = useMemo(() => {
    if (drawWidth <= 0) return [];
    
    return projectionData.map((d, i) => {
      const x = paddingLeft + (i / 24) * drawWidth;
      let val = 0;
      if (activeTab === 'financial') val = d.cumulativeSavings;
      else if (activeTab === 'generation') val = d.generation;
      else val = d.cumulativeCo2Tons;

      const y = chartHeight - paddingBottom - (val / maxVal) * drawHeight;
      return { x, y, data: d };
    });
  }, [projectionData, activeTab, drawWidth, drawHeight, maxVal]);

  // Area path generator (goes to the baseline)
  const areaPath = useMemo(() => {
    if (points.length === 0) return '';
    const startPoint = `${points[0].x},${chartHeight - paddingBottom}`;
    const linePath = points.map(p => `${p.x},${p.y}`).join(' L ');
    const endPoint = `${points[points.length - 1].x},${chartHeight - paddingBottom}`;
    return `M ${startPoint} L ${linePath} L ${endPoint} Z`;
  }, [points]);

  // Stroke line path generator
  const strokePath = useMemo(() => {
    if (points.length === 0) return '';
    return 'M ' + points.map(p => `${p.x},${p.y}`).join(' L ');
  }, [points]);

  // Payback baseline line coordinate (only for financial tab)
  const paybackYCoord = useMemo(() => {
    if (activeTab !== 'financial') return null;
    return chartHeight - paddingBottom - (netInvestment / maxVal) * drawHeight;
  }, [activeTab, netInvestment, maxVal, drawHeight]);

  // Hover tracker event handler
  const handlePointerMove = (clientX: number, svgLeft: number) => {
    if (points.length === 0) return;
    
    let closestIndex = 0;
    let minDistance = Infinity;

    points.forEach((p, idx) => {
      const dist = Math.abs(p.x - (clientX - svgLeft));
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });

    setHoveredIndex(closestIndex);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handlePointerMove(e.clientX, rect.left);
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    if (touch) handlePointerMove(touch.clientX, rect.left);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const activeHoverData = hoveredIndex !== null ? projectionData[hoveredIndex] : null;

  return (
    <div ref={containerRef} className="bg-slate-950/75 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-6 overflow-hidden">
      
      {/* Tab Selectors & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-blue-400 font-mono uppercase tracking-widest block">25-Year Production &amp; Amortization</span>
          <h4 className="text-base font-bold text-white mt-0.5 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-cyan-400" /> Dynamic Return Ledger
          </h4>
        </div>

        {/* Dynamic Navigation Toggles */}
        <div className="flex overflow-x-auto scroll-tabs bg-slate-900 border border-slate-800 p-1 rounded-xl text-[9px] sm:text-[10px] font-bold tracking-wider font-mono uppercase w-full sm:w-auto">
          <button
            onClick={() => { setActiveTab('financial'); setHoveredIndex(null); }}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'financial' 
                ? 'bg-blue-600 text-white font-black' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Financial
          </button>
          <button
            onClick={() => { setActiveTab('generation'); setHoveredIndex(null); }}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'generation' 
                ? 'bg-cyan-600 text-white font-black' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Generation
          </button>
          <button
            onClick={() => { setActiveTab('environmental'); setHoveredIndex(null); }}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'environmental' 
                ? 'bg-sky-600 text-white font-black' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            CO2 Offsets
          </button>
        </div>
      </div>

      {/* SVG Canvas Stage wrapped in motion.div to smoothly fade in and scale up */}
      <motion.div
        key={`${capacityKw}-${initialAnnualSavings}-${netInvestment}-${activeTab}`}
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
      >
        <svg
          width={chartWidth}
          height={chartHeight}
          className="overflow-visible select-none cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseLeave}
        >
          {/* Defs for gradients */}
          <defs>
            <linearGradient id="financialAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="generationAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="environmentalAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          
          {/* Horizontal Gridlines */}
          {[0, 0.25, 0.5, 0.75, 1.0].map((ratio, idx) => {
            const y = paddingTop + ratio * drawHeight;
            const gridVal = maxVal * (1 - ratio);
            
            // Format labels
            let label = '';
            if (activeTab === 'financial') {
              label = gridVal >= 100000 
                ? `₹${(gridVal / 100000).toFixed(1)}L` 
                : `₹${Math.round(gridVal / 1000)}k`;
            } else if (activeTab === 'generation') {
              label = `${Math.round(gridVal)} kWh`;
            } else {
              label = `${Math.round(gridVal)} Tons`;
            }

            return (
              <g key={idx}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth - paddingRight}
                  y2={y}
                  stroke="rgba(31, 41, 55, 0.45)"
                  strokeDasharray="4 4"
                  strokeWidth={1}
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3}
                  fill="rgba(156, 163, 175, 0.8)"
                  fontSize="8"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* Payback Threshold Line (Financial only) */}
          {activeTab === 'financial' && paybackYCoord !== null && (
            <g>
              <line
                x1={paddingLeft}
                y1={paybackYCoord}
                x2={chartWidth - paddingRight}
                y2={paybackYCoord}
                stroke="#EF4444"
                strokeWidth={1.5}
                strokeDasharray="3 3"
                opacity={0.8}
              />
              <text
                x={chartWidth - paddingRight - 4}
                y={paybackYCoord - 5}
                fill="#EF4444"
                fontSize="8"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="end"
              >
                PAYBACK CAPEX (₹{netInvestment.toLocaleString('en-IN')})
              </text>
            </g>
          )}

          {/* Year Markers on X-Axis */}
          {[1, 5, 10, 15, 20, 25].map((yVal) => {
            const idx = yVal - 1;
            const x = paddingLeft + (idx / 24) * drawWidth;
            return (
              <g key={yVal}>
                <line
                  x1={x}
                  y1={chartHeight - paddingBottom}
                  x2={x}
                  y2={chartHeight - paddingBottom + 4}
                  stroke="#374151"
                  strokeWidth={1}
                />
                <text
                  x={x}
                  y={chartHeight - paddingBottom + 16}
                  fill="#9CA3AF"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  Y{yVal}
                </text>
              </g>
            );
          })}

          {/* Area under line */}
          {points.length > 0 && (
            <motion.path
              d={areaPath}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              fill={
                activeTab === 'financial' 
                  ? 'url(#financialAreaGrad)' 
                  : activeTab === 'generation' 
                    ? 'url(#generationAreaGrad)' 
                    : 'url(#environmentalAreaGrad)'
              }
            />
          )}

          {/* Line stroke */}
          {points.length > 0 && (
            <motion.path
              d={strokePath}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              fill="none"
              stroke={
                activeTab === 'financial' 
                  ? '#2563EB' 
                  : activeTab === 'generation' 
                    ? '#06B6D4' 
                    : '#3B82F6'
              }
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          )}

          {/* Active Hover vertical line & tracker node */}
          {hoveredIndex !== null && points[hoveredIndex] && (
            <g>
              {/* Vertical line projection */}
              <line
                x1={points[hoveredIndex].x}
                y1={paddingTop}
                x2={points[hoveredIndex].x}
                y2={chartHeight - paddingBottom}
                stroke="rgba(156, 163, 175, 0.45)"
                strokeWidth={1.5}
              />

              {/* Glowing Bouncing Point circle */}
              <circle
                cx={points[hoveredIndex].x}
                cy={points[hoveredIndex].y}
                r={6}
                fill={
                  activeTab === 'financial' 
                    ? '#2563EB' 
                    : activeTab === 'generation' 
                      ? '#06B6D4' 
                      : '#3B82F6'
                }
                stroke="#FFFFFF"
                strokeWidth={2}
              />
            </g>
          )}
        </svg>

        {/* Floating details tooltip inside viewport */}
        <AnimatePresence>
          {activeHoverData && hoveredIndex !== null && points[hoveredIndex] && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="absolute pointer-events-none bg-slate-900/95 border border-slate-800 rounded-xl p-3 shadow-2xl z-20 space-y-2 font-mono text-[10px] w-48 sm:w-52 text-left"
              style={{
                left: `${Math.min(
                  chartWidth - 220,
                  Math.max(10, points[hoveredIndex].x - 110)
                )}px`,
                top: `${Math.max(10, points[hoveredIndex].y - 125)}px`
              }}
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                <span className="font-bold text-white text-xs">{activeHoverData.yearLabel} ({activeHoverData.calendarYear})</span>
                <span className={`px-2 py-0.5 rounded text-[8px] font-black ${
                  activeHoverData.isPaidBack 
                    ? 'bg-cyan-500/10 text-cyan-400' 
                    : 'bg-blue-500/10 text-blue-400'
                }`}>
                  {activeHoverData.isPaidBack ? 'Fully Paid!' : 'Amortizing'}
                </span>
              </div>

              <div className="space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span>Cum. Savings:</span>
                  <span className="font-bold text-white">₹{activeHoverData.cumulativeSavings.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Year Generation:</span>
                  <span className="font-bold text-cyan-400">{activeHoverData.generation.toLocaleString()} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Saved:</span>
                  <span className="font-bold text-blue-400">₹{activeHoverData.annualSavings.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cum. CO2 Off:</span>
                  <span className="font-bold text-sky-400">{activeHoverData.cumulativeCo2Tons} Tons</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Explanatory Info Card below chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-[10px] font-mono text-slate-400 leading-normal">
        <div className="bg-slate-900/50 p-2.5 rounded-xl border border-slate-900 flex gap-2">
          <Zap className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Compound Yield:</strong> Year 25 savings reach higher amounts due to compound 4% inflation adjustments despite standard panel degradation of 0.5%/yr.
          </span>
        </div>
        <div className="bg-slate-900/50 p-2.5 rounded-xl border border-slate-900 flex gap-2">
          <Leaf className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Zero Grid Outflow:</strong> Generated power matches peak load times, reducing your DISCOM tariff index. Accumulated savings are entirely tax-free.
          </span>
        </div>
        <div className="bg-slate-900/50 p-2.5 rounded-xl border border-slate-900 flex gap-2">
          <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Investment Payback:</strong> Average payback of complete rooftop arrays is achieved in just {paybackYears} years, providing {25 - paybackYears} years of 100% free power.
          </span>
        </div>
      </div>

    </div>
  );
}
