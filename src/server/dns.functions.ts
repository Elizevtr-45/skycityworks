import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const dnsSchema = z.object({
  domain: z.string().min(1).max(253).regex(/^[a-zA-Z0-9._-]+$/),
});

type DnsRecord = { name: string; type: number; TTL: number; data: string };
type DnsResponse = { Answer?: DnsRecord[]; Status: number };

async function queryDns(domain: string, type: string) {
  const res = await fetch(
    `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`
  );
  if (!res.ok) throw new Error(`DNS query failed: ${res.status}`);
  return (await res.json()) as DnsResponse;
}

const typeNames: Record<number, string> = {
  1: "A",
  2: "NS",
  5: "CNAME",
  15: "MX",
  16: "TXT",
  28: "AAAA",
};

export const checkDns = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => dnsSchema.parse(input))
  .handler(async ({ data }) => {
    const domain = data.domain.toLowerCase().replace(/\/+$/, "");

    const [aRes, nsRes, txtRes] = await Promise.all([
      queryDns(domain, "A"),
      queryDns(domain, "NS"),
      queryDns(domain, "TXT"),
    ]);

    const format = (r: DnsResponse) =>
      (r.Answer ?? []).map((a) => ({
        name: a.name,
        type: typeNames[a.type] ?? String(a.type),
        ttl: a.TTL,
        value: a.data,
      }));

    return {
      domain,
      a: format(aRes),
      ns: format(nsRes),
      txt: format(txtRes),
    };
  });
