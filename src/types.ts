/**
 * Hanvision Enterprises - Type Definitions
 */

export type ProductCategory = 
  | '3-Ply Corrugated Boxes'
  | '5-Ply Corrugated Boxes'
  | '7-Ply Corrugated Boxes'
  | 'Customized Packaging Boxes'
  | 'Food Packaging Boxes'
  | 'Mono Cartons'
  | 'Corrugated Packaging Boxes';

export interface ProductSpecificationItem {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  galleryImages: string[];
  suggestedApplications: string[];
  specifications: ProductSpecificationItem[];
  customizationOptions: string[];
  isFeatured?: boolean;
  isPopular?: boolean;
  status: 'active' | 'draft';
}

export type InquiryStatus = 
  | 'New'
  | 'Contacted'
  | 'Quotation Sent'
  | 'Negotiation'
  | 'Won'
  | 'Lost'
  | 'On Hold';

export interface Inquiry {
  id: string;
  customerName: string;
  companyName: string;
  mobile: string;
  email: string;
  city: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
  
  // Packaging requirements
  productType: string;
  quantityRange: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
    unit: 'mm' | 'cm' | 'inch';
  };
  ply: '3-Ply' | '5-Ply' | '7-Ply' | 'Not Sure' | 'Other';
  printing: 'Plain' | 'Printed' | 'Not Sure' | 'To Be Discussed';
  productBeingPacked: string;
  additionalRequirements: string;
  referenceFileUrl?: string;
  referenceFileName?: string;

  // Management details
  status: InquiryStatus;
  internalNotes?: string;
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Products' | 'Factory & Process' | 'Packaging' | 'Custom Boxes';
  imageUrl: string;
  altText: string;
  caption: string;
  isPlaceholderDemo?: boolean;
}

export interface SolutionCategory {
  id: string;
  title: string;
  shortDescription: string;
  useCase: string;
  suggestedProducts: string[];
  recommendedPly: string;
  iconName: string;
  highlights: string[];
}

export interface ManufacturingStep {
  stepNumber: number;
  title: string;
  description: string;
  details: string[];
  icon: string;
}

export interface CompanySettings {
  companyName: string;
  tagline: string;
  ceoName: string;
  industry: string;
  address: string;
  village: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  displayPhone: string;
  whatsappNumber: string;
  email: string;
  website: string;
  mapsUrl: string;
  mapsEmbedQuery: string;
  verifiedSinceNote: string;
}
