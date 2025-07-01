import { useEffect, useState } from "react";

interface TerminalTypingProps {
  text: string;
  className?: string;
  speed?: number; // ms per character
}

export default function TerminalTyping({
  text,
  className = "",
  speed = 40,
}: TerminalTypingProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    let cancelled = false;
    function type() {
      if (cancelled) return;
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
        setTimeout(type, speed);
      }
    }
    type();
    return () => {
      cancelled = true;
    };
  }, [text, speed]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}
