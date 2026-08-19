import { supabase } from '@/integrations/supabase/client';

export const CATEGORIES = [
  'CONSTRUCTIONS',
  'DECORATIVE LIGHTING',
  'MACHINES',
  'PLUMBING',
  'REAL ESTATE & PROPERTY INVESTMENT',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_EMPTY_STATE: Record<Category, string> = {
  CONSTRUCTIONS:
    'New construction offerings and projects will be added here as they become available. Contact Das GH Ltd for current enquiries.',
  'DECORATIVE LIGHTING':
    'New decorative lighting products will be added here as they become available. Contact Das GH Ltd for current product enquiries.',
  MACHINES:
    'Machinery entries will be added here as they become available. Contact Das GH Ltd for current enquiries.',
  PLUMBING:
    'Plumbing products will be available here soon. Contact Das GH Ltd for current product availability.',
  'REAL ESTATE & PROPERTY INVESTMENT':
    'Property and land listings will be published here as they become available. Contact Das GH Ltd for current property enquiries.',
};

export interface ProductImage {
  /** Absolute or app-relative URL (CDN assets) */
  url?: string;
  /** Storage path inside the product-images bucket */
  path?: string;
  alt?: string;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: Category;
  product_type: string | null;
  short_description: string | null;
  full_description: string | null;
  price: string | null;
  availability: string | null;
  location: string | null;
  brand: string | null;
  model: string | null;
  condition: string | null;
  year: string | null;
  construction_stage: string | null;
  project_status: string | null;
  specifications: SpecItem[];
  features: string[];
  services: string[];
  images: ProductImage[];
  video_url: string | null;
  published: boolean;
  featured: boolean;
  sort_order: number;
}

const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

export const normalizeProduct = (row: Record<string, unknown>): Product => ({
  ...(row as unknown as Product),
  specifications: asArray<SpecItem>(row.specifications),
  features: asArray<string>(row.features),
  services: asArray<string>(row.services),
  images: asArray<ProductImage>(row.images),
});

export const isRealEstate = (p: Product) => p.category === 'REAL ESTATE & PROPERTY INVESTMENT';

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

export const displayPrice = (price: string | null) => {
  const clean = (price ?? '').trim();
  if (!clean || clean === '0' || clean === '$0') return 'Contact for Price';
  return clean;
};

/** Resolves an image reference to a usable src (signed URL for storage paths). */
export const resolveImageSrc = async (image: ProductImage): Promise<string> => {
  if (image.url) return image.url;
  if (!image.path) return '';
  const { data } = await supabase.storage
    .from('product-images')
    .createSignedUrl(image.path, 60 * 60 * 24 * 7);
  return data?.signedUrl ?? '';
};

export const WHATSAPP_NUMBER = '233240384380';
export const CONTACT_EMAIL = 'dasghlimited@gmail.com';

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message.slice(0, 900))}`;

export const productEnquiryLink = (product: Product) =>
  whatsappLink(
    `Hello Das GH Ltd, I would like more information about "${product.title}" (${product.category}).`,
  );

export const productEmailLink = (product: Product) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Enquiry: ${product.title}`,
  )}&body=${encodeURIComponent(
    `Hello Das GH Ltd,\n\nI would like more information about "${product.title}".\n\nThank you.`,
  )}`;
