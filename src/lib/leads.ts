export type LeadPayload = {
  name: string;
  phone: string;
  area_m2?: number | null;
  object_type?: string | null;
  source?: string | null;
  message?: string | null;
  website?: string; // honeypot
};

export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean; status: number }> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok, status: res.status };
  } catch {
    return { ok: false, status: 0 };
  }
}
}
