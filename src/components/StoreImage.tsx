
import { store } from '../config/store';

interface Props {
  className?: string;
  priority?: boolean;
  position?: string;
}

export function StoreImage({
  className = '',
  priority = false,
  position,
}: Props) {
  return (
    <div className={`relative overflow-hidden bg-sage ${className}`}>
      <img
        src="/images/kailas-super-market.jpg"
        alt="Kailas Super Market storefront"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: position ?? store.storeImage.position,
        }}
        className="absolute inset-0"
      />
    </div>
  );
}
