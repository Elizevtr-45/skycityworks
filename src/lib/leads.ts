export type LeadPayload = {
  name: string;
  phone: string;
  area_m2?: number | null;
  object_type?: string | null;
  source?: string | null;
  message?: string | null;
  website?: string; // honeypot
};

// На VPS крутится только статика. API живёт на опубликованном Lovable-домене,
// где работает серверная часть TanStack Start (Cloudflare Worker).
// CORS на /api/leads разрешает запросы с любого origin.
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://skycityworks.lovable.app";

export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean; status: number }> {
  try {
    const res = await fetch(`${API_BASE}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok, status: res.status };
  } catch {
    return { ok: false, status: 0 };
  }
}
