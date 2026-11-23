import { motion } from 'framer-motion';
import { ArrowRight, Truck, Wallet } from 'lucide-react';
import { store } from '../config/store';
import { heroPromo } from '../data/offers';
import { getProduct } from '../data/lookup';
import { useShop } from '../context/ShopContext';
import { ProductArt } from './ProductArt';
import { StoreImage } from './StoreImage';
import { WhatsAppGlyph, WhatsAppLink } from './ui';

const line = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } };

export function Hero() {
  const { goToShop } = useShop();
  const bottle = getProduct('sunflower-oil-1l')!;
  const sack = getProduct('atta-5kg')!;
  const trust = [
    { icon: <WhatsAppGlyph size={20} />, text: 'Send your order on WhatsApp' },
    ...(store.delivery.pickup || store.delivery.homeDelivery ? [{ icon: <Truck size={20} aria-hidden="true" />, text: store.delivery.pickup && store.delivery.homeDelivery ? 'Pickup or home delivery' : store.delivery.pickup ? 'Pickup from the store' : 'Home delivery' }] : []),
    ...(store.showPrices ? [{ icon: <Wallet size={20} aria-hidden="true" />, text: 'Shop within your budget' }] : []),
  ];

  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute -right-32 -top-32 h-[560px] w-[560px] rounded-full bg-sage" aria-hidden="true" />
      <div className="container-x relative grid items-center gap-10 pb-14 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-20 lg:pt-14">
        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.11 }}>
          <h1 id="hero-title" className="text-[2.6rem] font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.4rem]">
            <motion.span variants={line} className="block">Your Everyday Essentials.</motion.span>
            <motion.span variants={line} className="block">All in One Place.</motion.span>
          </h1>
          <motion.p variants={line} className="mt-5 max-w-[34rem] text-lg leading-relaxed text-ink/80">
            From everyday groceries to your family’s favourite essentials — discover convenient neighbourhood shopping at {store.name}.
          </motion.p>
          <motion.div variants={line} className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button type="button" onClick={() => goToShop()} className="btn btn-primary px-7 text-base">Shop now <ArrowRight size={18} aria-hidden="true" /></button>
            <a href="#categories" className="btn btn-outline px-7 text-base">Explore categories</a>
            <WhatsAppLink className="btn btn-outline px-7 text-base"><WhatsAppGlyph /> Order on WhatsApp</WhatsAppLink>
          </motion.div>
          <motion.ul variants={line} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-7">
            {trust.map((t) => (
              <li key={t.text} className="flex items-center gap-2.5 text-[15px] font-medium text-forest">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-leaf-dark ring-1 ring-forest/10">{t.icon}</span>{t.text}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div className="relative mx-auto w-full max-w-[440px] lg:max-w-none lg:pl-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>
          <div className="relative">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[999px] rounded-b-xl border-2 border-gold" aria-hidden="true" />
            <StoreImage priority className="relative aspect-[4/5] rounded-t-[999px] rounded-b-xl sm:aspect-[5/6] lg:aspect-[4/5]" />
            <motion.div aria-hidden="true" className="absolute -right-2 top-14 w-20 sm:-right-5 sm:w-24" animate={{ y: [0, -9, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
              <ProductArt p={bottle} className="drop-shadow-md" />
            </motion.div>
            <motion.div aria-hidden="true" className="absolute -left-2 top-28 hidden w-20 sm:block lg:-left-8 lg:w-24" animate={{ y: [0, 8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}>
              <ProductArt p={sack} className="drop-shadow-md" />
            </motion.div>
            <motion.a href="#offers" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-5 left-2 max-w-[250px] rounded-lg bg-white p-4 shadow-lift ring-1 ring-forest/10 sm:left-0 lg:-left-6">
              <span className="price-tag text-sm">{heroPromo.title}</span>
              <span className="mt-2 block text-[15px] leading-snug text-ink/85">{heroPromo.text}</span>
              <span className="mt-2 flex items-center gap-1 text-sm font-semibold text-forest">See offers <ArrowRight size={14} aria-hidden="true" />{store.demoData && <span className="ml-auto text-xs font-medium text-ink/60">Sample</span>}</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
