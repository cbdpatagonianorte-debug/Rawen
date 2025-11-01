
import React, { useMemo } from 'react';
// FIX: Import ZodiacSign type to resolve type error.
import type { AstrologicalData, ZodiacSign } from '../types';
import { ZODIAC_SIGNS, ZODIAC_SYMBOLS, PLANET_SYMBOLS, PLANET_COLORS } from '../constants';

interface NatalChartProps {
  data: AstrologicalData;
}

declare const d3: any;

export const NatalChart: React.FC<NatalChartProps> = ({ data }) => {
  const size = 500;
  const center = size / 2;
  const zodiacRadius = size / 2 - 20;
  const houseRadius = zodiacRadius - 30;
  const planetRadius = houseRadius - 50;

  const ascendantDegrees = useMemo(() => {
    const asc = data.planets.find(p => p.name === 'Ascendant');
    if (!asc) return 0;
    const signIndex = ZODIAC_SIGNS.indexOf(asc.sign);
    return signIndex * 30 + asc.degrees;
  }, [data.planets]);

  const rotationOffset = -ascendantDegrees - 90;

  // FIX: Correctly type `sign` as ZodiacSign instead of string.
  const getPlanetPosition = (sign: ZodiacSign, degrees: number) => {
    const signIndex = ZODIAC_SIGNS.indexOf(sign);
    const totalDegrees = signIndex * 30 + degrees + rotationOffset;
    const angle = (totalDegrees * Math.PI) / 180;
    const x = center + planetRadius * Math.cos(angle);
    const y = center + planetRadius * Math.sin(angle);
    return { x, y };
  };

  const zodiacScale = d3.scaleLinear().domain([0, 360]).range([0, 2 * Math.PI]);

  const houseCusps = useMemo(() => {
    return data.houses.map(h => {
        const signIndex = ZODIAC_SIGNS.indexOf(h.sign);
        return signIndex * 30 + h.degrees;
    });
  }, [data.houses]);
  
  return (
    <div className="relative w-full max-w-[500px] mx-auto aspect-square">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: 'rgb(30, 41, 59)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'rgb(15, 23, 42)', stopOpacity: 1 }} />
          </radialGradient>
        </defs>
        
        <circle cx={center} cy={center} r={size/2} fill="url(#grad1)" />
        <circle cx={center} cy={center} r={zodiacRadius} fill="none" stroke="#334155" strokeWidth="1" />
        <circle cx={center} cy={center} r={houseRadius} fill="none" stroke="#334155" strokeWidth="0.5" />

        {/* Zodiac Signs */}
        {ZODIAC_SIGNS.map((sign, i) => {
          const angle = zodiacScale(i * 30 + 15 + rotationOffset);
          const x = center + (zodiacRadius - 15) * Math.cos(angle);
          const y = center + (zodiacRadius - 15) * Math.sin(angle);
          return (
            <text key={sign} x={x} y={y} fill="#94a3b8" fontSize="18" textAnchor="middle" alignmentBaseline="middle">
              {ZODIAC_SYMBOLS[sign]}
            </text>
          );
        })}

        {/* House Cusps and Lines */}
        {houseCusps.map((cuspDegrees, i) => {
            const angleRad = zodiacScale(cuspDegrees + rotationOffset);
            const startX = center;
            const startY = center;
            const endX = center + zodiacRadius * Math.cos(angleRad);
            const endY = center + zodiacRadius * Math.sin(angleRad);
            const textX = center + (houseRadius - 15) * Math.cos(angleRad + Math.PI/12);
            const textY = center + (houseRadius - 15) * Math.sin(angleRad + Math.PI/12);

            return (
              <g key={`house-${i}`}>
                <line x1={startX} y1={startY} x2={endX} y2={endY} stroke="#475569" strokeWidth={i % 3 === 0 ? 1 : 0.5} strokeDasharray={i % 3 === 0 ? "0" : "2,2"}/>
                <text x={textX} y={textY} fill="#64748b" fontSize="10" textAnchor="middle" alignmentBaseline="middle">{((i % 12) + 1)}</text>
              </g>
            );
        })}

        {/* Planets */}
        {data.planets.map(planet => {
          const { x, y } = getPlanetPosition(planet.sign, planet.degrees);
          return (
            <g key={planet.name}>
              <title>{`${planet.name} in ${planet.sign} at ${planet.degrees.toFixed(1)}°`}</title>
              <text x={x} y={y} fill={PLANET_COLORS[planet.name]} fontSize="20" textAnchor="middle" alignmentBaseline="middle" style={{cursor: 'pointer'}}>
                {PLANET_SYMBOLS[planet.name]}
              </text>
            </g>
          );
        })}
        
        {/* Center circle */}
        <circle cx={center} cy={center} r={planetRadius - 30} fill="none" stroke="#334155" strokeWidth="0.5"/>

      </svg>
    </div>
  );
};