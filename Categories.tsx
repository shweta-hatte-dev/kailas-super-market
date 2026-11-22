import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '../data/categories';
import { allProducts } from '../data/lookup';
import { useShop } from '../context/ShopContext';
import { ArtGroup } from './ProductArt';
import { SectionHead } from './ui';

const spans = ['col-span-2 sm:col-span-2 sm:row-span-2', 'col-span-2 md:col-span-1 lg:col-span-2'];

export function Categories() {
  const { goToShop } = useShop();
  return (
    <section id="categories" aria-labelledby="cat-title" className="py-14 sm:py-20">
      <div className="container-x">
        <SectionHead id="cat-title" title="Shop by category" text="Pick an aisle and we’ll show everything on that shelf." />
        <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[170px] md:grid-cols-3 lg:auto-rows-[185px] lg:grid-cols-4">
          {categories.map((c, i) => {
            const count = allProducts.filter((p) => p.category === c.slug).length;
            return (
              <motion.button
                key={c.slug} type="button" onClick={() => goToShop({ category: c.slug })}
                initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.35, delay: (i % 4) * 0.04 }}
                className={`group relative overflow-hidden rounded-lg border border-forest/10 text-left transition-shadow hover:shadow-lift ${spans[i] ?? ''}`}
                style={{ background: c.tint }} aria-label={`${c.name}, ${count} products`}
              >
                <div className="relative z-10 flex max-w-[62%] flex-col p-4">
                  <h3 className={`font-semibold leading-tight ${i < 2 ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>{c.name}</h3>
                  <p className="mt-1 hidden text-sm text-forest/80 sm:block">{c.blurb}</p>
                  <p className="mt-1 text-sm text-forest/80 sm:mt-2">{count} products</p>
                </div>
                <ArtGroup ids={c.art} className="absolute bottom-0 right-0 h-[78%] w-[62%] transition-transform duration-300 group-hover:scale-105 sm:h-[82%]" />
                <span className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-md bg-white/80 text-forest opacity-90 transition-colors group-hover:bg-forest group-hover:text-cream"><ArrowUpRight size={18} aria-hidden="true" /></span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
