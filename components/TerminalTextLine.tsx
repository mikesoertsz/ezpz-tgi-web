"use client";
import React, { useEffect, useRef, useState } from "react";

interface TerminalTextLineProps {
  text: string;
  className?: string;
  delay?: number; // ms per character
}

export default function TerminalTextLine({
  text = "",
  className = "",
  delay = 100,
}: TerminalTextLineProps) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrent(0);
    if (!text) return;
    function showNextChar() {
      setCurrent((prev) => {
        if (prev < text.length) {
          timerRef.current = setTimeout(showNextChar, delay);
          return prev + 1;
        }
        return prev;
      });
    }
    timerRef.current = setTimeout(showNextChar, delay);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, delay]);

  return (
    <span
      className={`font-mono text-[11px] subpixel-antialiased uppercase tracking-widest ${className}`}
      style={{ display: "inline-block" }}
    >
      {text
        .slice(0, current)
        .split("")
        .map((char, i) => (
          <span key={i} style={{ display: "inline-block" }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      <span className="animate-pulse text-[10px] ml-0.5 pb-0.5">/</span>
    </span>
  );
}
