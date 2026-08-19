import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { normalizeProduct, Product } from '@/lib/catalog';

export const useProducts = (options?: { includeUnpublished?: boolean }) =>
  useQuery({
    queryKey: ['products', options?.includeUnpublished ?? false],
    queryFn: async (): Promise<Product[]> => {
      let query = supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (!options?.includeUnpublished) query = query.eq('published', true);

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []).map((row) => normalizeProduct(row as Record<string, unknown>));
    },
  });

export const useProduct = (slug?: string) =>
  useQuery({
    enabled: Boolean(slug),
    queryKey: ['product', slug],
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug!)
        .maybeSingle();
      if (error) throw error;
      return data ? normalizeProduct(data as Record<string, unknown>) : null;
    },
  });
