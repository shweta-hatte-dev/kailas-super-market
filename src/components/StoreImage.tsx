
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

  return (
    <div className={`relative overflow-hidden bg-sage ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-sage-deep" />
      )}

      <img
        src="/images/kailas-super-market.jpg"
        alt={store.storeImage.alt}
        onLoad={() => setLoaded(true)}
        onError={(e) => console.error('Store image failed:', e.currentTarget.src)}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{ objectPosition: position ?? store.storeImage.position }}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
