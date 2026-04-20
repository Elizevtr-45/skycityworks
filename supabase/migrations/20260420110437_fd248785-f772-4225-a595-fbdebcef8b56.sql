-- Explicitly deny all access to anon and authenticated roles.
-- Inserts/reads happen exclusively via server functions using the service role.
create policy "Deny all access to anon"
  on public.leads
  as restrictive
  for all
  to anon
  using (false)
  with check (false);

create policy "Deny all access to authenticated"
  on public.leads
  as restrictive
  for all
  to authenticated
  using (false)
  with check (false);