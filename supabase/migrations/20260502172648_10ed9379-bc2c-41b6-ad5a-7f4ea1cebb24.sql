-- Remove leads from realtime publication to prevent sensitive data broadcast
ALTER PUBLICATION supabase_realtime DROP TABLE public.leads;

-- Revoke EXECUTE on has_role from anon role (it should only be used by authenticated/RLS internally)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon;