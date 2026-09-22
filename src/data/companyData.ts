import { CompanySettings, Product, SolutionCategory, ManufacturingStep, GalleryItem, Inquiry } from '../types';

export const COMPANY_INFO: CompanySettings = {
  companyName: 'Hanvision Enterprises',
  tagline: 'Packaging That Fits Your Business',
  ceoName: 'Ramesh Badri',
  industry: 'Corrugated carton box manufacturing and customized packaging',
  address: 'D/No: 5-43, Boni Road, Anandapuram Village & Mandal',
  village: 'Anandapuram',
  city: 'Visakhapatnam District',
  state: 'Andhra Pradesh',
  pincode: '530052',
  phone: '+918043848612',
  displayPhone: '+91 8043848612',
  whatsappNumber: '918043848612',
  email: 'info@hanvisionenterprises.in',
  website: 'https://hanvisionenterprises.in/',
  mapsUrl: 'https://maps.google.com/?q=D.No+5-43+Boni+Road+Anandapuram+Visakhapatnam+530052',
  mapsEmbedQuery: 'D.No 5-43, Boni Road, Anandapuram Village & Mandal, Visakhapatnam District, Andhra Pradesh 530052',
  verifiedSinceNote: 'Manufacturer of corrugated carton boxes and custom industrial packaging.'
};

// Generated studio assets for packaging visualization
export const PACKAGING_ASSETS = {
  hero: '/src/assets/images/hero_corrugated_boxes_1790071869294.jpg',
  fluting: '/src/assets/images/corrugated_fluting_macro_1790071883108.jpg',
  customBoxes: '/src/assets/images/custom_carton_boxes_1790071901045.jpg',
  diecut: '/src/assets/images/custom_carton_boxes_1790071901045.jpg',
};

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-3ply',
    slug: '3-ply-corrugated-boxes',
    name: '3-Ply Corrugated Boxes',
    category: '3-Ply Corrugated Boxes',
    shortDescription: 'Lightweight single-wall corrugated boxes engineered for everyday shipping, e-commerce parcels, and consumer goods.',
    fullDescription: 'Our 3-Ply corrugated boxes feature a single-wall fluted medium enclosed between two smooth kraft linerboards. Engineered for lightweight to moderate-weight items, these boxes provide optimal structural protection while keeping freight and packaging weight economical.',
    heroImage: PACKAGING_ASSETS.hero,
    galleryImages: [
      PACKAGING_ASSETS.hero,
      PACKAGING_ASSETS.fluting,
      PACKAGING_ASSETS.customBoxes
    ],
    suggestedApplications: [
      'E-commerce order fulfillment & delivery',
      'Textiles, apparel, and footwear packaging',
      'FMCG, dry food retail, and pharmaceuticals',
      'Light electronics and domestic goods'
    ],
    specifications: [
      { label: 'Wall Structure', value: 'Single Wall (3-Ply: Liner + Flute + Liner)' },
      { label: 'Available Flutes', value: 'B-Flute, C-Flute, or E-Flute (based on customer requirements)' },
      { label: 'Dimensions', value: 'Custom dimensions available to order' },
      { label: 'Paper Grade / GSM', value: 'Available based on customer requirements' },
      { label: 'Burst & Compression Strength', value: 'Configured according to payload specifications' },
      { label: 'Minimum Order Quantity', value: 'Available based on customer requirements' }
    ],
    customizationOptions: [
      'Plain unprinted or custom single/multi-color flexo printing',
      'Regular Slotted Carton (RSC), Die-cut, or Self-locking formats',
      'Custom branding, shipping marks, and barcoding'
    ],
    isFeatured: true,
    isPopular: true,
    status: 'active'
  },
  {
    id: 'prod-5ply',
    slug: '5-ply-corrugated-boxes',
    name: '5-Ply Corrugated Boxes',
    category: '5-Ply Corrugated Boxes',
    shortDescription: 'Double-wall corrugated cartons designed for medium-to-heavy industrial products, export shipping, and stacking.',
    fullDescription: 'Constructed with double-wall corrugated boards featuring two fluted mediums interleaved between three linerboards. 5-Ply boxes deliver high compression strength, edge crush resistance, and stacking rigidity for transit through challenging supply chains.',
    heroImage: PACKAGING_ASSETS.fluting,
    galleryImages: [
      PACKAGING_ASSETS.fluting,
      PACKAGING_ASSETS.hero,
      PACKAGING_ASSETS.customBoxes
    ],
    suggestedApplications: [
      'Industrial machinery parts and hardware',
      'Household appliances and consumer electronics',
      'Bulk agricultural produce and beverages',
      'Interstate freight and palletized export shipping'
    ],
    specifications: [
      { label: 'Wall Structure', value: 'Double Wall (5-Ply: 3 Liners + 2 Fluting Mediums)' },
      { label: 'Flute Combinations', value: 'BC-Flute, AB-Flute (based on customer requirements)' },
      { label: 'Dimensions', value: 'Custom sizes fabricated to requirement' },
      { label: 'Paper Grade / GSM', value: 'Available based on customer requirements' },
      { label: 'Burst Strength', value: 'Available based on customer requirements' },
      { label: 'Minimum Order Quantity', value: 'Available based on customer requirements' }
    ],
    customizationOptions: [
      'Heavy-duty industrial gluing or wire stitching',
      'Custom print graphics, handling instructions, and safety symbols',
      'Internal partitions, dividers, or protective layer pads'
    ],
    isFeatured: true,
    isPopular: true,
    status: 'active'
  },
  {
    id: 'prod-7ply',
    slug: '7-ply-corrugated-boxes',
    name: '7-Ply Corrugated Boxes',
    category: '7-Ply Corrugated Boxes',
    shortDescription: 'Heavy-duty triple-wall corrugated containers engineered for heavy equipment, bulk industrial cargo, and rigorous logistics.',
    fullDescription: 'Our 7-Ply triple-wall corrugated containers represent the pinnacle of paperboard packaging strength. Engineered to safely transport heavy engineering components, chemicals, auto parts, and bulk raw materials, providing an efficient alternative to traditional wooden crates.',
    heroImage: PACKAGING_ASSETS.fluting,
    galleryImages: [
      PACKAGING_ASSETS.fluting,
      PACKAGING_ASSETS.hero,
      PACKAGING_ASSETS.customBoxes
    ],
    suggestedApplications: [
      'Heavy automobile and engineering components',
      'Bulk export machinery and metal parts',
      'Chemical drums, ceramic goods, and heavy tiles',
      'High-stacking warehouse bulk storage'
    ],
    specifications: [
      { label: 'Wall Structure', value: 'Triple Wall (7-Ply: 4 Liners + 3 Fluting Mediums)' },
      { label: 'Flute Combination', value: 'AAA / BCB combination flutes configured to load' },
      { label: 'Dimensions', value: 'Built to customer mechanical blueprints' },
      { label: 'Paper Grade / GSM', value: 'Available based on customer requirements' },
      { label: 'Load Capacity', value: 'Engineered based on payload weight and transit conditions' },
      { label: 'Minimum Order Quantity', value: 'Available based on customer requirements' }
    ],
    customizationOptions: [
      'Reinforced corners and heavy-gauge wire stitching',
      'Moisture-resistant kraft coating options',
      'Pallet-ready dimensions for container loading'
    ],
    isFeatured: true,
    isPopular: false,
    status: 'active'
  },
  {
    id: 'prod-custom',
    slug: 'customized-packaging-boxes',
    name: 'Customized Packaging Boxes',
    category: 'Customized Packaging Boxes',
    shortDescription: 'Bespoke die-cut cartons, custom dimensions, branded prints, and tailored structural inserts built around your specific product.',
    fullDescription: 'Every product has unique geometry and shipping demands. Hanvision Enterprises works with your exact product dimensions, fragility profile, and brand requirements to engineer custom die-cut boxes, display cartons, self-erecting mailers, and custom internal fittings.',
    heroImage: PACKAGING_ASSETS.customBoxes,
    galleryImages: [
      PACKAGING_ASSETS.customBoxes,
      PACKAGING_ASSETS.hero,
      PACKAGING_ASSETS.fluting
    ],
    suggestedApplications: [
      'Direct-to-consumer subscription and branded mailer boxes',
      'Specialized industrial instruments and electronics',
      'Multi-compartment presentation kits',
      'Point-of-sale display and shelf-ready packaging'
    ],
    specifications: [
      { label: 'Die-cut Profiles', value: 'Custom tooling matched to CAD / sample dimensions' },
      { label: 'Box Formats', value: 'Roll End Tuck Front (RETF), Tuck Top, Slotted, Telescopic' },
      { label: 'Dimensions', value: 'Custom manufactured to millimetre accuracy' },
      { label: 'Inserts & Fitments', value: 'Corrugated fitments, partitions, and die-cut cradles' },
      { label: 'Printing Options', value: 'Custom logo, typography, brand graphics, and warning icons' },
      { label: 'Minimum Order Quantity', value: 'Available based on customer requirements' }
    ],
    customizationOptions: [
      'Tailored die-line creation based on customer physical sample',
      'Easy-fold locking tabs eliminating manual taping',
      'Ventilation slots, hand holes, and viewing perforations'
    ],
    isFeatured: true,
    isPopular: true,
    status: 'active'
  },
  {
    id: 'prod-food',
    slug: 'food-packaging-boxes',
    name: 'Food Packaging Boxes',
    category: 'Food Packaging Boxes',
    shortDescription: 'Clean, food-safe paperboard cartons and master shippers for agricultural produce, processed food, and bakery items.',
    fullDescription: 'Engineered specifically for the food, agriculture, and FMCG sectors. Designed to protect perishable goods, fresh harvest, bakery products, and processed food packets with adequate ventilation and structural rigidity under cold-chain or humid transport conditions.',
    heroImage: PACKAGING_ASSETS.customBoxes,
    galleryImages: [
      PACKAGING_ASSETS.customBoxes,
      PACKAGING_ASSETS.hero,
      PACKAGING_ASSETS.fluting
    ],
    suggestedApplications: [
      'Fresh fruit, vegetables, and agro harvest transit',
      'Bakery, sweets, and confectionary master cartons',
      'Packaged snacks, beverages, and dry food items',
      'Food processing and seafood cold storage transport'
    ],
    specifications: [
      { label: 'Material Suitability', value: 'Virgin kraft paperboard & food-safe outer grades' },
      { label: 'Ventilation', value: 'Custom die-cut air vents for produce respiration' },
      { label: 'Ply Configuration', value: '3-Ply or 5-Ply depending on moisture & stacking needs' },
      { label: 'Dimensions', value: 'Standard tray or custom carton dimensions' },
      { label: 'Printing Options', value: 'Flexographic food-grade ink branding' },
      { label: 'Minimum Order Quantity', value: 'Available based on customer requirements' }
    ],
    customizationOptions: [
      'Moisture-resistant barrier liners',
      'Telescopic (two-piece lid and base) produce trays',
      'Interlocking stacking tabs for produce crates'
    ],
    isFeatured: false,
    isPopular: false,
    status: 'active'
  },
  {
    id: 'prod-mono',
    slug: 'mono-cartons',
    name: 'Mono Cartons',
    category: 'Mono Cartons',
    shortDescription: 'Refined single-sheet paperboard cartons for primary packaging, retail shelves, pharmaceuticals, and cosmetics.',
    fullDescription: 'Mono cartons provide sleek, high-definition printed primary packaging for retail merchandise. Constructed from folding box boards (FBB), duplex boards, or kraft board, these cartons combine lightweight form with exceptional print clarity for consumer-facing shelves.',
    heroImage: PACKAGING_ASSETS.customBoxes,
    galleryImages: [
      PACKAGING_ASSETS.customBoxes,
      PACKAGING_ASSETS.hero,
      PACKAGING_ASSETS.fluting
    ],
    suggestedApplications: [
      'Cosmetics, personal care, and wellness bottles',
      'Pharmaceutical bottles, blisters, and vials',
      'Small hardware, electrical fixtures, and auto spares',
      'Confectionery, tea boxes, and retail merchandise'
    ],
    specifications: [
      { label: 'Substrate', value: 'Duplex board, Triplex, or Folding Box Board (FBB)' },
      { label: 'Caliper / GSM', value: 'Available based on customer requirements' },
      { label: 'Folding Style', value: 'Straight tuck, reverse tuck, auto-lock bottom' },
      { label: 'Surface Finish', value: 'Aqueous, gloss, or matt varnish (customizable)' },
      { label: 'Dimensions', value: 'Custom precision die-cut dimensions' },
      { label: 'Minimum Order Quantity', value: 'Available based on customer requirements' }
    ],
    customizationOptions: [
      'Embossing, debossing, and metallic foil stamping on request',
      'Clear window patch cutout for product display',
      'Crash-lock bottoms for rapid assembly'
    ],
    isFeatured: false,
    isPopular: false,
    status: 'active'
  },
  {
    id: 'prod-packaging',
    slug: 'corrugated-packaging-boxes',
    name: 'Corrugated Packaging Boxes',
    category: 'Corrugated Packaging Boxes',
    shortDescription: 'Universal standard shipping boxes, master cartons, and storage containers for commercial enterprises.',
    fullDescription: 'Our standard corrugated packaging boxes offer a proven, cost-effective baseline for bulk warehousing, logistics, dispatch, and goods transport. Designed with dependable edge strength, uniform fluting, and smooth gluing for streamlined packing workflows.',
    heroImage: PACKAGING_ASSETS.hero,
    galleryImages: [
      PACKAGING_ASSETS.hero,
      PACKAGING_ASSETS.fluting,
      PACKAGING_ASSETS.customBoxes
    ],
    suggestedApplications: [
      'General commercial warehousing and storage',
      'Inter-facility inventory movement and dispatch',
      'Wholesale merchandise packing',
      'Moving, shipping, and courier transit'
    ],
    specifications: [
      { label: 'Box Style', value: 'Universal Regular Slotted Container (RSC / 0201)' },
      { label: 'Wall Options', value: '3-Ply (light) or 5-Ply (standard/heavy)' },
      { label: 'Dimensions', value: 'Wide range of standard or custom box sizes' },
      { label: 'Paper Grade', value: 'Available based on customer requirements' },
      { label: 'Joints', value: 'Glued or stitched joints based on load' },
      { label: 'Minimum Order Quantity', value: 'Available based on customer requirements' }
    ],
    customizationOptions: [
      'Standard barcode / shipping label panels',
      'Fragile and orientation handling iconography',
      'Plain unprinted natural kraft or custom printed'
    ],
    isFeatured: false,
    isPopular: true,
    status: 'active'
  }
];

export const SOLUTIONS_DATA: SolutionCategory[] = [
  {
    id: 'sol-ecommerce',
    title: 'E-commerce & Retail Logistics',
    shortDescription: 'Optimized parcel cartons and mailer boxes engineered for safe last-mile transit and clean customer unboxing.',
    useCase: 'Online retail brands, courier shipping hubs, apparel distributors, and electronics sellers requiring secure, lightweight cartons.',
    suggestedProducts: ['3-Ply Corrugated Boxes', 'Customized Packaging Boxes', 'Mono Cartons'],
    recommendedPly: '3-Ply or customized die-cut 3-Ply',
    iconName: 'ShoppingBag',
    highlights: [
      'Dimensional weight optimization to minimize shipping costs',
      'Secure closure designs reducing transit pilferage',
      'Clean kraft surface ready for branding and automated shipping labels'
    ]
  },
  {
    id: 'sol-industrial',
    title: 'Industrial & Heavy Engineering',
    shortDescription: 'High-rigidity double-wall and triple-wall corrugated containers capable of bearing dense mechanical components.',
    useCase: 'Foundries, automotive component fabricators, pump & motor manufacturers, and heavy hardware distributors in coastal Andhra Pradesh.',
    suggestedProducts: ['5-Ply Corrugated Boxes', '7-Ply Corrugated Boxes'],
    recommendedPly: '5-Ply or 7-Ply Heavy Duty',
    iconName: 'Factory',
    highlights: [
      'Superior stacking strength for warehouse palletization',
      'Wire-stitched joints for extreme mechanical resilience',
      'Alternative to heavy wooden crates with lower tare weight'
    ]
  },
  {
    id: 'sol-food',
    title: 'Food, FMCG & Perishables',
    shortDescription: 'Ventilated and moisture-conscious master shippers and primary cartons for agro-produce, snacks, and food processing.',
    useCase: 'Food processing facilities, edible oil bottling, bakery distribution networks, and agricultural produce exporters.',
    suggestedProducts: ['Food Packaging Boxes', '5-Ply Corrugated Boxes', 'Mono Cartons'],
    recommendedPly: '3-Ply to 5-Ply with ventilated die-cuts',
    iconName: 'Apple',
    highlights: [
      'Strategic ventilation apertures to maintain airflow in produce transit',
      'Rigid construction preserving shape under cold-chain moisture',
      'Clean paperboard grades compatible with secondary food contact'
    ]
  },
  {
    id: 'sol-custom',
    title: 'Customized & Brand Packaging',
    shortDescription: 'Made-to-measure box architectures with tailored die-lines, internal fitments, and custom printing.',
    useCase: 'Enterprises launching proprietary product lines requiring precision fit without wasteful void fillers.',
    suggestedProducts: ['Customized Packaging Boxes', 'Mono Cartons'],
    recommendedPly: 'Configured strictly around physical product geometry',
    iconName: 'Box',
    highlights: [
      'Exact internal dimensions matched to your sample product',
      'Internal partition grids and cradles preventing product movement',
      'Professional single or multi-color flexographic printing'
    ]
  },
  {
    id: 'sol-shipping',
    title: 'Bulk Shipping & Protection',
    shortDescription: 'Uniform master cartons and protective corrugated pads for freight forwarders and distribution centers.',
    useCase: 'Logistics hubs, bulk distributors, third-party logistics (3PL) operators, and export staging centers.',
    suggestedProducts: ['Corrugated Packaging Boxes', '5-Ply Corrugated Boxes'],
    recommendedPly: '3-Ply and 5-Ply standard corrugated',
    iconName: 'Truck',
    highlights: [
      'Standardized dimensions for efficient ISO container and truck loading',
      'Reliable bursting strength across transit vibrations',
      'High-volume consistency for rapid packaging lines'
    ]
  }
];

export const MANUFACTURING_STEPS: ManufacturingStep[] = [
  {
    stepNumber: 1,
    title: 'Share Your Requirement',
    description: 'Provide your packaged product specifications, target dimensions, load weight, and volume needs.',
    details: [
      'Product dimensions (Length × Width × Height)',
      'Product weight, vulnerability, and stacking requirements',
      'Expected order quantity and timeline'
    ],
    icon: 'FileText'
  },
  {
    stepNumber: 2,
    title: 'Discuss Specifications',
    description: 'We review paper grades, fluting profiles (B, C, or E flute), and structural ply requirements.',
    details: [
      'Selection between 3-ply, 5-ply, or 7-ply configurations',
      'Evaluation of burst strength and edge crush resistance',
      'Assessment of plain vs. printed options'
    ],
    icon: 'Sliders'
  },
  {
    stepNumber: 3,
    title: 'Confirm Packaging Details',
    description: 'Finalize box style (RSC, die-cut, tray), dimension tolerances, and printing artwork alignment.',
    details: [
      'Sample specification sign-off',
      'Die-cutting layout and creasing alignment',
      'Quotation approval and production scheduling'
    ],
    icon: 'CheckCircle2'
  },
  {
    stepNumber: 4,
    title: 'Manufacturing & Corrugation',
    description: 'Kraft paper reels are fluted, bonded with adhesive, slit, creased, and printed to exact tolerances.',
    details: [
      'Precise corrugation flute bonding and liner adhesion',
      'Rotary creasing and slotting for clean box folding',
      'Flexographic single or multi-color print application'
    ],
    icon: 'Cog'
  },
  {
    stepNumber: 5,
    title: 'Quality Review',
    description: 'Boxes are inspected for dimensional accuracy, joint bonding strength, and print clarity.',
    details: [
      'Verification of inner and outer dimensions',
      'Stitching / gluing joint inspection',
      'Flute formation and board flatness check'
    ],
    icon: 'ShieldCheck'
  },
  {
    stepNumber: 6,
    title: 'Dispatch & Delivery Discussion',
    description: 'Bundled and strapped carton lots arranged for pickup or coordinated delivery as discussed.',
    details: [
      'Protective strapping in compact counted bundles',
      'Dispatched from Anandapuram, Visakhapatnam facility',
      'Logistics arrangement discussed with client'
    ],
    icon: 'PackageCheck'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Stacked Kraft Corrugated Cartons',
    category: 'Products',
    imageUrl: PACKAGING_ASSETS.hero,
    altText: 'Stacked brown kraft corrugated boxes ready for packaging',
    caption: 'Uniform kraft corrugated boxes manufactured for industrial and commercial shipping.',
    isPlaceholderDemo: true
  },
  {
    id: 'gal-2',
    title: 'Corrugated Fluting Architecture',
    category: 'Factory & Process',
    imageUrl: PACKAGING_ASSETS.fluting,
    altText: 'Macro photography of 3-ply and 5-ply corrugated fluted medium',
    caption: 'Detailed structural view of fluting waves providing compressive cushioning.',
    isPlaceholderDemo: true
  },
  {
    id: 'gal-3',
    title: 'Custom Die-cut Carton Formats',
    category: 'Custom Boxes',
    imageUrl: PACKAGING_ASSETS.customBoxes,
    altText: 'Custom die-cut packaging boxes and mono cartons',
    caption: 'Tailored die-cut packaging formats manufactured to specific client product geometries.',
    isPlaceholderDemo: true
  },
  {
    id: 'gal-4',
    title: '3-Ply Single Wall Corrugated Box',
    category: 'Products',
    imageUrl: PACKAGING_ASSETS.hero,
    altText: '3-ply lightweight corrugated shipping carton',
    caption: 'Economical 3-ply corrugated boxes ideal for lightweight shipping and e-commerce parcels.',
    isPlaceholderDemo: true
  },
  {
    id: 'gal-5',
    title: '5-Ply Heavy Industrial Master Carton',
    category: 'Packaging',
    imageUrl: PACKAGING_ASSETS.fluting,
    altText: '5-ply heavy duty master corrugated carton',
    caption: 'High-rigidity double-wall 5-ply cartons engineered for bulk cargo and freight.',
    isPlaceholderDemo: true
  },
  {
    id: 'gal-6',
    title: 'Mono Carton & Food Packaging Sample',
    category: 'Custom Boxes',
    imageUrl: PACKAGING_ASSETS.customBoxes,
    altText: 'Mono carton and food grade packaging box samples',
    caption: 'Precision printed mono cartons and food-safe box formats for commercial goods.',
    isPlaceholderDemo: true
  }
];

export const INITIAL_DEMO_INQUIRIES: Inquiry[] = [
  {
    id: 'INQ-1042',
    customerName: 'Suresh Varma',
    companyName: 'Coastal Marine Exports',
    mobile: '+91 98480 12345',
    email: 'suresh@coastalmarine.example.com',
    city: 'Visakhapatnam',
    preferredContact: 'phone',
    productType: '5-Ply Corrugated Box',
    quantityRange: '1,000–5,000',
    dimensions: {
      length: '450',
      width: '300',
      height: '350',
      unit: 'mm'
    },
    ply: '5-Ply',
    printing: 'Printed',
    productBeingPacked: 'Packaged frozen seafood export cartons',
    additionalRequirements: 'Need moisture-resistant kraft coating for cold storage transit. Please share sample specifications.',
    status: 'New',
    internalNotes: 'Client called directly from Anandapuram area; needs urgent quote for 2,500 units.',
    followUpDate: '2026-09-24',
    createdAt: '2026-09-21T10:30:00Z',
    updatedAt: '2026-09-21T10:30:00Z'
  },
  {
    id: 'INQ-1041',
    customerName: 'Ananya Reddy',
    companyName: 'Sri Sai Agro Commodities',
    mobile: '+91 94401 98765',
    email: 'purchasing@srisaigroups.example.com',
    city: 'Vizianagaram',
    preferredContact: 'whatsapp',
    productType: '3-Ply Corrugated Box',
    quantityRange: '5,000+',
    dimensions: {
      length: '300',
      width: '200',
      height: '150',
      unit: 'mm'
    },
    ply: '3-Ply',
    printing: 'Plain',
    productBeingPacked: 'Packed organic spice pouches',
    additionalRequirements: 'Standard RSC box style, plain unprinted brown kraft with edge tape compatibility.',
    status: 'Quotation Sent',
    internalNotes: 'Sent quotation sheet via WhatsApp; awaiting procurement team feedback.',
    followUpDate: '2026-09-23',
    createdAt: '2026-09-20T14:15:00Z',
    updatedAt: '2026-09-21T09:00:00Z'
  },
  {
    id: 'INQ-1040',
    customerName: 'K. Prabhakar Rao',
    companyName: 'Apex Electrical Components',
    mobile: '+91 89123 45678',
    email: 'kprao@apexelectrical.example.com',
    city: 'Visakhapatnam (Gajuwaka)',
    preferredContact: 'email',
    productType: 'Customized Packaging Boxes',
    quantityRange: '500–1,000',
    dimensions: {
      length: '18',
      width: '12',
      height: '8',
      unit: 'inch'
    },
    ply: '5-Ply',
    printing: 'Printed',
    productBeingPacked: 'Industrial transformers and switchgear',
    additionalRequirements: 'Internal corrugated honeycomb dividers to separate 4 units per box.',
    status: 'Contacted',
    internalNotes: 'Spoke regarding technical drawings. Needs die-line evaluation.',
    followUpDate: '2026-09-25',
    createdAt: '2026-09-19T11:45:00Z',
    updatedAt: '2026-09-20T16:20:00Z'
  },
  {
    id: 'INQ-1039',
    customerName: 'Meera Naidu',
    companyName: 'Nava Naturals Organics',
    mobile: '+91 98855 67890',
    email: 'meera@navanaturals.example.com',
    city: 'Anakapalle',
    preferredContact: 'phone',
    productType: 'Mono Cartons',
    quantityRange: '1,000–5,000',
    dimensions: {
      length: '80',
      width: '40',
      height: '140',
      unit: 'mm'
    },
    ply: 'Other',
    printing: 'Printed',
    productBeingPacked: 'Cosmetics essential oil bottles',
    additionalRequirements: 'FBB board with reverse tuck lock and embossed brand logo on front panel.',
    status: 'Negotiation',
    internalNotes: 'Client visiting facility on Thursday to review board samples.',
    followUpDate: '2026-09-26',
    createdAt: '2026-09-18T08:20:00Z',
    updatedAt: '2026-09-19T12:00:00Z'
  },
  {
    id: 'INQ-1038',
    customerName: 'B. Jagadeesh',
    companyName: 'Eastern Heavy Machining Ltd',
    mobile: '+91 97011 23456',
    email: 'procurement@easternmachining.example.com',
    city: 'Visakhapatnam',
    preferredContact: 'phone',
    productType: '7-Ply Corrugated Box',
    quantityRange: '100–500',
    dimensions: {
      length: '600',
      width: '600',
      height: '500',
      unit: 'mm'
    },
    ply: '7-Ply',
    printing: 'Plain',
    productBeingPacked: 'Heavy forged cast iron components',
    additionalRequirements: 'Must support up to 60kg payload with heavy wire stitching.',
    status: 'Won',
    internalNotes: 'Initial trial batch of 200 boxes confirmed. Order queued for dispatch.',
    followUpDate: '2026-09-28',
    createdAt: '2026-09-15T15:10:00Z',
    updatedAt: '2026-09-18T17:30:00Z'
  }
];

export const GALLERY_DATA = [
  {
    id: 'gal-1',
    title: '3-Ply Lightweight Shipping Cartons',
    category: 'Corrugated Cartons',
    imageUrl: PACKAGING_ASSETS.hero,
    caption: 'Clean-cut RSC regular slotted cartons assembled for e-commerce, consumer goods, and rapid packing lines.'
  },
  {
    id: 'gal-2',
    title: 'Heavy-Duty 5-Ply Industrial Master Box',
    category: 'Corrugated Cartons',
    imageUrl: PACKAGING_ASSETS.customBoxes,
    caption: 'Double-wall corrugated shipping boxes engineered for industrial components and high vertical pallet stacks.'
  },
  {
    id: 'gal-3',
    title: 'Precision Arched Fluting Cross-Section',
    category: 'Manufacturing & Material',
    imageUrl: PACKAGING_ASSETS.fluting,
    caption: 'Macro cross-section detailing bonded wave fluting medium providing compression resilience and transit cushioning.'
  },
  {
    id: 'gal-4',
    title: 'Die-Cut Ventilation Produce Containers',
    category: 'Food & Retail',
    imageUrl: PACKAGING_ASSETS.customBoxes,
    caption: 'Die-cut produce trays with precision air holes designed for fruits, vegetables, and agro commodities transit.'
  },
  {
    id: 'gal-5',
    title: 'Custom Interlocking Die-Cut Box Prototype',
    category: 'Custom Boxes',
    imageUrl: PACKAGING_ASSETS.diecut,
    caption: 'Self-locking mailer box format engineered without requiring adhesive tape for quick warehouse assembly.'
  },
  {
    id: 'gal-6',
    title: '7-Ply Triple Wall Heavy Cargo Crating',
    category: 'Corrugated Cartons',
    imageUrl: PACKAGING_ASSETS.hero,
    caption: 'Extreme strength triple-wall corrugated carton designed as a lightweight alternative to heavy wooden crates.'
  },
  {
    id: 'gal-7',
    title: 'Flexographic 2-Color Industrial Printing',
    category: 'Manufacturing & Material',
    imageUrl: PACKAGING_ASSETS.diecut,
    caption: 'High-contrast water-based ink flexo printing displaying handling icons, warning symbols, and brand identifiers.'
  },
  {
    id: 'gal-8',
    title: 'Sleek Mono Carton Retail Packaging',
    category: 'Food & Retail',
    imageUrl: PACKAGING_ASSETS.customBoxes,
    caption: 'Folding box board (FBB) mono cartons with tuck tops for confectionery, health products, and consumer goods.'
  }
];

