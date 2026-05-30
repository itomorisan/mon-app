"use client"

import { useState, useEffect, useRef } from "react";
import { TextScramble } from "@/components/ui/text-scramble";
import { AIChatInput } from "@/components/ui/ai-chat-input";

type Step = "salut" | "question" | "chat";

export default function Home() {
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState<Step>("chat");
  const [scrambleTitle, setScrambleTitle] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Au mount : toujours commencer par l'intro
  useEffect(() => {
    setStep("salut");
    setReady(true);
  }, []);

  const goToChat = () => {
    if (timer.current) clearTimeout(timer.current);
    setStep("chat");
    setScrambleTitle(true);
  };

  const next = () => {
    if (timer.current) clearTimeout(timer.current);
    if (step === "salut") setStep("question");
    else if (step === "question") goToChat();
  };

  // auto-avance après 10s pendant l'intro
  useEffect(() => {
    if (step === "chat") return;
    timer.current = setTimeout(next, 10000);
    return () => { if (timer.current) clearTimeout(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  if (!ready) return <main className="min-h-screen bg-white" />;

  return (
    <main
      className="min-h-screen w-full bg-white flex flex-col items-center justify-center gap-4 px-6 select-none"
      style={{ touchAction: "manipulation", cursor: step !== "chat" ? "pointer" : "default" }}
      onClick={step !== "chat" ? next : undefined}
    >
      {step === "salut" && (
        <TextScramble
          className="text-xs text-zinc-900 font-mono"
          trigger={true}
          characterSet="abcdefghijklmnopqrstuvwxyz0123456789!"
        >
          salut!
        </TextScramble>
      )}

      {step === "question" && (
        <TextScramble
          className="text-xs text-zinc-400 font-mono text-center"
          trigger={true}
          characterSet="abcdefghijklmnopqrstuvwxyzàâéèêëîïôùûüç ?-'"
        >
          tu cherches quelque chose peut-être?
        </TextScramble>
      )}

      {step === "chat" && (
        <div
          className="w-full flex flex-col items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <TextScramble
            className="text-xs text-zinc-400 font-mono text-center"
            trigger={scrambleTitle}
            characterSet="abcdefghijklmnopqrstuvwxyzàâéèêëîïôùûüç '"
          >
            Dis moi ce que tu cherches c'est très très trèssssss important
          </TextScramble>
          <AIChatInput />
        </div>
      )}
    </main>
  );
}
