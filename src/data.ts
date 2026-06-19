import { FurnitureType, MaterialOption, HardwareStyle, ServiceArea, FAQItem } from './types';

export const PREMIUM_MATERIALS: MaterialOption[] = [
  {
    id: 'walnut',
    name: 'Rich Walnut Laminate',
    color: '#4E3629',
    specular: '#8E6F5E',
    roughness: 0.7,
    priceFactor: 1.25,
    textureLabel: 'High-gloss wood veneer grain'
  },
  {
    id: 'teak',
    name: 'Classic Teakwood Plywood',
    color: '#8A5A36',
    specular: '#C49B7A',
    roughness: 0.8,
    priceFactor: 1.45,
    textureLabel: 'Waterproof boiling-marine grade ply'
  },
  {
    id: 'charcoal',
    name: 'Sleek Matte Charcoal',
    color: '#262626',
    specular: '#404040',
    roughness: 0.9,
    priceFactor: 1.15,
    textureLabel: 'Elegant wear-resistant anti-scratch acrylic'
  },
  {
    id: 'crystal_white',
    name: 'Royal High-Gloss White',
    color: '#FBFBFB',
    specular: '#FFFFFF',
    roughness: 0.15,
    priceFactor: 1.10,
    textureLabel: 'Mirror-finish dust-repellent acrylic'
  },
  {
    id: 'champagne_gold',
    name: 'Luxury Champagne Gold Accent',
    color: '#D4AF37',
    specular: '#FFF5CC',
    roughness: 0.3,
    priceFactor: 1.60,
    textureLabel: 'Anodized golden borders and inlay panels'
  }
];

export const HARDWARE_STYLES: HardwareStyle[] = [
  {
    id: 'handless',
    name: 'Intelligent G-Profile Handles',
    price: 3500,
    description: 'Clean integrated aluminum profile J-pull grooves for sleek look'
  },
  {
    id: 'classic_brass',
    name: 'Vintage Matte Gold Long Pulls',
    price: 6000,
    description: 'Modern luxury brushed brass cylinders'
  },
  {
    id: 'push_open',
    name: '德國 Hettich Tip-On Push-to-Open',
    price: 9500,
    description: 'Premium soft-close magnetic push bumpers'
  },
  {
    id: 'leather_tabs',
    name: 'Handcrafted Tan Leather Loop Knobs',
    price: 4000,
    description: 'Bespoke hand-stitched Indian hide tabs for soft warm tactile feel'
  }
];

export const CUSTOMIZATION_RANGES = {
  [FurnitureType.BED]: {
    width: { min: 4, max: 7, label: 'Width (Feet - Single to King)', step: 0.5, default: 6 },
    height: { min: 1.5, max: 4, label: 'Headboard Height (Feet)', step: 0.25, default: 3.5 },
    depth: { min: 5, max: 8, label: 'Length (Feet)', step: 0.5, default: 6.5 },
    basePrice: 32000,
    unitName: 'Bed/Cot unit'
  },
  [FurnitureType.WARDROBE]: {
    width: { min: 4, max: 12, label: 'Width (Feet / Multi-Door)', step: 1, default: 6 },
    height: { min: 6, max: 10, label: 'Height (Feet / Loft included)', step: 0.5, default: 8 },
    depth: { min: 1.8, max: 2.5, label: 'Depth (Feet)', step: 0.1, default: 2 },
    basePrice: 42000,
    unitName: 'Wardrobe system'
  },
  [FurnitureType.KITCHEN]: {
    width: { min: 8, max: 24, label: 'Counter Length (Feet)', step: 1, default: 12 },
    height: { min: 2.5, max: 7.5, label: 'Cabinet Stack Height (Feet)', step: 0.5, default: 5 },
    depth: { min: 2, max: 2.2, label: 'Counter Depth (Feet)', step: 0.1, default: 2 },
    basePrice: 85000,
    unitName: 'Full modular layout'
  },
  [FurnitureType.GATE]: {
    width: { min: 6, max: 16, label: 'Total Span (Feet)', step: 0.5, default: 10 },
    height: { min: 5, max: 8, label: 'Gate Height (Feet)', step: 0.5, default: 6 },
    depth: { min: 0.2, max: 0.5, label: 'Thickness (Feet)', step: 0.05, default: 0.3 },
    basePrice: 28000,
    unitName: 'Cast entry gate system'
  }
};

export const SURAT_AREAS: ServiceArea[] = [
  {
    name: 'Vesu',
    distance: '8.4 km',
    deliveryDays: '12-14 days',
    description: 'Top-tier luxury apartments and 4BHK high-rises. Our most active project base.',
    featuredProject: 'Sangkini Solitaire, VIP Road Bed/Almari Fitout'
  },
  {
    name: 'Adajan',
    distance: '0.5 km',
    deliveryDays: '7-10 days',
    description: 'Our workshop and studio location. Express shipping and daily installation checks.',
    featuredProject: 'Green Avenue, Near Star Bazaar Kitchen makeover'
  },
  {
    name: 'Pal Gam',
    distance: '3.1 km',
    deliveryDays: '10-12 days',
    description: 'Fast-developing residential complexes. Specializing in space-saver utility modular solutions.',
    featuredProject: 'Rivera Heights, Pal 3BHK Modular Wardrobes'
  },
  {
    name: 'Gaurav Path',
    distance: '5.2 km',
    deliveryDays: '10-13 days',
    description: 'Premium standalone villas and custom layout penthouses. Exquisite handcrafted solid teak main gates.',
    featuredProject: 'Rajhans Synfonia, Luxury TV Wall & Lofts'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'How do you structure your design and manufacturing process?',
    answer: 'First, we do a free on-site digital measurement in Surat (Adajan, Vesu, Pal, etc.). We craft a complete 2D and 3D architectural blueprint of your custom wardrobes, beds or modular kitchens. Once approved, the furniture is constructed at our state-of-the-art carpentry workshop in Adajan, using German hardware fittings and high-end boiling-water-resistant plywood, and then perfectly installed at your site.',
    category: 'customization'
  },
  {
    question: 'What materials and hardware brand do you guarantee?',
    answer: 'We only use IS:710 Marine-Grade BWR Plywood, fire-resistant laminate backings, and pure seamless high-pressure veneers. All sliding hinges, telescopic soft-runners, and hydraulic pump dampers are sourced from certified European brands like Hettich and Hafele with a lifetime performance warranty.',
    category: 'customization'
  },
  {
    question: 'Can Virat Furniture handle a complete interior fitout for 3BHK or 4BHK flats?',
    answer: 'Absolutely! Our crew of 16 professional craftsmen and designers have fully outfitted over 500+ premium homes in Surat. We handle everything from the initial mockups to electrical wiring repositioning inside the modular kitchen, internal drawer illumination and final polishing.',
    category: 'service'
  },
  {
    question: 'How long does the average customized bed or wardrobe order take to construct?',
    answer: 'Standard bespoke items like single/king beds and modular study desks take around 7 to 10 days, while comprehensive modular wardrobes and modular kitchen installations take between 12 to 15 days to deliver and set up on-site.',
    category: 'timeline'
  },
  {
    question: 'What is the estimated cost per sq.ft. for premium customized Almari/Wardrobes?',
    answer: 'Our bespoke laminated wardrobes start around ₹1,400 to ₹1,800 per square foot, which includes seasoned commercial marine ply, heavy durable laminates, high quality locks, hydraulic loft handles, and site installation. There are no hidden or delivery charges.',
    category: 'pricing'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Gaurav Shah',
    role: 'Resident, Someshwar Villa, Vesu',
    content: 'Virat Furniture did our entire 4BHK. The wardrobe sliding mechanism runs like butter, and the customized king-size storage bed has saved us huge space. Incredible finishing!',
    rating: 5,
    project: '4BHK custom fit out'
  },
  {
    name: 'Priyanka Patel',
    role: 'Architect, Surat Town Planners',
    content: 'As an architect, I am very picky about millwork details. Shubham Sahani and his carpentry team executed my G-profile drawer handles and custom main gates precisely. Very impressive craftsmanship.',
    rating: 5,
    project: 'Premium Teak main gate'
  },
  {
    name: 'Manish Choksi',
    role: 'Homeowner, Adajan Star Bazaar Lane',
    content: 'No-nonsense furniture contractor. They came for measurements, gave me an itemized price quotation, and finished the kitchen modular cabinets inside 10 days. Zero complaints.',
    rating: 5,
    project: 'Modular Kitchen transformation'
  }
];
