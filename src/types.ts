export enum FurnitureType {
  BED = 'BED',
  WARDROBE = 'WARDROBE',
  KITCHEN = 'KITCHEN',
  GATE = 'GATE'
}

export interface MaterialOption {
  id: string;
  name: string;
  color: string; // Tailwind color or CSS hex suitable for canvas / UI rendering
  specular: string; // Specular shine value
  roughness: number;
  priceFactor: number;
  textureLabel: string;
}

export interface HardwareStyle {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface FurnitureConfig {
  type: FurnitureType;
  width: number; // in feet (depending on type)
  height: number; // in feet
  depth: number; // in feet
  materialId: string;
  hardwareId: string;
  hasLights: boolean;
  extraStorage: boolean; // storage drawers under bed, lofts for wardrobes
}

// Pricing structure for estimates
export interface PriceEstimate {
  basePrice: number;
  materialCost: number;
  hardwareCost: number;
  extrasCost: number;
  total: number;
}

// Surat Service Areas
export interface ServiceArea {
  name: string;
  distance: string; // from workshop in Adajan
  deliveryDays: string;
  description: string;
  featuredProject: string;
}

// FAQ item structure
export interface FAQItem {
  question: string;
  answer: string;
  category: 'customization' | 'service' | 'pricing' | 'timeline';
}
