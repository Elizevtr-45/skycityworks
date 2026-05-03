import { useState } from "react";
import { checkDns } from "@/server/dns.functions";
import { Search, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type DnsEntry = { name: string; type: string; ttl: number; value: string };
type DnsResult = { domain: string; a: DnsEntry[]; ns: DnsEntry[]; txt: DnsEntry[] };

export function DnsDiagnostics() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<DnsResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    const cleaned = domain.trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!cleaned) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await checkDns({ data: { domain: cleaned } });
      setResult(res);
    } catch (e: any) {
      setError(e.message ?? "Ошибка при проверке DNS");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="dns-diagnostics" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4 text-foreground">
          DNS-диагностика
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          Проверьте DNS-записи любого домена: A, NS и TXT
        </p>

        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder="example.com"
            className="flex-1 px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleCheck}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            Проверить
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-destructive mb-6">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Результаты для <span className="text-primary">{result.domain}</span>
            </div>

            <RecordTable title="A-записи (IP-адреса)" records={result.a} />
            <RecordTable title="NS-записи (серверы имён)" records={result.ns} />
            <RecordTable title="TXT-записи" records={result.txt} />

            {result.a.length === 0 && result.ns.length === 0 && result.txt.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                DNS-записи не найдены. Домен может быть не зарегистрирован или DNS ещё не настроен.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function RecordTable({ title, records }: { title: string; records: DnsEntry[] }) {
  if (records.length === 0) return null;
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
      <div className="px-4 py-3 bg-muted font-semibold text-foreground">{title}</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="px-4 py-2 text-left">Тип</th>
              <th className="px-4 py-2 text-left">Имя</th>
              <th className="px-4 py-2 text-left">Значение</th>
              <th className="px-4 py-2 text-left">TTL</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-4 py-2 font-mono text-primary">{r.type}</td>
                <td className="px-4 py-2 font-mono">{r.name}</td>
                <td className="px-4 py-2 font-mono break-all">{r.value}</td>
                <td className="px-4 py-2 text-muted-foreground">{r.ttl}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
