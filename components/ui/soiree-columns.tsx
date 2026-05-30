"use client";
import React, { useEffect, useRef } from "react";
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
  startSpeed?: number; // px/frame au début (rapide)
  endSpeed?: number; // px/frame stabilisé (lent, lisible)
}) {
  const ref = useRef<HTMLDivElement>(null);
  const speed = useRef(props.startSpeed ?? 22);
  const pausedUntil = useRef(0);
  const hovering = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const end = props.endSpeed ?? 0.45;
    let raf = 0;

    const loop = () => {
      // décélération douce vers la vitesse stable
      speed.current += (end - speed.current) * 0.018;
      const now = performance.now();
      if (!hovering.current && now > pausedUntil.current) {
        el.scrollTop += speed.current;
        const half = el.scrollHeight / 2;
        if (el.scrollTop >= half) el.scrollTop -= half;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const pause = () => { pausedUntil.current = performance.now() + 2500; };
    el.addEventListener("wheel", pause, { passive: true });
    el.addEventListener("touchmove", pause, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("wheel", pause);
      el.removeEventListener("touchmove", pause);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
      className={`overflow-y-auto no-scrollbar ${props.className ?? ""}`}
      style={{ scrollbarWidth: "none" }}
    >
      <div className="flex flex-col gap-4 pb-4">
        {[...props.soirees, ...props.soirees].map((s, i) => (
          <button
            key={i}
            onClick={() => props.onJoin(s)}
            className="group text-left p-5 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-lg hover:border-zinc-900 transition-all max-w-xs w-full"
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
      </div>
    </div>
  );
}
