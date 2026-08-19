import { useEffect, useState } from 'react';
import { ProductImage, resolveImageSrc } from '@/lib/catalog';

interface Props {
  image?: ProductImage;
  fallbackAlt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

const CatalogImage = ({ image, fallbackAlt, className, loading = 'lazy' }: Props) => {
  const [src, setSrc] = useState<string>(image?.url ?? '');

  useEffect(() => {
    let active = true;
    if (!image) {
      setSrc('');
      return;
    }
    if (image.url) {
      setSrc(image.url);
      return;
    }
    resolveImageSrc(image).then((resolved) => {
      if (active) setSrc(resolved);
    });
    return () => {
      active = false;
    };
  }, [image]);

  if (!src) {
    return (
      <div
        className={`bg-navy-700 flex items-center justify-center text-gold-100/40 text-xs ${className ?? ''}`}
        aria-hidden="true"
      >
        No image
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={image?.alt || fallbackAlt}
      loading={loading}
      decoding="async"
      className={className}
    />
  );
};

export default CatalogImage;
