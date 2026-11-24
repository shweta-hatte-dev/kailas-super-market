# Kailas Super Market — website

A fast, frontend-only supermarket website: browse products, search, wishlist, shopping list, budget tracker, cart, and **ordering through WhatsApp**. React + TypeScript + Vite + Tailwind CSS + Framer Motion. No backend, no API keys, no paid services.

## Features
Announcement bar · sticky navbar · hero with the real storefront photo · 12 category tiles that filter products · popular products grid with search, sort and availability filter · offers & combos · seasonal collection (switchable) · "Your everyday essentials" one-tap row · recently viewed · wishlist · cart drawer (saved in the browser) · WhatsApp checkout (pickup / delivery) · shopping list (copy / share, adds matching products to cart) · "Shop within your budget" · location with Google Maps · contact · footer · floating WhatsApp button · back-to-top · local-business SEO.

## Run it
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the built site
npm test           # automated tests (cart, search, budget, WhatsApp message, photo downloader, full-app flows)
npm run photos     # download product photos (see section 1)
```
Requires Node 18+. The build prints a **"[store setup]" checklist** of anything not filled in yet.

## 1. Photos

**Storefront photo** — already included at `src/assets/store/storefront.jpg` (used in the hero, the store section and the social preview). To replace it, overwrite that file keeping the name. The hero keeps the shop sign visible; change the crop with `storeImage.position` in `src/config/store.ts`.

**Product photos** — every product shows the photo `src/assets/products/<product-id>.jpg` (e.g. `tomato.jpg`). Until a photo exists the card shows a clean icon tile, never a broken image. Three ways to get photos:

1. **Automatic (recommended, ~3 minutes).** Get a free API key at https://www.pexels.com/api/ (sign up, copy the key). Then in the project folder run `npm run photos`, paste the key when asked. It downloads one real photo per product (free Pexels licence, credits saved in `src/assets/products/CREDITS.md`). Look through them; to swap any photo, replace its file keeping the same name. Commit the new files to GitHub.
2. **Let Vercel do it.** In Vercel: Project → Settings → Environment Variables → add `PEXELS_API_KEY` = your key, then redeploy. Missing photos are downloaded during each build (a failed download never breaks the deploy).
3. **By hand.** Save your own photos as `<product-id>.jpg` in `src/assets/products/`. `npm run photos:check` lists what is still missing. Square-ish landscape photos around 720×576 px work best.

The automatic search picks the first match for each product, so **check the results**; a few (for example cleaning products) may need a hand-picked replacement.

## 2. Store details — one file: `src/config/store.ts`
Name, announcement bar, **phone**, **WhatsApp number**, **address**, **Google Maps link / coordinates**, **opening hours**, pickup/delivery options, social links, About text, SEO title/description, seasonal collection. Leave a field `''` if unknown: it is hidden on the site and left out of SEO data. Nothing is invented.

- **WhatsApp:** `whatsappNumber: '919876543210'` (country code + number; a plain 10-digit Indian number also works). Until set, the cart shows "WhatsApp ordering isn't switched on yet" and never claims an order was sent. After a customer taps *Order on WhatsApp*, WhatsApp opens with the message ready; the customer must press **Send**.
- **Address / Maps:** fill `address`; add `googleMapsUrl` (Google Maps → Share → copy link) and optionally `coordinates` for the most accurate pin. Directions and the embedded map switch on automatically.
- **Hours:** e.g. `hours: [{ days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '08:00', closes: '21:00' }]`
- **Before going live:** set `showSetupHints: false` (hides yellow owner notes) and `demoData: false` once real products and prices are in.

## 3. Products, prices, categories, offers
- **Products & prices:** `src/data/products.ts` — one line per product: `P(id, name, category, unit, price, 'photo search words', { mrp, badge, inStock, popular, quick, tags })`. Add `mrp` to show a discount; `inStock: false` marks it unavailable; `quick: true` puts it in "everyday essentials"; `tags` add search words (e.g. `'dahi'`).
- **Product photos:** see section 1. Use `badge: 'Popular' | 'Fresh' | 'Best Seller' | 'New'` for the small label on a card.
- **Categories:** `src/data/categories.ts` (name, tint, and `cover` = the product whose photo is shown on the card). A product's `category` must match a category `slug`.
- **Offers:** `src/data/offers.ts` — banner text, which products appear in each tab, and combos (`comboPrice` must be lower than the sum of its items). "Savings collection" is automatic (products with an `mrp`).
- **Seasonal collection:** `src/data/seasons.ts` for content; pick the live one with `seasonal.active` in `store.ts` (`diwali ganesh holi sankranti summer monsoon winter christmas`) or switch it off with `seasonal.enabled: false`. Update it when the season changes.
- **Delete browser memory of old items:** shoppers' saved carts ignore products that no longer exist.

All offers, products and prices supplied are **sample data** until the owner confirms them.

## 4. Google & SEO
Built in from `store.ts`: title, description, canonical URL, Open Graph / social preview (`public/og-image.png`), LocalBusiness (`GroceryStore`) structured data, `robots.txt`, `sitemap.xml`, favicon, semantic headings.
- On Vercel the site address is detected automatically. For a custom domain, set `siteUrl: 'https://yourdomain.in'`.
- Only fields you fill in appear in the structured data (no invented address, ratings or reviews).
- **Google Business Profile is separate.** A website does not create a Google listing or guarantee ranking. The owner should claim/create the profile at business.google.com, use the same name, address and phone as in `store.ts`, and add this website's address to the profile. Add the site in Google Search Console and submit `/sitemap.xml`.
- Replace `public/og-image.png` (1200×630) with a design using the real shop photo when ready.

## 5. Put it on GitHub and Vercel
1. Extract the ZIP. Create an empty repository on github.com.
2. In the extracted folder: `git init && git add . && git commit -m "Kailas Super Market website" && git branch -M main && git remote add origin <your-repo-url> && git push -u origin main` (or drag the files into GitHub's "upload files" page; do **not** upload `node_modules` or `dist`).
3. On vercel.com choose **Add New → Project**, import the repository. Vercel detects Vite automatically (Build: `npm run build`, Output: `dist`). Click **Deploy**.
4. Every later `git push` redeploys. Add a custom domain under Project → Settings → Domains.

## Notes
- Cart, wishlist, list, budget and recently viewed are stored in the visitor's own browser (localStorage). There is no admin panel; the owner edits the files above. Orders are never stored on a server: they exist only as the WhatsApp message.
- Search engines render this single-page site with JavaScript. Google handles that, but a static, server-rendered version would be stronger for SEO if needed later.
