import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/products/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { useSeo } from '@/hooks/useSeo';
import { CATEGORIES, CATEGORY_EMPTY_STATE, Category } from '@/lib/catalog';

const Products = () => {
  const { data: products = [], isLoading } = useProducts();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All Products' | Category>('All Products');

  useSeo({
    title: 'Products & Property Marketplace | Das GH Ltd',
    description:
      'Browse construction services and projects, decorative lighting, machinery, plumbing and property opportunities from Das GH Ltd in Ghana.',
    canonicalPath: '/products',
  });

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'All Products' || p.category === activeCategory;
      const matchesTerm =
        !term ||
        p.title.toLowerCase().includes(term) ||
        (p.short_description ?? '').toLowerCase().includes(term) ||
        (p.product_type ?? '').toLowerCase().includes(term);
      return matchesCategory && matchesTerm;
    });
  }, [products, search, activeCategory]);

  const visibleCategories = activeCategory === 'All Products' ? CATEGORIES : [activeCategory];

  return (
    <div className="min-h-screen bg-navy-900">
      <Header />
      <main>
        <section className="pt-32 pb-12 bg-navy-800 border-b border-gold-500/10">
          <div className="container-custom">
            <span className="text-gold-400 text-xs font-medium uppercase tracking-[0.2em]">
              Das GH Ltd Marketplace
            </span>
            <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-gold-50 max-w-3xl">
              Products, Projects & Property Opportunities
            </h1>
            <p className="mt-4 max-w-2xl text-gold-100/70 leading-relaxed">
              Construction services and live projects, decorative lighting, construction machinery,
              plumbing products and property listings — all in one place. Every listing reflects
              work and products Das GH Ltd genuinely offers.
            </p>
          </div>
        </section>

        <section className="py-8 border-b border-gold-500/10 sticky top-0 z-30 bg-navy-900/95 backdrop-blur">
          <div className="container-custom space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-100/50" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value.slice(0, 80))}
                placeholder="Search products by name"
                aria-label="Search products"
                className="w-full bg-navy-800 border border-gold-500/20 py-3 pl-10 pr-4 text-sm text-gold-50 placeholder:text-gold-100/40 focus:outline-none focus:border-gold-400"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(['All Products', ...CATEGORIES] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeCategory === category
                      ? 'bg-gold-500 text-navy-800'
                      : 'bg-navy-800 text-gold-100/70 border border-gold-500/20 hover:text-gold-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="container-custom py-14 space-y-16">
          {isLoading && <p className="text-gold-100/60">Loading products…</p>}

          {!isLoading &&
            visibleCategories.map((category) => {
              const items = filtered.filter((p) => p.category === category);
              return (
                <section key={category} id={category.toLowerCase().replace(/[^a-z]+/g, '-')}>
                  <div className="flex items-baseline justify-between border-b border-gold-500/15 pb-3 mb-6">
                    <h2 className="font-serif text-2xl sm:text-3xl text-gold-50">{category}</h2>
                    <span className="text-xs uppercase tracking-wider text-gold-100/50">
                      {items.length} {items.length === 1 ? 'listing' : 'listings'}
                    </span>
                  </div>

                  {items.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {items.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="border border-dashed border-gold-500/20 bg-navy-800/60 p-8">
                      <p className="text-gold-100/70 max-w-2xl leading-relaxed">
                        {search.trim()
                          ? `No ${category.toLowerCase()} listings match “${search.trim()}”.`
                          : CATEGORY_EMPTY_STATE[category]}
                      </p>
                    </div>
                  )}
                </section>
              );
            })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
