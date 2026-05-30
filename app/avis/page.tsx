"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, PartyPopper, MapPin, User, Mail, Check, X } from "lucide-react";
import { Dock } from "@/components/ui/dock";
import { SoireeColumn, Soiree } from "@/components/ui/soiree-columns";

const soirees: Soiree[] = [
  { id: 1, title: "Warehouse Rave", org: "Collectif Nuit Noire", orgImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80", date: "Sam 7 Juin", lieu: "Paris 18e", genre: "Techno", members: 142 },
  { id: 2, title: "Rooftop Sunset", org: "Skyline Crew", orgImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80", date: "Ven 13 Juin", lieu: "République", genre: "House", members: 88 },
  { id: 3, title: "Cave à Vinyles", org: "Deep Roots", orgImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80", date: "Sam 14 Juin", lieu: "Oberkampf", genre: "Disco", members: 56 },
  { id: 4, title: "Jazz & Cocktails", org: "Bastille Lounge", orgImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80", date: "Jeu 19 Juin", lieu: "Bastille", genre: "Jazz", members: 34 },
  { id: 5, title: "Open Air Day", org: "Sunrise Collective", orgImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80", date: "Dim 22 Juin", lieu: "Bois de Vincennes", genre: "Melodic", members: 210 },
  { id: 6, title: "Underground Hangar", org: "Bunker 75", orgImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80", date: "Sam 28 Juin", lieu: "Pantin", genre: "Hard Techno", members: 175 },
];

const col1 = [soirees[0], soirees[3]];
const col2 = [soirees[1], soirees[4]];
const col3 = [soirees[2], soirees[5]];

export default function AvisPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Soiree | null>(null);
  const [joined, setJoined] = useState<Soiree | null>(null);

  const dockItems = [
    { icon: Home, label: "Home", onClick: () => router.push("/?skip=1") },
    { icon: PartyPopper, label: "Soirées", onClick: () => router.push("/soirees") },
    { icon: MapPin, label: "Lieux" },
    { icon: User, label: "Rejoindre", onClick: () => router.push("/avis") },
    { icon: Mail, label: "Contact" },
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-white to-zinc-100 text-zinc-900 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 pt-14 text-center">
        <span className="text-xs text-zinc-400 font-mono uppercase tracking-widest">rejoins le mouvement</span>
        <h1 className="text-3xl font-semibold mt-3">Des soirées proposées près de chez toi</h1>
        <p className="text-xs text-zinc-400 mt-2 font-mono">clique sur une carte pour rejoindre via l'organisation</p>
      </div>

      <div className="flex justify-center gap-5 mt-10 px-6 h-[62vh] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
        <SoireeColumn soirees={col1} onJoin={setSelected} startSpeed={26} endSpeed={0.4} className="h-full" />
        <SoireeColumn soirees={col2} onJoin={setSelected} startSpeed={30} endSpeed={0.5} className="h-full hidden md:block" />
        <SoireeColumn soirees={col3} onJoin={setSelected} startSpeed={22} endSpeed={0.45} className="h-full hidden lg:block" />
      </div>

      <div className="fixed bottom-6 left-0 right-0 z-50">
        <Dock items={dockItems} />
      </div>

      {/* Panneau pour rejoindre via l'organisation */}
      <AnimatePresence>
        {selected && !joined && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white rounded-3xl w-full max-w-sm p-6 mb-24 sm:mb-0"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">{selected.genre}</span>
                <button onClick={() => setSelected(null)} className="text-zinc-400 hover:text-zinc-900">
                  <X size={16} />
                </button>
              </div>
              <h2 className="text-xl font-semibold mt-1">{selected.title}</h2>
              <p className="text-xs text-zinc-500 font-mono mt-1">{selected.date} · {selected.lieu}</p>

              <div className="flex items-center gap-3 mt-5 p-3 rounded-2xl bg-zinc-50">
                <img src={selected.orgImage} alt={selected.org} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-xs text-zinc-400">organisé par</p>
                  <p className="text-sm font-medium">{selected.org}</p>
                </div>
                <span className="ml-auto text-xs text-zinc-400">{selected.members} membres</span>
              </div>

              <button
                onClick={() => setJoined(selected)}
                className="mt-5 w-full py-3 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-700 transition-colors"
              >
                Rejoindre la soirée
              </button>
            </motion.div>
          </motion.div>
        )}

        {joined && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setJoined(null); setSelected(null); }}
          >
            <motion.div
              className="bg-white rounded-3xl w-full max-w-sm p-8 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto h-12 w-12 rounded-full bg-zinc-900 text-white flex items-center justify-center">
                <Check size={22} />
              </div>
              <p className="mt-4 text-sm">
                Tu as rejoint <span className="font-semibold">{joined.title}</span> via <span className="font-semibold">{joined.org}</span> 🎉
              </p>
              <button
                onClick={() => { setJoined(null); setSelected(null); }}
                className="mt-5 text-xs text-zinc-400 hover:text-zinc-900"
              >
                fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
