
import { useState } from 'react';
import { store } from '../config/store';

interface Props {
  className?: string;
  priority?: boolean;
  position?: string;
}

export function StoreImage({
  className = '',
  priority = false,
  position
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const objectPosition = position ?? store.storeImage.position;

  if (failed) {
    return (
      <div className={`relative flex items-center justify-center bg-forest text-cream ${className}`}>
        <p className="p-5 text-center font-display text-2xl">
          {store.name}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-sage ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-sage-deep" />
      )}

      <img
        src="/images/kailas-super-market.jpg"
        alt="Kailas Super Market storefront"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        style={{ objectPosition }}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
