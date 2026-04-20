DROP POLICY IF EXISTS "Deny all access to authenticated" ON public.leads;

CREATE POLICY "Deny non-admin authenticated access to leads"
ON public.leads
AS RESTRICTIVE
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));