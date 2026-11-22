import { motion } from 'framer-motion';
import { ClipboardList, MessageCircle, ShoppingBasket } from 'lucide-react';
import { store } from '../config/store';
import { StoreImage } from './StoreImage';

export function About() {
  const points = [
    { icon: <ShoppingBasket size={22} aria-hidden="true" />, title: 'Everyday groceries', text: 'Staples, fresh produce, dairy, snacks and household items.' },
    { icon: <ClipboardList size={22} aria-hidden="true" />, title: 'Plan before you go', text: 'Keep a shopping list and a budget right here on the site.' },
    { icon: <MessageCircle size={22} aria-hidden="true" />, title: 'Order on WhatsApp', text: 'Send your cart to the store and they take it from there.' },
  ];
  return (
    <section id="about" aria-labelledby="about-title" className="py-14 sm:py-24">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <motion.div initial={{ clipPath: 'inset(0 100% 0 0)' }} whileInView={{ clipPath: 'inset(0 0% 0 0)' }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative">
          <StoreImage className="aspect-[4/3] rounded-lg" position="center 50%" />
          <div className="absolute -bottom-3 -right-3 -z-10 hidden h-full w-full rounded-lg border-2 border-gold sm:block" aria-hidden="true" />
        </motion.div>
        <div>
          <h2 id="about-title" className="text-3xl leading-tight sm:text-5xl">{store.about.heading}</h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink/80">
            {store.about.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {points.map((p) => (
              <li key={p.title}>
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-sage text-forest">{p.icon}</span>
                <h3 className="mt-3 font-sans text-base font-semibold text-ink">{p.title}</h3>
                <p className="mt-1 text-[15px] text-ink/70">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
