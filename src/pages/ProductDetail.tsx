import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CatalogImage from '@/components/products/CatalogImage';
import { useProduct } from '@/hooks/useProducts';
import { useSeo } from '@/hooks/useSeo';
import {
  displayPrice,
  isRealEstate,
  productEmailLink,
  productEnquiryLink,
  whatsappLink,
} from '@/lib/catalog';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useProduct(slug);
  const [activeImage, setActiveImage] = useState(0);

  const description =
    product?.short_description ??
    product?.full_description?.slice(0, 155) ??
    'Product from the Das GH Ltd marketplace.';

  const jsonLd = useMemo(() => {
    if (!product) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: product.full_description ?? product.short_description ?? undefined,
      category: product.category,
      brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
      model: product.model ?? undefined,
      image: product.images.map((i) => i.url).filter(Boolean),
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'GHS',
        url: `${window.location.origin}/products/${product.slug}`,
      },
    } as Record<string, unknown>;
  }, [product]);

  useSeo({
    title: product ? `${product.title} | Das GH Ltd` : 'Product | Das GH Ltd',
    description: description.slice(0, 155),
    canonicalPath: `/products/${slug ?? ''}`,
    image: product?.images[0]?.url,
    jsonLd,
  });

  const facts = product
    ? [
        ['Category', product.category],
        ['Product type', product.product_type],
        ['Brand', product.brand],
        ['Model', product.model],
        ['Condition', product.condition],
        ['Year', product.year],
        ['Availability', product.availability],
        ['Location', product.location],
        ['Construction stage', product.construction_stage],
        ['Project status', product.project_status],
      ].filter(([, value]) => Boolean(value))
    : [];

  const property = product ? isRealEstate(product) : false;

  return (
    <div className="min-h-screen bg-navy-900">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container-custom">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-gold-100/70 hover:text-gold-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all products
          </Link>

          {isLoading && <p className="mt-10 text-gold-100/60">Loading product…</p>}

          {!isLoading && !product && (
            <div className="mt-10">
              <h1 className="font-serif text-3xl text-gold-50">Product not found</h1>
              <p className="mt-3 text-gold-100/70">
                This listing may have been removed. Browse the full marketplace instead.
              </p>
            </div>
          )}

          {product && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
              <div>
                <div className="aspect-[4/3] bg-navy-800 overflow-hidden border border-gold-500/15">
                  <CatalogImage
                    image={product.images[activeImage]}
                    fallbackAlt={product.title}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="mt-3 grid grid-cols-4 sm:grid-cols-5 gap-3">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        aria-label={`View image ${index + 1} of ${product.title}`}
                        className={`aspect-square overflow-hidden border ${
                          index === activeImage ? 'border-gold-400' : 'border-gold-500/15'
                        }`}
                      >
                        <CatalogImage
                          image={image}
                          fallbackAlt={`${product.title} image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
                {product.video_url && (
                  <a
                    href={product.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm text-gold-300 hover:text-gold-200 underline"
                  >
                    Watch project video
                  </a>
                )}
              </div>

              <div>
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold-400">
                  {product.category}
                </span>
                <h1 className="mt-3 font-serif text-3xl sm:text-4xl text-gold-50 leading-tight">
                  {product.title}
                </h1>
                <p className="mt-4 text-xl text-gold-200 font-medium">
                  {displayPrice(product.price)}
                </p>

                {product.full_description && (
                  <p className="mt-6 text-gold-100/75 leading-relaxed whitespace-pre-line">
                    {product.full_description}
                  </p>
                )}

                {facts.length > 0 && (
                  <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 border-t border-gold-500/15 pt-6">
                    {facts.map(([label, value]) => (
                      <div key={label as string} className="flex justify-between gap-4 text-sm">
                        <dt className="text-gold-100/50">{label}</dt>
                        <dd className="text-gold-100 text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {product.specifications.length > 0 && (
                  <div className="mt-8">
                    <h2 className="font-serif text-xl text-gold-50">Specifications</h2>
                    <dl className="mt-3 space-y-2">
                      {product.specifications.map((spec) => (
                        <div key={spec.label} className="flex justify-between gap-4 text-sm">
                          <dt className="text-gold-100/50">{spec.label}</dt>
                          <dd className="text-gold-100 text-right">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {product.features.length > 0 && (
                  <div className="mt-8">
                    <h2 className="font-serif text-xl text-gold-50">
                      {property ? 'Property features' : 'Key features'}
                    </h2>
                    <ul className="mt-3 space-y-2 text-sm text-gold-100/75 list-disc pl-5">
                      {product.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.services.length > 0 && (
                  <div className="mt-8">
                    <h2 className="font-serif text-xl text-gold-50">Services involved</h2>
                    <ul className="mt-3 space-y-2 text-sm text-gold-100/75 list-disc pl-5">
                      {product.services.map((service) => (
                        <li key={service}>{service}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-10 flex flex-col sm:flex-row gap-3">
                  <a
                    href={
                      property
                        ? whatsappLink(
                            `Hello Das GH Ltd, I would like to schedule a viewing for "${product.title}".`,
                          )
                        : productEnquiryLink(product)
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-gold-500 px-6 py-3 font-semibold text-navy-800 hover:bg-gold-400 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {property ? 'Schedule a Viewing' : 'Request a Quote'}
                  </a>
                  <a
                    href={productEmailLink(product)}
                    className="inline-flex items-center justify-center gap-2 border border-gold-500/30 px-6 py-3 font-medium text-gold-200 hover:border-gold-400 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {property ? 'Request Property Details' : 'Contact Us'}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
