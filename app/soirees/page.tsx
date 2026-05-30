'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Home, PartyPopper, MapPin, User, Mail } from 'lucide-react';
import { Dock } from '@/components/ui/dock';
import ScrollExpandMedia from '@/components/ui/scroll-expand-media';
import { SmokeBackground } from '@/components/ui/smoke-background';

const soirees = [
  { id: 1, title: 'Nuit Électro', date: 'Sam 7 Juin', lieu: 'Warehouse Paris 18e', prix: '15€' },
  { id: 2, title: 'Rooftop Sunset', date: 'Ven 13 Juin', lieu: 'Terrasse République', prix: '12€' },
  { id: 3, title: 'Deep House Nuit', date: 'Sam 14 Juin', lieu: 'Club Oberkampf', prix: '10€' },
  { id: 4, title: 'Jazz & Cocktails', date: 'Jeu 19 Juin', lieu: 'Bastille Lounge', prix: '8€' },
];

function SoireesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || 'soirées';
  const [expanded, setExpanded] = useState(false);

  const dockItems = [
    { icon: Home, label: 'Home', onClick: () => router.push('/?skip=1') },
    { icon: PartyPopper, label: 'Soirées', onClick: () => router.push('/soirees') },
    { icon: MapPin, label: 'Lieux' },
    { icon: User, label: 'About' },
    { icon: Mail, label: 'Contact' },
  ];

  const List = () => (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      <p className="text-xs text-white/60 font-mono mb-2">résultats pour "{query}"</p>
      {soirees.map((s) => (
        <div
          key={s.id}
          className="group flex items-center justify-between border-b border-white/20 py-5 cursor-pointer hover:border-white transition-colors"
        >
          <div>
            <p className="text-base font-medium text-white">{s.title}</p>
            <p className="text-xs text-white/60 font-mono mt-1">{s.lieu}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/60 font-mono">{s.date}</p>
            <p className="text-sm mt-1 text-white">{s.prix}</p>
          </div>
        </div>
      ))}
    </div>
  );

  // Vue finale : liste centrée, figée (pas de scroll), fond fumée + dock
  if (expanded) {
    return (
      <main className="relative h-screen overflow-hidden bg-black flex items-center justify-center px-6">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <SmokeBackground smokeColor="#808080" />
        </div>
        <div className="relative z-10 w-full">
          <List />
        </div>
        <div className="fixed bottom-6 left-0 right-0 z-50">
          <Dock items={dockItems} />
        </div>
      </main>
    );
  }

  // Transition : animation d'expansion automatique
  return (
    <div className="relative bg-black">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=1280&q=80"
        background={<SmokeBackground smokeColor="#808080" />}
        autoExpand
        onExpandComplete={() => setExpanded(true)}
        textBlend
      >
        <div className="pb-32" />
      </ScrollExpandMedia>
    </div>
  );
}

export default function SoireesPage() {
  return (
    <Suspense>
      <SoireesContent />
    </Suspense>
  );
}
