import type { Category } from '../types';

/** To rename or reorder categories, edit this list. `art` = 3 product ids used for the tile illustration. */
export const categories: Category[] = [
  { slug: 'fruits-vegetables', name: 'Fruits & Vegetables', blurb: 'Fresh produce for every kitchen', tint: '#D5E4D2', art: ['apple-shimla', 'banana', 'tomato'] },
  { slug: 'rice-atta-grains', name: 'Rice, Atta & Grains', blurb: 'The staples of every meal', tint: '#F1E7CF', art: ['rice-basmati-5kg', 'atta-5kg', 'poha-500g'] },
  { slug: 'pulses-dal', name: 'Pulses & Dal', blurb: 'Dals, rajma and chana', tint: '#F2ECDD', art: ['toor-dal-1kg', 'moong-dal-1kg', 'rajma-500g'] },
  { slug: 'snacks-namkeen', name: 'Snacks & Namkeen', blurb: 'Crunchy tea-time favourites', tint: '#E8F0E6', art: ['bhujia-400g', 'chips-salted', 'mixture-400g'] },
  { slug: 'biscuits-cookies', name: 'Biscuits & Cookies', blurb: 'For chai and lunchboxes', tint: '#F1E7CF', art: ['glucose-biscuit', 'butter-cookies', 'cream-biscuit'] },
  { slug: 'dairy-milk', name: 'Dairy & Milk Products', blurb: 'Milk, curd, paneer and bread', tint: '#E8F0E6', art: ['milk-1l', 'paneer-200g', 'bread-sandwich'] },
  { slug: 'beverages', name: 'Beverages & Cold Drinks', blurb: 'Juices, tea, coffee and more', tint: '#D5E4D2', art: ['cola-750', 'orange-juice-1l', 'tea-500g'] },
  { slug: 'cooking-essentials', name: 'Cooking Essentials', blurb: 'Oil, salt, sugar and masalas', tint: '#F2ECDD', art: ['sunflower-oil-1l', 'turmeric-200g', 'sugar-1kg'] },
  { slug: 'personal-care', name: 'Personal Care', blurb: 'Soap, shampoo and daily care', tint: '#E8F0E6', art: ['shampoo-340', 'toothpaste-150', 'bath-soap-4'] },
  { slug: 'home-cleaning', name: 'Home Cleaning', blurb: 'Keep the home sparkling', tint: '#D5E4D2', art: ['detergent-1kg', 'dishwash-500', 'floor-cleaner-1l'] },
  { slug: 'household', name: 'Household Essentials', blurb: 'Kitchen and home basics', tint: '#F2ECDD', art: ['foil-9m', 'tissue-roll', 'led-bulb'] },
  { slug: 'chocolates-sweets', name: 'Chocolates & Sweets', blurb: 'Little treats and mithai', tint: '#F1E7CF', art: ['choc-milk', 'soan-papdi', 'candy-assorted'] },
];

export const categoryMap: Record<string, Category> = Object.fromEntries(categories.map((c) => [c.slug, c]));
