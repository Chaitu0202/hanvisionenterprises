import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useApp } from '../../context/AppContext';
import { Layers, ShieldCheck, ArrowRight, Gauge, Weight, Box, Sparkles } from 'lucide-react';

interface PlyOption {
  id: string;
  name: string;
  walls: string;
  loadCapacity: string;
  thickness: string;
  idealFor: string;
  burstIndex: string;
  layers: number;
}

const PLY_OPTIONS: PlyOption[] = [
  {
    id: '3-ply',
    name: '3-Ply (Single Wall)',
    walls: '2 Liners + 1 Fluted Medium',
    loadCapacity: 'Up to 15 kg payload',
    thickness: '~3.0 mm',
    idealFor: 'E-commerce parcels, textiles, apparel, dry FMCG, and light retail merchandise.',
    burstIndex: 'Standard commercial burst strength',
    layers: 3
  },
  {
    id: '5-ply',
    name: '5-Ply (Double Wall)',
    walls: '3 Liners + 2 Fluted Mediums',
    loadCapacity: '15 to 45 kg payload',
    thickness: '~6.5 - 7.0 mm',
    idealFor: 'Industrial hardware, automotive spares, electrical goods, and bulk export shipping.',
    burstIndex: 'High vertical compression & edge crush resistance',
    layers: 5
  },
  {
    id: '7-ply',
    name: '7-Ply (Triple Wall)',
    walls: '4 Liners + 3 Fluted Mediums',
    loadCapacity: '45 to 120+ kg payload',
    thickness: '~12.0 - 15.0 mm',
    idealFor: 'Heavy machinery parts, metal castings, chemical drums, and wooden crate replacement.',
    burstIndex: 'Extreme stacking stability & puncture resistance',
    layers: 7
  }
];

export const BoxSpecVisualizer: React.FC = () => {
  const { navigate } = useRouter();
  const { setSelectedQuoteProduct } = useApp();
  const [selectedPly, setSelectedPly] = useState<string>('5-ply');
  const [activeFlute, setActiveFlute] = useState<string>('BC');

  const currentOption = PLY_OPTIONS.find((p) => p.id === selectedPly) || PLY_OPTIONS[1];

  const handleConfigureQuote = () => {
    setSelectedQuoteProduct(`${currentOption.name} - ${activeFlute}-Flute Custom Carton`);
    navigate('/request-quote');
  };

  return (
    <div className="bg-[#172228] border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F28B35]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#0B1114] border border-white/10 text-[11px] font-bold text-[#F28B35] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Packaging Engineering Tool</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F5] tracking-tight">
              BOX PLY & FLUTE ARCHITECTURE VISUALIZER
            </h3>
            <p className="text-xs sm:text-sm text-[#A6B2B7] max-w-2xl leading-relaxed">
              Explore how paper plies and wave fluting work together to protect your payload. Select a configuration to inspect material specifications and recommended load ratings.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={handleConfigureQuote}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F28B35] hover:bg-[#FFAB5C] text-[#0B1114] font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              <span>Quote This Spec</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Ply Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PLY_OPTIONS.map((ply) => {
            const isSelected = selectedPly === ply.id;
            return (
              <button
                key={ply.id}
                onClick={() => setSelectedPly(ply.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#202D34] border-[#F28B35] shadow-lg ring-1 ring-[#F28B35]/30'
                    : 'bg-[#0B1114]/60 border-white/10 hover:border-white/20 hover:bg-[#202D34]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-[#F28B35]' : 'text-[#F4F6F5]'}`}>
                    {ply.name}
                  </span>
                  <div className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-[#F28B35]' : 'bg-white/20'}`} />
                </div>
                <div className="text-[11px] text-[#A6B2B7] font-medium">
                  {ply.walls}
                </div>
                <div className="mt-2 text-xs font-bold text-[#F4F6F5]">
                  {ply.loadCapacity}
                </div>
              </button>
            );
          })}
        </div>

        {/* Visual Board Cross-Section & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B1114] border border-white/5 rounded-2xl p-6 sm:p-8">
          {/* Left Diagram / SVG Cross-Section */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A6B2B7]">
                Cross-Section Architecture
              </span>
              <span className="text-xs font-semibold text-[#F28B35]">
                {currentOption.walls}
              </span>
            </div>

            {/* SVG Visual Representation of the Board Layers */}
            <div className="p-6 bg-[#172228] rounded-xl border border-white/10 flex flex-col items-center justify-center space-y-2">
              {/* Outer Top Liner */}
              <div className="w-full h-3 rounded bg-[#C49A6C] border border-[#A67C52] flex items-center justify-center text-[9px] font-bold text-[#2A1D13] tracking-wider uppercase">
                Outer Kraft Liner (Smooth Face)
              </div>

              {/* Flute 1 */}
              <div className="w-full py-2 px-1 flex items-center justify-around overflow-hidden border-y border-dashed border-[#F28B35]/40 bg-[#0B1114]/40">
                <svg className="w-full h-7 text-[#F28B35]" viewBox="0 0 400 24" fill="none" preserveAspectRatio="none">
                  <path
                    d="M0 20 Q 15 0, 30 20 T 60 20 T 90 20 T 120 20 T 150 20 T 180 20 T 210 20 T 240 20 T 270 20 T 300 20 T 330 20 T 360 20 T 390 20 T 420 20"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Middle Liner for 5-ply and 7-ply */}
              {currentOption.layers >= 5 && (
                <>
                  <div className="w-full h-2.5 rounded bg-[#B0895D] border border-[#8C6642] flex items-center justify-center text-[9px] font-bold text-[#2A1D13] tracking-wider uppercase">
                    Intermediate Fluting Liner
                  </div>

                  {/* Flute 2 */}
                  <div className="w-full py-2 px-1 flex items-center justify-around overflow-hidden border-y border-dashed border-[#F28B35]/40 bg-[#0B1114]/40">
                    <svg className="w-full h-7 text-[#F28B35]" viewBox="0 0 400 24" fill="none" preserveAspectRatio="none">
                      <path
                        d="M0 4 Q 15 24, 30 4 T 60 4 T 90 4 T 120 4 T 150 4 T 180 4 T 210 4 T 240 4 T 270 4 T 300 4 T 330 4 T 360 4 T 390 4 T 420 4"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </>
              )}

              {/* Additional Layer for 7-ply */}
              {currentOption.layers === 7 && (
                <>
                  <div className="w-full h-2.5 rounded bg-[#9C754E] border border-[#7A5432] flex items-center justify-center text-[9px] font-bold text-[#2A1D13] tracking-wider uppercase">
                    Reinforced Center Liner
                  </div>

                  {/* Flute 3 */}
                  <div className="w-full py-2 px-1 flex items-center justify-around overflow-hidden border-y border-dashed border-[#F28B35]/40 bg-[#0B1114]/40">
                    <svg className="w-full h-7 text-[#F28B35]" viewBox="0 0 400 24" fill="none" preserveAspectRatio="none">
                      <path
                        d="M0 20 Q 15 0, 30 20 T 60 20 T 90 20 T 120 20 T 150 20 T 180 20 T 210 20 T 240 20 T 270 20 T 300 20 T 330 20 T 360 20 T 390 20 T 420 20"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </>
              )}

              {/* Bottom Inner Liner */}
              <div className="w-full h-3 rounded bg-[#C49A6C] border border-[#A67C52] flex items-center justify-center text-[9px] font-bold text-[#2A1D13] tracking-wider uppercase">
                Inner Kraft Liner (Product Contact Face)
              </div>
            </div>

            <div className="text-[11px] text-[#A6B2B7] text-center italic">
              Wave arches act as structural columns, converting external impacts into dispersed surface tension.
            </div>
          </div>

          {/* Right Specs Table */}
          <div className="lg:col-span-6 space-y-4">
            <h4 className="text-base font-bold text-[#F4F6F5] flex items-center gap-2">
              <Box className="w-4 h-4 text-[#F28B35]" />
              <span>Recommended Engineering Profile</span>
            </h4>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-[#172228] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs text-[#A6B2B7]">
                  <Weight className="w-4 h-4 text-[#F28B35]" />
                  <span>Payload Capacity</span>
                </div>
                <span className="text-xs font-bold text-[#F4F6F5]">{currentOption.loadCapacity}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#172228] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs text-[#A6B2B7]">
                  <Gauge className="w-4 h-4 text-[#F28B35]" />
                  <span>Caliper Thickness</span>
                </div>
                <span className="text-xs font-bold text-[#F4F6F5]">{currentOption.thickness}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#172228] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs text-[#A6B2B7]">
                  <ShieldCheck className="w-4 h-4 text-[#F28B35]" />
                  <span>Compression Strength</span>
                </div>
                <span className="text-xs font-bold text-emerald-400">High Stacking Tolerance</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#172228] border border-white/5 space-y-1">
                <span className="text-[11px] font-bold text-[#F28B35] uppercase tracking-wider">
                  Typical Industrial Applications
                </span>
                <p className="text-xs text-[#A6B2B7] leading-relaxed">
                  {currentOption.idealFor}
                </p>
              </div>
            </div>

            {/* Quick Flute Selector */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A6B2B7] block mb-2">
                Available Wave Flute Formats
              </span>
              <div className="flex flex-wrap gap-2">
                {['B-Flute (3mm)', 'C-Flute (4mm)', 'BC-Flute (7mm)', 'E-Flute (1.5mm)'].map((flute) => {
                  const fKey = flute.split('-')[0];
                  const isFSelected = activeFlute === fKey;
                  return (
                    <button
                      key={flute}
                      onClick={() => setActiveFlute(fKey)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isFSelected
                          ? 'bg-[#F28B35] text-[#0B1114]'
                          : 'bg-[#172228] text-[#A6B2B7] hover:text-[#F4F6F5]'
                      }`}
                    >
                      {flute}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
