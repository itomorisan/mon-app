"use client"

import { useState, useEffect, useRef } from "react";
import { TextScramble } from "@/components/ui/text-scramble";
import { AIChatInput } from "@/components/ui/ai-chat-input";

type Step = "salut" | "question" | "chat";

export default function Home() {
  const [step, setStep] = useState<Step>("salut");
  const [scrambleDone, setScrambleDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = () => {
    if (timer.current) clearTimeout(timer.current);
    if (step === "salut") {
      setScrambleDone(false);
      setStep("question");
    } else if (step === "question") {
      setStep("chat");
    }
  };

  // auto-avance après 10s
  useEffect(() => {
    timer.current = setTimeout(() => {
      if (step === "salut") {
        setScrambleDone(false);
        setStep("question");
      } else if (step === "question") {
        setStep("chat");
      }
    }, 10000);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [step, scrambleDone]);

  const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    next();
  };

  return (
    <main
      className="min-h-screen w-full bg-white flex flex-col items-center justify-center gap-4 px-6 select-none cursor-pointer"
      style={{ touchAction: "manipulation" }}
      onClick={next}
    >
      {step === "salut" && (
        <TextScramble
          className="text-xs text-zinc-900 font-mono"
          trigger={true}
          characterSet="abcdefghijklmnopqrstuvwxyz0123456789!"
          onScrambleComplete={() => setScrambleDone(true)}
        >
          salut!
        </TextScramble>
      )}

      {step === "question" && (
        <TextScramble
          className="text-xs text-zinc-400 font-mono text-center"
          trigger={true}
          characterSet="abcdefghijklmnopqrstuvwxyzàâéèêëîïôùûüç ?-'"
          onScrambleComplete={() => setScrambleDone(true)}
        >
          tu cherches quelque chose peut-être?
        </TextScramble>
      )}

      {step === "chat" && (
        <div
          className="w-full flex flex-col items-center gap-3"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <p className="text-xs text-zinc-400 font-mono text-center">
            Dis moi ce que tu cherches c'est très très trèssssss important
          </p>
          <AIChatInput />
        </div>
      )}
    </main>
  );
}
