import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { MANUFACTURING_STEPS, PACKAGING_ASSETS } from '../data/companyData';
import { SafeImage } from '../components/common/SafeImage';
import {
  ArrowUpRight,
  Factory,
  Layers,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  MapPin,
  Cog,
  FileCheck,
  Truck
} from 'lucide-react';

export const ManufacturingPage: React.FC = () => {
  const { navigate } = useRouter();

  const manufacturingStages = [
    {
      step: '01',
      title: 'Requirement & Engineering Evaluation',
      description:
        'We review your product weight, CAD drawings, internal packing inserts, drop vulnerability, and transit conditions to recommend the optimal board grade.',
      points: [
        'Payload weight assessment & stacking height calculations',
        'Inner vs. outer dimension tolerance calibration',
        'Corrugation flute selection (B, C, E flutes)'
      ]
    },
    {
      step: '02',
      title: 'Board Corrugation & Sheet Formation',
      description:
        'Kraft paper liners and wave fluting mediums are laminated under precise heat and starch adhesion to create high-tensile 3-ply, 5-ply, or 7-ply sheets.',
      points: [
        'Virgin and semi-kraft paper roll selection',
        'High-caliper fluting wave compression',
        'Starch adhesive bonding with controlled moisture cure'
      ]
    },
    {
      step: '03',
      title: 'Precision Slitting, Creasing & Die-Cutting',
      description:
        'Corrugated sheets are slit to size and precision-creased for seamless folding without cracking liner surfaces along the bend lines.',
      points: [
        'Rotary slitting and rotary creasing machines',
        'Punch die-cutting for handles, ventilation holes & slots',
        'Clean edge trim to prevent fiber fraying'
      ]
    },
    {
      step: '04',
      title: 'Flexographic Printing & Industrial Marks',
      description:
        'Application of high-visibility water-based flexographic inks for company logos, shipping warnings, handling icons (fragile/this side up), and barcodes.',
      points: [
        'Fast-curing water-based ink formulation',
        'Custom stereo plate mounting for crisp legibility',
        '1-color, 2-color, and multi-color flexo capabilities'
      ]
    },
    {
      step: '05',
      title: 'Structural Joining: Stitching & Gluing',
      description:
        'Depending on carton heavy-duty specifications, joints are either reinforced with rust-resistant industrial wire staples or cold PVA adhesive glue lines.',
      points: [
        'Heavy-gauge rust-resistant flat wire stitching for industrial crates',
        'High-shear adhesive lap joints for consumer boxes',
        'Square joint alignment for uniform pallet stacking'
      ]
    },
    {
      step: '06',
      title: 'Quality Verification & Strapping',
      description:
        'Before dispatch, manufactured batches undergo dimensional verification, score alignment tests, and secure strapping in flat bundles.',
      points: [
        'Dimensional caliper measurement against approved job cards',
        'Flute bonding bond strength check',
        'Tight plastic strapping in uniform bundles for easy inventory handling'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <Breadcrumbs items={[{ label: 'Manufacturing Process' }]} />

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#172228] border border-white/10 text-xs font-semibold text-[#F28B35] uppercase">
          <Factory className="w-3.5 h-3.5" />
          <span>Manufacturing Facility • Anandapuram</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F6F5] tracking-tight">
          CORRUGATED PACKAGING MANUFACTURING PROCESS.
        </h1>
        <p className="text-sm sm:text-base text-[#A6B2B7] leading-relaxed">
          From virgin kraft paper rolls to finished folded cartons ready for packing lines. Explore how Hanvision Enterprises manufactures durable, high-integrity corrugated packaging boxes in Visakhapatnam.
        </p>
      </div>

      {/* Facility Image and Fluting Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#172228] flex flex-col">
          <SafeImage
            src={PACKAGING_ASSETS.factory}
            alt="Corrugation Plant Line & Paper Reel Feed"
            className="w-full h-auto aspect-video object-cover"
          />
          <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#F28B35] uppercase">
                Corrugator Line & Reel Handling
              </span>
              <p className="text-xs text-[#A6B2B7] leading-relaxed mt-1.5">
                Precision heated corrugation rollers transform kraft paper reels into single, double, or triple-wall boards under controlled steam moisture.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#172228] flex flex-col">
          <SafeImage
            src={PACKAGING_ASSETS.fluting}
            alt="Corrugation Fluting Architecture"
            className="w-full h-auto aspect-video object-cover"
          />
          <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#F28B35] uppercase">
                Cushioning Flute Architecture
              </span>
              <p className="text-xs text-[#A6B2B7] leading-relaxed mt-1.5">
                The internal arched corrugations create structural trusses that resist top-to-bottom compression while absorbing dynamic transit shocks.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#172228] flex flex-col">
          <SafeImage
            src={PACKAGING_ASSETS.diecut}
            alt="Custom Die Cutting and Slitting"
            className="w-full h-auto aspect-video object-cover"
          />
          <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#F28B35] uppercase">
                Precision Creasing & Die-Cutting
              </span>
              <p className="text-xs text-[#A6B2B7] leading-relaxed mt-1.5">
                Accurate rotary die-cutting and clean creasing ensure smooth flap folding, strong corners, and maximum stacking load retention on pallets.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Process Steps */}
      <div className="space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h2 className="text-2xl font-bold text-[#F4F6F5]">
            Step-by-Step Production Sequence
          </h2>
          <p className="text-xs text-[#A6B2B7] mt-1">
            Every production batch follows systematic checks to ensure consistency across shipments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {manufacturingStages.map((stage) => (
            <div
              key={stage.step}
              className="bg-[#172228] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#F28B35]/40 transition-colors space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-extrabold text-[#F28B35]">
                    {stage.step}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A6B2B7] bg-[#202D34] px-2.5 py-1 rounded">
                    Phase {stage.step}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#F4F6F5] mb-2 leading-snug">
                  {stage.title}
                </h3>

                <p className="text-xs text-[#A6B2B7] leading-relaxed mb-4">
                  {stage.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-1.5">
                {stage.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[11px] text-[#F4F6F5]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F28B35] flex-shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facility Notice and Quality Commitment */}
      <div className="bg-[#172228] border border-white/10 rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F28B35]">
            Facility Coordination
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F6F5]">
            VISAKHAPATNAM PRODUCTION & FULFILLMENT.
          </h2>
          <p className="text-sm text-[#A6B2B7] leading-relaxed">
            Our manufacturing facility at Anandapuram allows commercial buyers in Visakhapatnam, Vizianagaram, Srikakulam, and surrounding industrial belts to coordinate packaging supplies with lower freight lead times and dependable dispatch schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-[#202D34] border border-white/5 space-y-1">
            <span className="text-xs font-bold text-[#F4F6F5] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#F28B35]" />
              <span>Tailored Lot Sizes</span>
            </span>
            <p className="text-xs text-[#A6B2B7]">
              Order runs scheduled around your production batches and warehouse holding limits.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#202D34] border border-white/5 space-y-1">
            <span className="text-xs font-bold text-[#F4F6F5] flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#F28B35]" />
              <span>Specification Matching</span>
            </span>
            <p className="text-xs text-[#A6B2B7]">
              Have internal QC requirements? We review your target specifications prior to manufacturing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#202D34] border border-white/5 space-y-1">
            <span className="text-xs font-bold text-[#F4F6F5] flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#F28B35]" />
              <span>Local Transit Advantage</span>
            </span>
            <p className="text-xs text-[#A6B2B7]">
              Rapid transit across Visakhapatnam industrial corridors including Gajuwaka, Parawada, and Gambheeram.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap items-center gap-4">
          <button
            onClick={() => navigate('/request-quote')}
            className="px-8 py-3.5 rounded-xl bg-[#F28B35] hover:bg-[#FFAB5C] text-[#0B1114] font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
          >
            <span>Discuss Manufacturing Run</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('/contact')}
            className="px-6 py-3.5 rounded-xl bg-[#202D34] hover:bg-white/10 text-xs font-semibold text-[#F4F6F5] border border-white/10 transition-colors"
          >
            Facility Contact Details
          </button>
        </div>
      </div>
    </div>
  );
};
