"use client"

import { useRef, useState } from "react";
import { Send } from "lucide-react";

export function AIChatInput() {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="w-full max-w-sm flex items-center gap-2 px-4 bg-white rounded-full"
      style={{ height: 52, boxShadow: "0 2px 12px rgba(0,0,0,0.10)" }}
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 bg-transparent text-sm text-zinc-900 outline-none border-none"
      />
      <button
        type="button"
        className="flex items-center justify-center bg-black text-white rounded-full p-2 hover:bg-zinc-700 transition-colors"
      >
        <Send size={15} />
      </button>
    </div>
  );
}
