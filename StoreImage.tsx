import { useState } from 'react';
import { store } from '../config/store';

// Picks up src/assets/store/storefront.(jpg|jpeg|png|webp|avif) at build time. Hashed + bundled by Vite.
const found = import.meta.glob('/src/assets/store/storefront.{jpg,jpeg,png,webp,avif}', {
  eager: true, query: '?url', import: 'default',
}) as Record<string, string>;
export const storefrontUrl: string | null = Object.values(found)[0] ?? null;

interface Props { className?: string; priority?: boolean; position?: string }

export function StoreImage({ className = '', priority = false, position }: Props) {
  const [loaded, setLoaded] = useState(false);
  const objectPosition = position ?? store.storeImage.position;

  if (!storefrontUrl) {
    // Honest fallback: a plain branded panel, never a made-up shop photo.
    return (
      <div className={`relative flex items-end overflow-hidden bg-forest ${className}`}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#C6A66B 1px, transparent 1px)', backgroundSize: '18px 18px' }} aria-hidden="true" />
        <div className="relative p-5 text-cream">
          <p className="font-display text-2xl leading-tight">{store.name}</p>
          {store.showSetupHints && (
            <p className="mt-2 max-w-[28ch] rounded bg-gold-tint px-2 py-1.5 text-xs text-forest">
              Setup: save the real storefront photo as <b>src/assets/store/storefront.jpg</b>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-sage ${className}`}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-sage-deep" aria-hidden="true" />}
      <img
        src={storefrontUrl}
        alt={store.storeImage.alt}
        onLoad={() => setLoaded(true)}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...(priority ? ({ fetchpriority: 'high' } as object) : {})}
        style={{ objectPosition }}
        className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
