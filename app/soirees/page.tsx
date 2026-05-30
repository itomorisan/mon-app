'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expand-media';

const soirees = [
  {
    id: 1,
    title: 'Nuit Électro',
    date: 'Sam 7 Juin',
    lieu: 'Warehouse Paris 18e',
    prix: '15€',
    image: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=1280&q=80',
    bg: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&q=80',
  },
  {
    id: 2,
    title: 'Rooftop Sunset',
    date: 'Ven 13 Juin',
    lieu: 'Terrasse République',
    prix: '12€',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1280&q=80',
    bg: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80',
  },
  {
    id: 3,
    title: 'Deep House Nuit',
    date: 'Sam 14 Juin',
    lieu: 'Club Oberkampf',
    prix: '10€',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1280&q=80',
    bg: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80',
  },
];

function SoireesContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || 'soirées';

  return (
    <main className="bg-black min-h-screen">
      <div className="px-6 pt-10 pb-4">
        <p className="text-zinc-500 text-xs font-mono">résultats pour</p>
        <h1 className="text-white text-2xl font-semibold mt-1">"{query}"</h1>
      </div>

      {soirees.map((s) => (
        <ScrollExpandMedia
          key={s.id}
          mediaType="image"
          mediaSrc={s.image}
          bgImageSrc={s.bg}
          title={s.title}
          date={s.date}
          scrollToExpand="↓ scroll pour voir"
        >
          <div className="text-white flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-semibold">{s.title}</p>
                <p className="text-zinc-400 text-sm">{s.lieu}</p>
              </div>
              <div className="text-right">
                <p className="text-zinc-400 text-sm">{s.date}</p>
                <p className="text-white font-medium">{s.prix}</p>
              </div>
            </div>
            <button className="w-full bg-white text-black rounded-full py-3 text-sm font-medium hover:bg-zinc-200 transition-colors">
              Réserver ma place
            </button>
          </div>
        </ScrollExpandMedia>
      ))}
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
