"use client";
import React, { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Users } from "lucide-react";

export interface Soiree {
  id: number;
  title: string;
  org: string;
  orgImage: string;
  date: string;
  lieu: string;
  genre: string;
  members: number;
}

export function SoireeColumn(props: {
  soirees: Soiree[];
  onJoin: (s: Soiree) => void;
  className?: string;
  duration?: number; // durée d'une boucle stabilisée (lente = lisible)
}) {
  const controls = useAnimationControls();
  const slow = props.duration ?? 22;

  useEffect(() => {
    let active = true;
    (async () => {
      // 1) balayage rapide au départ (décélère)
      await controls.start({
        y: "-50%",
        transition: { duration: 2.2, ease: "easeOut" },
      });
      if (!active) return;
      // 2) boucle lente et stable pour laisser lire
      controls.set({ y: "0%" });
      controls.start({
        y: "-50%",
        transition: { duration: slow, ease: "linear", repeat: Infinity },
      });
    })();
    return () => {
      active = false;
      controls.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`overflow-hidden ${props.className ?? ""}`}>
      <motion.div
        animate={controls}
        initial={{ y: "0%" }}
        onHoverStart={() => controls.stop()}
        onHoverEnd={() =>
          controls.start({
            y: "-50%",
            transition: { duration: slow, ease: "linear", repeat: Infinity },
          })
        }
        className="flex flex-col gap-4"
      >
        {[...props.soirees, ...props.soirees].map((s, i) => (
          <button
            key={i}
            onClick={() => props.onJoin(s)}
            className="group text-left p-5 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-lg hover:border-zinc-900 transition-all w-72"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">{s.genre}</span>
              <span className="text-[10px] font-mono text-zinc-400">{s.date}</span>
            </div>
            <p className="text-base font-semibold text-zinc-900 mt-2">{s.title}</p>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">{s.lieu}</p>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <img src={s.orgImage} alt={s.org} className="h-7 w-7 rounded-full object-cover" />
                <span className="text-xs text-zinc-600">{s.org}</span>
              </div>
              <span className="flex items-center gap-1 text-[10px] text-zinc-400">
                <Users size={11} /> {s.members}
              </span>
            </div>

            <div className="mt-4 text-center text-xs font-medium rounded-full py-2 bg-zinc-900 text-white group-hover:bg-zinc-700 transition-colors">
              Rejoindre
            </div>
          </button>
        ))}
      </motion.div>
    </div>
  );
}
