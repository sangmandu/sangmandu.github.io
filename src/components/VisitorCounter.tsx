import { useEffect, useState } from 'react';

const SITE = 'sangmandu';

export default function VisitorCounter() {
  const [total, setTotal] = useState<string>('–');
  const [page, setPage] = useState<string>('–');

  useEffect(() => {
    const base = `https://${SITE}.goatcounter.com/counter/`;

    fetch(`${base}TOTAL.json`)
      .then(r => r.ok ? r.json() : null)
      .then(d => d && setTotal(Number(d.count_unique).toLocaleString()))
      .catch(() => {});

    const p = encodeURIComponent(location.pathname);
    fetch(`${base}${p}.json`)
      .then(r => r.ok ? r.json() : null)
      .then(d => d && setPage(Number(d.count_unique).toLocaleString()))
      .catch(() => {});
  }, []);

  return (
    <span style={{
      display: 'inline-flex',
      gap: 12,
      fontSize: 11,
      color: '#a8a8a3',
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <span>total {total}</span>
      <span>page {page}</span>
    </span>
  );
}
