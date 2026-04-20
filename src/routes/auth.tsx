import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [{ title: "Вход — СКАЙСИТИ" }, { name: "robots", content: "noindex" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/leads" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/admin/leads" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fn =
      mode === "signin"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin/leads` },
          });
    const { error } = await fn;
    setLoading(false);
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark px-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-sm">
        <div className="mb-6 text-center">
          <Link to="/" className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">
            ← На сайт
          </Link>
          <h1 className="mt-3 font-display font-bold uppercase text-white text-2xl">
            {mode === "signin" ? "Вход для админа" : "Регистрация"}
          </h1>
        </div>
        <form onSubmit={onSubmit} className="grid gap-4">
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border border-white/20 text-white placeholder:text-white/40 px-4 py-3 rounded-sm focus:outline-none focus:border-primary"
          />
          <input
            required
            type="password"
            placeholder="Пароль (мин. 6 символов)"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border border-white/20 text-white placeholder:text-white/40 px-4 py-3 rounded-sm focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-primary text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-accent transition disabled:opacity-60"
          >
            {loading ? "..." : mode === "signin" ? "Войти" : "Зарегистрироваться"}
          </button>
          {error && <p className="text-xs text-red-300 text-center">{error}</p>}
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-xs text-white/60 hover:text-white"
          >
            {mode === "signin" ? "Нет аккаунта? Зарегистрируйтесь" : "Уже есть аккаунт? Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
