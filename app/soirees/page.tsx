'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import NavHeader from '@/components/ui/nav-header';

const soirees = [
  { id: 1, title: 'Nuit Électro', date: 'Sam 7 Juin', lieu: 'Warehouse Paris 18e', prix: '15€' },
  { id: 2, title: 'Rooftop Sunset', date: 'Ven 13 Juin', lieu: 'Terrasse République', prix: '12€' },
  { id: 3, title: 'Deep House Nuit', date: 'Sam 14 Juin', lieu: 'Club Oberkampf', prix: '10€' },
  { id: 4, title: 'Jazz & Cocktails', date: 'Jeu 19 Juin', lieu: 'Bastille Lounge', prix: '8€' },
];

function SoireesContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="pt-6 px-6">
        <NavHeader />
      </div>

      <div className="max-w-2xl mx-auto px-6 pt-16 pb-8">
        <p className="text-xs text-zinc-400 font-mono">résultats pour</p>
        <h1 className="text-2xl font-semibold mt-1">"{query}"</h1>
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-20 flex flex-col gap-4">
        {soirees.map((s) => (
          <div
            key={s.id}
            className="group flex items-center justify-between border-b border-zinc-200 py-5 cursor-pointer hover:border-zinc-900 transition-colors"
          >
            <div>
              <p className="text-base font-medium">{s.title}</p>
              <p className="text-xs text-zinc-400 font-mono mt-1">{s.lieu}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-zinc-400 font-mono">{s.date}</p>
              <p className="text-sm mt-1">{s.prix}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default function SoireesPage() {
  return (
    <Suspense>
      <SoireesContent />
    </Suspense>
  );
}
