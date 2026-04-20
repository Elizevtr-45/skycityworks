import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Lead = {
  id: string;
  name: string;
  phone: string;
  area_m2: number | null;
  object_type: string | null;
  source: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

const STATUSES = ["new", "in_progress", "done", "rejected"] as const;
const STATUS_LABEL: Record<string, string> = {
  new: "Новая",
  in_progress: "В работе",
  done: "Закрыта",
  rejected: "Отклонена",
};

export const Route = createFileRoute("/admin/leads")({
  head: () => ({
    meta: [{ title: "Заявки — СКАЙСИТИ" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminLeads,
});

function AdminLeads() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate({ to: "/auth" });
        return;
      }
      setEmail(session.user.email ?? "");
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      const admin = !!roles?.some((r) => r.role === "admin");
      if (!mounted) return;
      setIsAdmin(admin);
      setChecking(false);
      if (admin) loadLeads();
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/auth" });
    });

    check();
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (!error && data) setLeads(data as Lead[]);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await supabase.from("leads").update({ status }).eq("id", id);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        (l.object_type ?? "").toLowerCase().includes(q) ||
        (l.source ?? "").toLowerCase().includes(q)
      );
    });
  }, [leads, search, statusFilter]);

  const exportCsv = () => {
    const headers = ["Дата", "Имя", "Телефон", "Площадь м²", "Тип", "Источник", "Статус", "Сообщение"];
    const rows = filtered.map((l) => [
      new Date(l.created_at).toLocaleString("ru-RU"),
      l.name,
      l.phone,
      l.area_m2 ?? "",
      l.object_type ?? "",
      l.source ?? "",
      STATUS_LABEL[l.status] ?? l.status,
      (l.message ?? "").replace(/\n/g, " "),
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";"))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        Проверка доступа…
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold">Нет доступа</h1>
          <p className="mt-2 text-muted-foreground text-sm">
            Аккаунт <b>{email}</b> не имеет роли admin.
          </p>
          <p className="mt-2 text-muted-foreground text-xs">
            Попросите администратора выдать вам роль <code>admin</code> в таблице <code>user_roles</code>.
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <button
              onClick={signOut}
              className="px-4 py-2 border border-border rounded-sm text-sm hover:bg-accent"
            >
              Выйти
            </button>
            <Link to="/" className="px-4 py-2 bg-primary text-primary-foreground rounded-sm text-sm">
              На сайт
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container-px mx-auto max-w-7xl py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold uppercase text-xl">Заявки</h1>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/"
              className="px-3 py-2 border border-border rounded-sm text-sm hover:bg-accent"
            >
              На сайт
            </Link>
            <button
              onClick={signOut}
              className="px-3 py-2 border border-border rounded-sm text-sm hover:bg-accent"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="container-px mx-auto max-w-7xl py-8">
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <input
            placeholder="Поиск по имени, телефону, типу…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[220px] px-3 py-2 border border-border rounded-sm text-sm bg-background"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-sm text-sm bg-background"
          >
            <option value="all">Все статусы</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
          <button
            onClick={loadLeads}
            className="px-3 py-2 border border-border rounded-sm text-sm hover:bg-accent"
          >
            Обновить
          </button>
          <button
            onClick={exportCsv}
            className="px-3 py-2 bg-primary text-primary-foreground rounded-sm text-sm font-semibold"
          >
            Экспорт CSV ({filtered.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-12">Загрузка…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">Заявок не найдено</div>
        ) : (
          <div className="overflow-x-auto border border-border rounded-sm">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr className="text-left">
                  <th className="px-3 py-3 font-semibold">Дата</th>
                  <th className="px-3 py-3 font-semibold">Имя</th>
                  <th className="px-3 py-3 font-semibold">Телефон</th>
                  <th className="px-3 py-3 font-semibold">м²</th>
                  <th className="px-3 py-3 font-semibold">Тип</th>
                  <th className="px-3 py-3 font-semibold">Источник</th>
                  <th className="px-3 py-3 font-semibold">Статус</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l.id} className="border-t border-border hover:bg-muted/40">
                    <td className="px-3 py-3 whitespace-nowrap text-muted-foreground text-xs">
                      {new Date(l.created_at).toLocaleString("ru-RU")}
                    </td>
                    <td className="px-3 py-3 font-medium">{l.name}</td>
                    <td className="px-3 py-3">
                      <a href={`tel:${l.phone}`} className="text-primary hover:underline">
                        {l.phone}
                      </a>
                    </td>
                    <td className="px-3 py-3">{l.area_m2 ?? "—"}</td>
                    <td className="px-3 py-3">{l.object_type ?? "—"}</td>
                    <td className="px-3 py-3 text-xs text-muted-foreground">{l.source ?? "—"}</td>
                    <td className="px-3 py-3">
                      <select
                        value={l.status}
                        onChange={(e) => updateStatus(l.id, e.target.value)}
                        className="px-2 py-1 border border-border rounded-sm text-xs bg-background"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {STATUS_LABEL[s]}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
