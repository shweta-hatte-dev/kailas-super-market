import { motion } from 'framer-motion';
import { Heart, Plus } from 'lucide-react';
import type { Product } from '../types';
import { categoryMap } from '../data/categories';
import { percentOff } from '../lib/format';
import { useShop } from '../context/ShopContext';
import { ArtGroup, ProductArt } from './ProductArt';
import { Availability, Price, QtyStepper } from './ui';

export function productTint(p: Product) { return categoryMap[p.category]?.tint ?? '#F2ECDD'; }

export function ProductVisual({ p, className = '' }: { p: Product; className?: string }) {
  if (p.image) return <img src={p.image} alt={p.name} loading="lazy" decoding="async" className={`object-contain ${className}`} />;
  if (p.bundle) return <ArtGroup ids={p.bundle} className={className} />;
  return <ProductArt p={p} className={className} />;
}

export function WishButton({ id, name, className = '' }: { id: string; name: string; className?: string }) {
  const { isWished, toggleWish } = useShop();
  const on = isWished(id);
  return (
    <button type="button" onClick={() => toggleWish(id)} aria-pressed={on} aria-label={on ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      className={`flex h-11 w-11 items-center justify-center rounded-md bg-white/90 text-forest transition-colors hover:bg-white ${className}`}>
      <Heart size={19} className={on ? 'fill-[#B4472F] text-[#B4472F]' : ''} />
    </button>
  );
}

export function AddControl({ p, large = false }: { p: Product; large?: boolean }) {
  const { qtyOf, add } = useShop();
  const q = qtyOf(p.id);
  if (!p.inStock) return <button type="button" disabled className="btn btn-outline w-full">Out of stock</button>;
  if (q > 0) return <QtyStepper id={p.id} name={p.name} qty={q} large={large} />;
  return (
    <motion.button type="button" whileTap={{ scale: 0.96 }} onClick={() => add(p.id)} className={`btn btn-primary ${large ? 'px-8' : 'w-full'}`} aria-label={`Add ${p.name} to cart`}>
      <Plus size={18} /> Add
    </motion.button>
  );
}

export function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  const { openQuickView } = useShop();
  const off = percentOff(p.price, p.mrp);
  const catName = categoryMap[p.category]?.name ?? 'Combo offer';
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
      className="group flex flex-col overflow-hidden rounded-lg border border-forest/12 bg-white transition-shadow duration-300 hover:shadow-lift"
    >
      <div className="relative" style={{ background: productTint(p) }}>
        <button type="button" onClick={() => openQuickView(p.id)} aria-label={`View details for ${p.name}`} className="block w-full">
          <ProductVisual p={p} className="mx-auto aspect-square w-[82%] p-2 transition-transform duration-300 group-hover:scale-105 sm:p-3" />
        </button>
        {off > 0 && <span className="absolute left-2 top-2 rounded bg-gold px-2 py-0.5 text-xs font-bold text-forest">{off}% off</span>}
        <WishButton id={p.id} name={p.name} className="absolute right-2 top-2" />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-xs text-forest/75">{catName}</p>
        <h3 className="mt-0.5 font-sans text-[15px] font-semibold leading-snug text-ink">
          <button type="button" onClick={() => openQuickView(p.id)} className="text-left hover:underline">{p.name}</button>
        </h3>
        <p className="text-sm text-ink/65">{p.unit}</p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <Price price={p.price} mrp={p.mrp} />
          <Availability inStock={p.inStock} />
        </div>
        <div className="mt-3 flex min-h-[44px] items-end"><AddControl p={p} /></div>
      </div>
    </motion.article>
  );
}
