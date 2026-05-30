'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Home, PartyPopper, MapPin, User, Mail } from 'lucide-react';
import { Dock } from '@/components/ui/dock';

const soirees = [
  { id: 1, title: 'Nuit Électro', date: 'Sam 7 Juin', lieu: 'Warehouse Paris 18e', prix: '15€' },
  { id: 2, title: 'Rooftop Sunset', date: 'Ven 13 Juin', lieu: 'Terrasse République', prix: '12€' },
  { id: 3, title: 'Deep House Nuit', date: 'Sam 14 Juin', lieu: 'Club Oberkampf', prix: '10€' },
  { id: 4, title: 'Jazz & Cocktails', date: 'Jeu 19 Juin', lieu: 'Bastille Lounge', prix: '8€' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function SoireesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || 'soirées';

  const dockItems = [
    { icon: Home, label: 'Home', onClick: () => router.push('/?skip=1') },
    { icon: PartyPopper, label: 'Soirées', onClick: () => router.push('/soirees') },
    { icon: MapPin, label: 'Lieux' },
    { icon: User, label: 'About' },
    { icon: Mail, label: 'Contact' },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-white to-zinc-100 text-zinc-900 flex items-center justify-center px-6">
      <motion.div
        className="w-full max-w-2xl flex flex-col gap-4 pb-24"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={item} className="text-xs text-zinc-400 font-mono mb-2">
          résultats pour "{query}"
        </motion.p>

        {soirees.map((s) => (
          <motion.div
            key={s.id}
            variants={item}
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
          </motion.div>
        ))}
      </motion.div>

      <div className="fixed bottom-6 left-0 right-0 z-50">
        <Dock items={dockItems} />
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
