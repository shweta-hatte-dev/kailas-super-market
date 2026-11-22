export type ArtShape =
  | 'sack' | 'bottle' | 'carton' | 'jar' | 'box' | 'pouch' | 'tin' | 'bar' | 'spray' | 'roll' | 'tube'
  | 'round' | 'banana' | 'carrot' | 'leafy' | 'potato' | 'bread';

export interface Product {
  id: string;
  name: string;
  category: string; // category slug (see data/categories.ts)
  unit: string; // pack size shown on the card, e.g. "1 kg"
  price: number; // selling price in INR
  mrp?: number; // optional original price; shows a discount when higher than price
  shape: ArtShape; // illustration used until a real photo is supplied
  color: string;
  accent?: string;
  inStock: boolean;
  popular?: boolean; // listed first in "Popular products"
  quick?: boolean; // appears in "Your everyday essentials"
  tags?: string[]; // extra search words (Hindi/Marathi names etc.)
  description?: string;
  image?: string; // optional real photo, e.g. '/products/atta.jpg' (put files in /public/products)
  bundle?: string[]; // combo offers: ids of the products inside
  includes?: string; // combo offers: human-readable contents
}

export interface Category {
  slug: string;
  name: string;
  blurb: string;
  tint: string;
  art: [string, string, string]; // three product ids used for the category illustration
}

export interface CartLine { id: string; qty: number }
export interface ListItem { id: string; text: string; done: boolean }

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'discount';
export interface Filters {
  category: string | null;
  query: string;
  sort: SortKey;
  inStockOnly: boolean;
}
