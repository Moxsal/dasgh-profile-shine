import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useProducts } from '@/hooks/useProducts';
import { useAuthSession, useIsAdmin } from '@/hooks/useAdmin';
import { useSeo } from '@/hooks/useSeo';
import { toast } from '@/hooks/use-toast';
import { CATEGORIES, Category, Product, ProductImage, slugify } from '@/lib/catalog';
import CatalogImage from '@/components/products/CatalogImage';

interface FormState {
  id?: string;
  title: string;
  slug: string;
  category: Category;
  product_type: string;
  short_description: string;
  full_description: string;
  price: string;
  availability: string;
  location: string;
  brand: string;
  model: string;
  condition: string;
  year: string;
  construction_stage: string;
  project_status: string;
  features: string;
  services: string;
  specifications: string;
  video_url: string;
  published: boolean;
  featured: boolean;
  sort_order: number;
  images: ProductImage[];
}

const emptyForm: FormState = {
  title: '',
  slug: '',
  category: 'CONSTRUCTIONS',
  product_type: '',
  short_description: '',
  full_description: '',
  price: '',
  availability: '',
  location: '',
  brand: '',
  model: '',
  condition: '',
  year: '',
  construction_stage: '',
  project_status: '',
  features: '',
  services: '',
  specifications: '',
  video_url: '',
  published: true,
  featured: false,
  sort_order: 0,
  images: [],
};

const toForm = (p: Product): FormState => ({
  id: p.id,
  title: p.title,
  slug: p.slug,
  category: p.category,
  product_type: p.product_type ?? '',
  short_description: p.short_description ?? '',
  full_description: p.full_description ?? '',
  price: p.price ?? '',
  availability: p.availability ?? '',
  location: p.location ?? '',
  brand: p.brand ?? '',
  model: p.model ?? '',
  condition: p.condition ?? '',
  year: p.year ?? '',
  construction_stage: p.construction_stage ?? '',
  project_status: p.project_status ?? '',
  features: p.features.join('\n'),
  services: p.services.join('\n'),
  specifications: p.specifications.map((s) => `${s.label}: ${s.value}`).join('\n'),
  video_url: p.video_url ?? '',
  published: p.published,
  featured: p.featured,
  sort_order: p.sort_order,
  images: p.images,
});

const lines = (value: string) =>
  value
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <label className="block">
    <span className="text-xs uppercase tracking-wider text-gold-100/60">{label}</span>
    <div className="mt-1">{children}</div>
  </label>
);

const inputClass =
  'w-full bg-navy-900 border border-gold-500/20 px-3 py-2 text-sm text-gold-50 focus:outline-none focus:border-gold-400';

const Admin = () => {
  const navigate = useNavigate();
  const { session, loading } = useAuthSession();
  const isAdmin = useIsAdmin(session?.user.id);
  const { data: products = [], isLoading } = useProducts({ includeUnpublished: true });
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useSeo({
    title: 'Product Management | Das GH Ltd',
    description: 'Internal product catalog management for Das GH Ltd.',
  });

  useEffect(() => {
    if (!loading && !session) navigate('/auth');
  }, [loading, session, navigate]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const refresh = () => queryClient.invalidateQueries({ queryKey: ['products'] });

  const uploadImages = async (files: FileList) => {
    setUploading(true);
    const uploaded: ProductImage[] = [];
    for (const file of Array.from(files).slice(0, 10)) {
      const path = `${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ''))}.${
        file.name.split('.').pop() ?? 'jpg'
      }`;
      const { error } = await supabase.storage.from('product-images').upload(path, file, {
        cacheControl: '3600',
      });
      if (error) {
        toast({ title: 'Upload failed', description: error.message });
        continue;
      }
      uploaded.push({ path, alt: form.title || file.name });
    }
    setForm((prev) => ({ ...prev, images: [...prev.images, ...uploaded] }));
    setUploading(false);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast({ title: 'Product name is required' });
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      slug: (form.slug.trim() || slugify(form.title)).trim(),
      category: form.category,
      product_type: form.product_type.trim() || null,
      short_description: form.short_description.trim() || null,
      full_description: form.full_description.trim() || null,
      price: form.price.trim() || null,
      availability: form.availability.trim() || null,
      location: form.location.trim() || null,
      brand: form.brand.trim() || null,
      model: form.model.trim() || null,
      condition: form.condition.trim() || null,
      year: form.year.trim() || null,
      construction_stage: form.construction_stage.trim() || null,
      project_status: form.project_status.trim() || null,
      features: lines(form.features),
      services: lines(form.services),
      specifications: lines(form.specifications).map((line) => {
        const [label, ...rest] = line.split(':');
        return { label: label.trim(), value: rest.join(':').trim() };
      }),
      images: form.images,
      video_url: form.video_url.trim() || null,
      published: form.published,
      featured: form.featured,
      sort_order: Number(form.sort_order) || 0,
    };

    const { error } = form.id
      ? await supabase.from('products').update(payload).eq('id', form.id)
      : await supabase.from('products').insert(payload);
    setSaving(false);

    if (error) {
      toast({ title: 'Could not save product', description: error.message });
      return;
    }
    toast({ title: form.id ? 'Product updated' : 'Product added' });
    setForm(emptyForm);
    refresh();
  };

  const remove = async (product: Product) => {
    if (!window.confirm(`Delete “${product.title}”? This cannot be undone.`)) return;
    const { error } = await supabase.from('products').delete().eq('id', product.id);
    if (error) {
      toast({ title: 'Could not delete product', description: error.message });
      return;
    }
    if (form.id === product.id) setForm(emptyForm);
    refresh();
  };

  if (loading || isAdmin === null) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center text-gold-100/70">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4 text-center">
        <div>
          <h1 className="font-serif text-2xl text-gold-50">Admin access required</h1>
          <p className="mt-3 text-gold-100/70 max-w-md">
            This account ({session?.user.email}) is signed in but does not have product management
            access yet. Ask Das GH Ltd to grant admin rights to this email.
          </p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="mt-6 border border-gold-500/30 px-5 py-2 text-gold-200"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-900 py-10">
      <div className="container-custom">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-serif text-3xl text-gold-50">Product Management</h1>
          <div className="flex gap-3">
            <a href="/products" className="text-sm text-gold-300 hover:text-gold-200 py-2">
              View marketplace
            </a>
            <button
              onClick={() => supabase.auth.signOut()}
              className="border border-gold-500/30 px-4 py-2 text-sm text-gold-200"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-10">
          <form onSubmit={save} className="space-y-4 border border-gold-500/15 bg-navy-800 p-6">
            <h2 className="font-serif text-xl text-gold-50">
              {form.id ? 'Edit product' : 'Add product'}
            </h2>

            <Field label="Product name *">
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Category *">
                <select
                  className={inputClass}
                  value={form.category}
                  onChange={(e) => set('category', e.target.value as Category)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="URL slug (auto if blank)">
                <input
                  className={inputClass}
                  value={form.slug}
                  onChange={(e) => set('slug', e.target.value)}
                  placeholder={slugify(form.title)}
                />
              </Field>
            </div>

            <Field label="Short description">
              <textarea
                className={inputClass}
                rows={2}
                value={form.short_description}
                onChange={(e) => set('short_description', e.target.value)}
              />
            </Field>

            <Field label="Full description">
              <textarea
                className={inputClass}
                rows={5}
                value={form.full_description}
                onChange={(e) => set('full_description', e.target.value)}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Price (leave blank for “Contact for Price”)">
                <input
                  className={inputClass}
                  value={form.price}
                  onChange={(e) => set('price', e.target.value)}
                />
              </Field>
              <Field label="Availability">
                <input
                  className={inputClass}
                  value={form.availability}
                  onChange={(e) => set('availability', e.target.value)}
                />
              </Field>
              <Field label="Product type">
                <input
                  className={inputClass}
                  value={form.product_type}
                  onChange={(e) => set('product_type', e.target.value)}
                />
              </Field>
              <Field label="Location (properties)">
                <input
                  className={inputClass}
                  value={form.location}
                  onChange={(e) => set('location', e.target.value)}
                />
              </Field>
              <Field label="Brand (machinery)">
                <input
                  className={inputClass}
                  value={form.brand}
                  onChange={(e) => set('brand', e.target.value)}
                />
              </Field>
              <Field label="Model (machinery)">
                <input
                  className={inputClass}
                  value={form.model}
                  onChange={(e) => set('model', e.target.value)}
                />
              </Field>
              <Field label="Condition">
                <input
                  className={inputClass}
                  value={form.condition}
                  onChange={(e) => set('condition', e.target.value)}
                />
              </Field>
              <Field label="Year">
                <input
                  className={inputClass}
                  value={form.year}
                  onChange={(e) => set('year', e.target.value)}
                />
              </Field>
              <Field label="Construction stage (projects)">
                <input
                  className={inputClass}
                  value={form.construction_stage}
                  onChange={(e) => set('construction_stage', e.target.value)}
                />
              </Field>
              <Field label="Project status">
                <input
                  className={inputClass}
                  value={form.project_status}
                  onChange={(e) => set('project_status', e.target.value)}
                />
              </Field>
            </div>

            <Field label="Features (one per line)">
              <textarea
                className={inputClass}
                rows={3}
                value={form.features}
                onChange={(e) => set('features', e.target.value)}
              />
            </Field>

            <Field label="Services involved (one per line)">
              <textarea
                className={inputClass}
                rows={3}
                value={form.services}
                onChange={(e) => set('services', e.target.value)}
              />
            </Field>

            <Field label="Specifications (one per line, “Label: value”)">
              <textarea
                className={inputClass}
                rows={3}
                value={form.specifications}
                onChange={(e) => set('specifications', e.target.value)}
              />
            </Field>

            <Field label="Video URL (optional)">
              <input
                className={inputClass}
                value={form.video_url}
                onChange={(e) => set('video_url', e.target.value)}
              />
            </Field>

            <Field label="Images">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => e.target.files && uploadImages(e.target.files)}
                className="text-sm text-gold-100/70"
              />
            </Field>
            {uploading && <p className="text-sm text-gold-100/60">Uploading images…</p>}

            {form.images.length > 0 && (
              <div className="space-y-3">
                {form.images.map((image, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <CatalogImage
                      image={image}
                      fallbackAlt={form.title}
                      className="w-16 h-16 object-cover border border-gold-500/20"
                    />
                    <input
                      className={inputClass}
                      value={image.alt ?? ''}
                      placeholder="Describe this image (alt text)"
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          images: prev.images.map((img, i) =>
                            i === index ? { ...img, alt: e.target.value } : img,
                          ),
                        }))
                      }
                    />
                    <button
                      type="button"
                      aria-label="Remove image"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== index),
                        }))
                      }
                      className="text-gold-100/60 hover:text-destructive p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <Field label="Order (lower shows first)">
                <input
                  type="number"
                  className={inputClass}
                  value={form.sort_order}
                  onChange={(e) => set('sort_order', Number(e.target.value))}
                />
              </Field>
              <label className="flex items-center gap-2 text-sm text-gold-100/80">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => set('published', e.target.checked)}
                />
                Published
              </label>
              <label className="flex items-center gap-2 text-sm text-gold-100/80">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => set('featured', e.target.checked)}
                />
                Show on homepage
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-gold-500 px-6 py-3 font-semibold text-navy-800 hover:bg-gold-400 disabled:opacity-60"
              >
                {saving ? 'Saving…' : form.id ? 'Save changes' : 'Add product'}
              </button>
              {form.id && (
                <button
                  type="button"
                  onClick={() => setForm(emptyForm)}
                  className="border border-gold-500/30 px-6 py-3 text-gold-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div>
            <h2 className="font-serif text-xl text-gold-50">
              Catalog ({products.length} products)
            </h2>
            {isLoading && <p className="mt-4 text-gold-100/60">Loading…</p>}
            <ul className="mt-4 space-y-3">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="flex gap-4 border border-gold-500/15 bg-navy-800 p-3"
                >
                  <CatalogImage
                    image={product.images[0]}
                    fallbackAlt={product.title}
                    className="w-20 h-20 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] uppercase tracking-wider text-gold-400">
                      {product.category}
                    </p>
                    <p className="text-gold-50 font-medium truncate">{product.title}</p>
                    <p className="text-xs text-gold-100/50 truncate">/products/{product.slug}</p>
                    <div className="mt-2 flex gap-3 text-sm">
                      <button
                        onClick={() => {
                          setForm(toForm(product));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-gold-300 hover:text-gold-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => remove(product)}
                        className="text-gold-100/60 hover:text-destructive"
                      >
                        Delete
                      </button>
                      {!product.published && (
                        <span className="text-gold-100/40">Unpublished</span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
