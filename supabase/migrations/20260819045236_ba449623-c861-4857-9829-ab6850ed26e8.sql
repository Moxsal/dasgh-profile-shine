DROP POLICY "Published products are viewable by everyone" ON public.products;

CREATE POLICY "Published products are public" ON public.products
FOR SELECT USING (published = true);

CREATE POLICY "Admins can view all products" ON public.products
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;