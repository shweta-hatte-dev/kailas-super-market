import type { ArtShape, Product } from '../types';

/**
 * SAMPLE PRODUCTS — replace with the store's real items and prices.
 * One line per product:
 *   P(id, name, category, unit, price, shape, color, { optional fields })
 * Optional: mrp (shows a discount), accent, inStock:false, popular, quick, tags, description,
 *           image ('/products/file.jpg' — a real photo placed in /public/products).
 * Product names are generic on purpose: no brand logos or packaging are imitated.
 */
const P = (
  id: string, name: string, category: string, unit: string, price: number,
  shape: ArtShape, color: string, o: Partial<Product> = {},
): Product => ({ id, name, category, unit, price, shape, color, inStock: true, ...o });

export const products: Product[] = [
  // Fruits & vegetables
  P('apple-shimla', 'Shimla Apples', 'fruits-vegetables', '1 kg', 180, 'round', '#C6423A', { accent: '#4F8D57', popular: true, tags: ['seb', 'fruit'] }),
  P('banana', 'Robusta Bananas', 'fruits-vegetables', '1 dozen', 60, 'banana', '#E8C547', { popular: true, tags: ['kela', 'fruit'] }),
  P('tomato', 'Fresh Tomatoes', 'fruits-vegetables', '500 g', 30, 'round', '#D4402B', { accent: '#4F8D57', popular: true, quick: true, tags: ['tamatar', 'vegetable'] }),
  P('potato', 'Potatoes', 'fruits-vegetables', '1 kg', 40, 'potato', '#B58A57', { quick: true, tags: ['aloo', 'batata', 'vegetable'] }),
  P('onion', 'Onions', 'fruits-vegetables', '1 kg', 38, 'round', '#B56A78', { accent: '#8FB27A', quick: true, tags: ['pyaz', 'kanda', 'vegetable'] }),
  P('spinach', 'Spinach Bunch', 'fruits-vegetables', '1 bunch', 20, 'leafy', '#3F8A47', { tags: ['palak', 'vegetable', 'leafy'] }),
  P('carrot', 'Carrots', 'fruits-vegetables', '500 g', 35, 'carrot', '#E8832B', { accent: '#4F8D57', tags: ['gajar', 'vegetable'] }),

  // Rice, atta & grains
  P('rice-basmati-5kg', 'Basmati Rice', 'rice-atta-grains', '5 kg', 549, 'sack', '#E9DDBE', { mrp: 620, accent: '#173F2B', popular: true, tags: ['chawal'] }),
  P('rice-sona-5kg', 'Sona Masoori Rice', 'rice-atta-grains', '5 kg', 320, 'sack', '#D9CBA3', { accent: '#173F2B', tags: ['chawal'] }),
  P('atta-5kg', 'Whole Wheat Atta', 'rice-atta-grains', '5 kg', 245, 'sack', '#D2A86A', { mrp: 270, accent: '#173F2B', popular: true, quick: true, tags: ['gehu', 'flour', 'chakki'] }),
  P('besan-500g', 'Besan (Gram Flour)', 'rice-atta-grains', '500 g', 70, 'pouch', '#E3B94E', { accent: '#173F2B', tags: ['chickpea flour'] }),
  P('poha-500g', 'Poha (Flattened Rice)', 'rice-atta-grains', '500 g', 55, 'pouch', '#EFE3B5', { accent: '#4F8D57', tags: ['breakfast', 'pohe'] }),
  P('rava-500g', 'Sooji (Rava)', 'rice-atta-grains', '500 g', 38, 'pouch', '#E8D49A', { accent: '#173F2B', tags: ['semolina', 'suji'] }),

  // Pulses & dal
  P('toor-dal-1kg', 'Toor Dal', 'pulses-dal', '1 kg', 165, 'pouch', '#E3B73F', { accent: '#173F2B', popular: true, quick: true, tags: ['arhar', 'tur', 'lentil'] }),
  P('moong-dal-1kg', 'Moong Dal', 'pulses-dal', '1 kg', 140, 'pouch', '#D6C43F', { accent: '#173F2B', tags: ['lentil'] }),
  P('chana-dal-1kg', 'Chana Dal', 'pulses-dal', '1 kg', 110, 'pouch', '#D9A93A', { accent: '#173F2B', tags: ['lentil'] }),
  P('masoor-dal-1kg', 'Masoor Dal', 'pulses-dal', '1 kg', 105, 'pouch', '#D2733A', { accent: '#173F2B', tags: ['lentil'] }),
  P('rajma-500g', 'Rajma', 'pulses-dal', '500 g', 90, 'pouch', '#8C2F2A', { accent: '#E8F0E6', tags: ['kidney beans'] }),
  P('kabuli-chana-500g', 'Kabuli Chana', 'pulses-dal', '500 g', 85, 'pouch', '#D8BE8A', { accent: '#173F2B', tags: ['chole', 'chickpea'] }),

  // Snacks & namkeen
  P('chips-salted', 'Salted Potato Chips', 'snacks-namkeen', '90 g', 30, 'pouch', '#D9A33B', { accent: '#173F2B', popular: true, tags: ['wafers'] }),
  P('bhujia-400g', 'Aloo Bhujia', 'snacks-namkeen', '400 g', 110, 'pouch', '#E0A030', { accent: '#173F2B', popular: true, tags: ['sev', 'namkeen'] }),
  P('mixture-400g', 'Classic Mixture', 'snacks-namkeen', '400 g', 120, 'pouch', '#C98A2B', { accent: '#173F2B', tags: ['chivda', 'namkeen'] }),
  P('peanuts-200g', 'Roasted Peanuts', 'snacks-namkeen', '200 g', 40, 'pouch', '#B9814A', { accent: '#173F2B', tags: ['shengdana', 'moongphali'] }),

  // Biscuits & cookies
  P('glucose-biscuit', 'Glucose Biscuits', 'biscuits-cookies', '500 g', 50, 'box', '#3B6EA5', { accent: '#F1E7CF', popular: true, quick: true, tags: ['tea biscuit'] }),
  P('cream-biscuit', 'Cream Biscuits', 'biscuits-cookies', '250 g', 40, 'box', '#B3472F', { accent: '#F1E7CF' }),
  P('digestive', 'Digestive Biscuits', 'biscuits-cookies', '400 g', 85, 'box', '#8A6A3F', { mrp: 95, accent: '#F1E7CF' }),
  P('butter-cookies', 'Butter Cookies', 'biscuits-cookies', '300 g', 90, 'tin', '#3E6BA8', { accent: '#C6A66B' }),
  P('rusk', 'Tea Rusk', 'biscuits-cookies', '600 g', 70, 'pouch', '#C98B4E', { accent: '#173F2B', tags: ['toast'] }),

  // Dairy & milk products
  P('milk-1l', 'Toned Milk', 'dairy-milk', '1 L', 56, 'carton', '#5C8FC4', { accent: '#FAF7F0', popular: true, quick: true, tags: ['doodh'] }),
  P('curd-400g', 'Fresh Curd', 'dairy-milk', '400 g', 35, 'jar', '#F2EFE3', { accent: '#4F8D57', quick: true, tags: ['dahi', 'yogurt'] }),
  P('paneer-200g', 'Paneer', 'dairy-milk', '200 g', 90, 'box', '#EDE6D2', { accent: '#C6A66B', popular: true, tags: ['cottage cheese'] }),
  P('butter-100g', 'Salted Butter', 'dairy-milk', '100 g', 60, 'box', '#E7C74F', { accent: '#B4472F', tags: ['makhan'] }),
  P('cheese-slices', 'Cheese Slices', 'dairy-milk', '200 g', 140, 'box', '#E6A82E', { accent: '#FAF7F0', inStock: false }),
  P('bread-sandwich', 'Sandwich Bread', 'dairy-milk', '400 g', 45, 'bread', '#D9A25B', { popular: true, quick: true, tags: ['pav', 'loaf'] }),
  P('eggs-6', 'Eggs', 'dairy-milk', '6 pcs', 48, 'carton', '#BFAE8E', { accent: '#FAF7F0', quick: true, tags: ['anda'] }),
  P('ghee-500ml', 'Pure Ghee', 'dairy-milk', '500 ml', 320, 'jar', '#E9C65A', { mrp: 345, accent: '#173F2B', tags: ['clarified butter'] }),

  // Beverages & cold drinks
  P('cola-750', 'Cola', 'beverages', '750 ml', 40, 'bottle', '#3A2418', { accent: '#B4472F', popular: true, tags: ['soft drink', 'cold drink', 'soda'] }),
  P('orange-juice-1l', 'Orange Juice', 'beverages', '1 L', 110, 'carton', '#E98B2A', { accent: '#FAF7F0', tags: ['fruit juice'] }),
  P('tea-500g', 'Tea Leaves', 'beverages', '500 g', 240, 'box', '#7A3E22', { accent: '#C6A66B', quick: true, tags: ['chai', 'chai patti'] }),
  P('coffee-100g', 'Instant Coffee', 'beverages', '100 g', 290, 'jar', '#5A3825', { accent: '#173F2B' }),
  P('water-1l', 'Packaged Drinking Water', 'beverages', '1 L', 20, 'bottle', '#A7D3E8', { accent: '#4F8D57', quick: true, tags: ['paani', 'mineral water'] }),
  P('lemon-soda', 'Lemon Soda', 'beverages', '600 ml', 30, 'bottle', '#CFE08A', { accent: '#4F8D57', tags: ['cold drink'] }),

  // Cooking essentials
  P('sunflower-oil-1l', 'Sunflower Oil', 'cooking-essentials', '1 L', 140, 'bottle', '#E7B93A', { mrp: 155, accent: '#173F2B', popular: true, quick: true, tags: ['tel', 'refined oil', 'cooking oil'] }),
  P('mustard-oil-1l', 'Mustard Oil', 'cooking-essentials', '1 L', 170, 'bottle', '#D9A021', { accent: '#173F2B', tags: ['tel', 'sarson', 'cooking oil'] }),
  P('salt-1kg', 'Iodised Salt', 'cooking-essentials', '1 kg', 26, 'pouch', '#E9EEF3', { accent: '#3B6EA5', quick: true, tags: ['namak'] }),
  P('sugar-1kg', 'Sugar', 'cooking-essentials', '1 kg', 46, 'pouch', '#F6F2EA', { accent: '#4F8D57', quick: true, tags: ['chini', 'sakhar'] }),
  P('turmeric-200g', 'Turmeric Powder', 'cooking-essentials', '200 g', 58, 'pouch', '#E0A800', { accent: '#173F2B', tags: ['haldi', 'masala', 'spice'] }),
  P('chilli-200g', 'Red Chilli Powder', 'cooking-essentials', '200 g', 85, 'pouch', '#B3261E', { accent: '#FAF7F0', tags: ['mirch', 'masala', 'spice'] }),
  P('garam-masala-100g', 'Garam Masala', 'cooking-essentials', '100 g', 75, 'box', '#8A4B25', { accent: '#C6A66B', tags: ['masala', 'spice'] }),
  P('jaggery-1kg', 'Jaggery', 'cooking-essentials', '1 kg', 85, 'pouch', '#A8662B', { accent: '#FAF7F0', tags: ['gud', 'gur'] }),
  P('sesame-200g', 'Sesame Seeds', 'cooking-essentials', '200 g', 55, 'pouch', '#E6D8B4', { accent: '#173F2B', tags: ['til'] }),

  // Personal care
  P('bath-soap-4', 'Bath Soap', 'personal-care', 'Pack of 4', 130, 'box', '#4F8D57', { accent: '#FAF7F0', tags: ['soap'] }),
  P('shampoo-340', 'Shampoo', 'personal-care', '340 ml', 210, 'bottle', '#2D6F8A', { mrp: 235, accent: '#FAF7F0', popular: true }),
  P('toothpaste-150', 'Toothpaste', 'personal-care', '150 g', 95, 'tube', '#D93D3D', { accent: '#FAF7F0', tags: ['dental'] }),
  P('handwash-250', 'Hand Wash', 'personal-care', '250 ml', 89, 'bottle', '#7BC1A3', { accent: '#173F2B' }),
  P('facewash-100', 'Face Wash', 'personal-care', '100 ml', 145, 'tube', '#6CB36F', { accent: '#FAF7F0' }),
  P('deo-150', 'Deodorant Spray', 'personal-care', '150 ml', 175, 'spray', '#3E4C7A', { accent: '#C6A66B', tags: ['deo'] }),

  // Home cleaning
  P('detergent-1kg', 'Detergent Powder', 'home-cleaning', '1 kg', 120, 'pouch', '#2F7FC1', { accent: '#FAF7F0', popular: true, quick: true, tags: ['washing powder', 'surf'] }),
  P('dishwash-500', 'Dishwash Liquid', 'home-cleaning', '500 ml', 110, 'bottle', '#73B84A', { accent: '#FAF7F0', tags: ['vim', 'utensil'] }),
  P('floor-cleaner-1l', 'Floor Cleaner', 'home-cleaning', '1 L', 185, 'bottle', '#3AA6B9', { mrp: 205, accent: '#FAF7F0', tags: ['phenyl'] }),
  P('toilet-cleaner-500', 'Toilet Cleaner', 'home-cleaning', '500 ml', 95, 'bottle', '#2B5FA8', { accent: '#FAF7F0' }),
  P('glass-cleaner-500', 'Glass Cleaner Spray', 'home-cleaning', '500 ml', 125, 'spray', '#6BB5D9', { accent: '#173F2B' }),

  // Household essentials
  P('tissue-roll', 'Kitchen Tissue Rolls', 'household', 'Pack of 2', 80, 'roll', '#F3EEE2', { accent: '#C6A66B', tags: ['paper towel'] }),
  P('foil-9m', 'Aluminium Foil', 'household', '9 m', 110, 'roll', '#C8CED3', { accent: '#173F2B', tags: ['kitchen'] }),
  P('garbage-bags', 'Garbage Bags', 'household', '30 pcs', 99, 'roll', '#2B2F2C', { accent: '#4F8D57', tags: ['dustbin bags'] }),
  P('led-bulb', 'LED Bulb 9 W', 'household', '1 pc', 120, 'box', '#F0E8D0', { accent: '#C6A66B', tags: ['light'] }),
  P('agarbatti', 'Incense Sticks', 'household', '1 pack', 40, 'box', '#8A4B25', { accent: '#C6A66B', tags: ['agarbatti', 'pooja'] }),
  P('matchbox', 'Safety Matches', 'household', 'Pack of 10', 20, 'box', '#C0392B', { accent: '#F1E7CF', tags: ['machis'] }),

  // Chocolates & sweets
  P('choc-milk', 'Milk Chocolate Bar', 'chocolates-sweets', '40 g', 40, 'bar', '#6B3A24', { accent: '#3E6BA8', popular: true, tags: ['chocolate'] }),
  P('choc-dark', 'Dark Chocolate Bar', 'chocolates-sweets', '80 g', 150, 'bar', '#3B2418', { accent: '#C6A66B', tags: ['chocolate'] }),
  P('candy-assorted', 'Assorted Candies', 'chocolates-sweets', '150 g', 50, 'pouch', '#D95B7F', { accent: '#FAF7F0', tags: ['toffee', 'sweets'] }),
  P('soan-papdi', 'Soan Papdi', 'chocolates-sweets', '250 g', 120, 'box', '#E9C77A', { accent: '#B4472F', tags: ['mithai', 'sweet'] }),
  P('chikki', 'Peanut Chikki', 'chocolates-sweets', '200 g', 60, 'box', '#B9783A', { accent: '#173F2B', tags: ['gud', 'sweet'] }),
];
