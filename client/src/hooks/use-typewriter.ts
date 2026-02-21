import { useState, useEffect, useRef, useCallback } from "react";

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  startDelay?: number;
  onComplete?: () => void;
  enabled?: boolean;
}

interface UseTypewriterReturn {
  displayText: string;
  isTyping: boolean;
  isComplete: boolean;
}

export function useTypewriter({
  text,
  speed = 60,
  startDelay = 0,
  onComplete,
  enabled = true,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    indexRef.current = 0;
    setDisplayText("");
    setIsTyping(false);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    reset();

    if (!enabled || !text) return;

    const startTyping = () => {
      setIsTyping(true);

      const typeNext = () => {
        if (indexRef.current < text.length) {
          indexRef.current++;
          setDisplayText(text.slice(0, indexRef.current));
          timerRef.current = setTimeout(typeNext, speed);
        } else {
          setIsTyping(false);
          setIsComplete(true);
          onCompleteRef.current?.();
        }
      };

      typeNext();
    };

    timerRef.current = setTimeout(startTyping, startDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, speed, startDelay, enabled, reset]);

  return { displayText, isTyping, isComplete };
}
