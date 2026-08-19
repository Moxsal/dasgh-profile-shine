import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Product, displayPrice, isRealEstate, productEnquiryLink } from '@/lib/catalog';
import CatalogImage from './CatalogImage';

const ProductCard = ({ product }: { product: Product }) => {
  const cta = isRealEstate(product) ? 'Enquire About Property' : 'Request Information';

  return (
    <article className="group flex flex-col border border-gold-500/15 bg-navy-800 overflow-hidden transition-colors hover:border-gold-500/40">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-navy-700">
          <CatalogImage
            image={product.images[0]}
            fallbackAlt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold-400">
          {product.category}
        </span>
        <h3 className="mt-2 font-serif text-lg text-gold-50 leading-snug">
          <Link to={`/products/${product.slug}`} className="hover:text-gold-300 transition-colors">
            {product.title}
          </Link>
        </h3>

        {product.short_description && (
          <p className="mt-2 text-sm text-gold-100/70 leading-relaxed line-clamp-3">
            {product.short_description}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="text-gold-200 font-medium">{displayPrice(product.price)}</span>
          {product.availability && (
            <span className="text-gold-100/60">{product.availability}</span>
          )}
          {product.location && <span className="text-gold-100/60">{product.location}</span>}
        </div>

        <div className="mt-5 pt-4 border-t border-gold-500/10 flex flex-wrap gap-3">
          <Link
            to={`/products/${product.slug}`}
            className="inline-flex items-center gap-2 bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-800 hover:bg-gold-400 transition-colors"
          >
            View Product
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={productEnquiryLink(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gold-200 border border-gold-500/30 hover:border-gold-400 hover:text-gold-100 transition-colors"
          >
            {cta}
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
