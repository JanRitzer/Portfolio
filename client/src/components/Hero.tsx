import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { useTypewriter } from "@/hooks/use-typewriter";

type Phase = "typing-line1" | "typing-line2" | "revealing" | "complete";

export function Hero() {
  const { t, language } = useLanguage();
  const mousePosition = useMousePosition();

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [phase, setPhase] = useState<Phase>(
    prefersReducedMotion ? "complete" : "typing-line1",
  );

  // Reset on language switch
  const prevLangRef = useRef(language);
  useEffect(() => {
    if (prevLangRef.current !== language) {
      prevLangRef.current = language;
      if (!prefersReducedMotion) {
        setPhase("typing-line1");
      }
    }
  }, [language, prefersReducedMotion]);

  // Compose line1 text: "Hi, I'm Jan" / "Hi, ich bin Jan"
  const greeting = t("hero.greeting");
  const name = t("hero.name");
  const line1 = `${greeting} ${name}`;

  // Compose line2 text: "Full Stack Software Engineer"
  const title = t("hero.title");
  const subtitle = t("hero.subtitle");
  const line2 = `${title} ${subtitle}`;

  const onLine1Complete = useCallback(() => {
    setTimeout(() => setPhase("typing-line2"), 200);
  }, []);

  const onLine2Complete = useCallback(() => {
    setPhase("revealing");
    setTimeout(() => setPhase("complete"), 600);
  }, []);

  const tw1 = useTypewriter({
    text: line1,
    speed: 60,
    startDelay: 300,
    onComplete: onLine1Complete,
    enabled: phase === "typing-line1",
  });

  const tw2 = useTypewriter({
    text: line2,
    speed: 40,
    startDelay: 0,
    onComplete: onLine2Complete,
    enabled: phase === "typing-line2",
  });

  // Determine displayed text for line1
  const line1Text = useMemo(() => {
    if (prefersReducedMotion || phase !== "typing-line1") return line1;
    return tw1.displayText;
  }, [prefersReducedMotion, phase, tw1.displayText, line1]);

  // Determine displayed text for line2
  const line2Text = useMemo(() => {
    if (prefersReducedMotion) return line2;
    if (phase === "typing-line1") return "";
    if (phase === "typing-line2") return tw2.displayText;
    return line2;
  }, [prefersReducedMotion, phase, tw2.displayText, line2]);

  // Split line1 into greeting part and name part
  const greetingLen = greeting.length;
  const line1Greeting = line1Text.slice(0, Math.min(line1Text.length, greetingLen));
  const line1Name = line1Text.length > greetingLen + 1
    ? line1Text.slice(greetingLen + 1)
    : "";

  // Split line2 into title part and subtitle part
  const titleLen = title.length;
  const line2Title = line2Text.slice(0, Math.min(line2Text.length, titleLen));
  const line2Subtitle = line2Text.length > titleLen + 1
    ? line2Text.slice(titleLen + 1)
    : "";

  const showCursorLine1 = !prefersReducedMotion && phase === "typing-line1";
  const showCursorLine2 = !prefersReducedMotion && phase === "typing-line2";

  const revealReady =
    prefersReducedMotion || phase === "revealing" || phase === "complete";
  const allComplete = prefersReducedMotion || phase === "complete";

  // --- Parallax via refs (zero re-renders) ---
  const layer0Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null);
  const smoothPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    let raf: number;
    const layers = [
      { ref: layer0Ref, mult: 5 },
      { ref: layer3Ref, mult: 10 },
      { ref: layer4Ref, mult: 15 },
    ];

    const tick = () => {
      // Exponential smoothing (lerp)
      smoothPos.current.x += (mousePosition.x - smoothPos.current.x) * 0.08;
      smoothPos.current.y += (mousePosition.y - smoothPos.current.y) * 0.08;

      for (const { ref, mult } of layers) {
        if (ref.current) {
          const tx = smoothPos.current.x * mult;
          const ty = smoothPos.current.y * mult;
          ref.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mousePosition.x, mousePosition.y, prefersReducedMotion]);

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Background: glow orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={layer0Ref}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-glow" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow"
            style={{ animationDelay: "1s" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_70%)]" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              data-testid="badge-availability"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span
                className="text-sm text-primary font-medium"
                data-testid="text-availability"
              >
                {t("hero.available")}
              </span>
            </motion.div>
          </div>

          {/* Typewriter line 1: greeting + name */}
          <div>
            <p
              className="text-muted-foreground text-lg mb-2 min-h-[1.75rem]"
              data-testid="text-greeting"
              aria-label={greeting}
            >
              {line1Greeting}
              {showCursorLine1 && line1Text.length <= greetingLen && (
                <span
                  className="inline-block w-[2px] h-[1.1em] bg-primary ml-0.5 align-text-bottom animate-cursor-blink"
                  aria-hidden="true"
                />
              )}
            </p>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 min-h-[1.15em]"
              data-testid="text-name"
              aria-label={name}
            >
              <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                {line1Name}
              </span>
              {showCursorLine1 && line1Text.length > greetingLen && (
                <span
                  className="inline-block w-[3px] h-[0.8em] bg-primary ml-1 align-text-bottom animate-cursor-blink"
                  aria-hidden="true"
                />
              )}
            </h1>

            {/* Typewriter line 2: title + subtitle */}
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 min-h-[2.5em]"
              data-testid="text-title"
              aria-label={`${title} ${subtitle}`}
            >
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {line2Title}
              </span>
              {line2Subtitle && (
                <>
                  <br />
                  <span className="text-muted-foreground">{line2Subtitle}</span>
                </>
              )}
              {showCursorLine2 && (
                <span
                  className="inline-block w-[3px] h-[0.75em] bg-primary ml-1 align-text-bottom animate-cursor-blink"
                  aria-hidden="true"
                />
              )}
            </h2>
          </div>

          {/* Description — parallax layer 3 */}
          <div ref={layer3Ref}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={revealReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10"
              data-testid="text-description"
            >
              {t("hero.description")}
            </motion.p>
          </div>

          {/* CTA + scroll indicator — parallax layer 4 */}
          <div ref={layer4Ref}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={revealReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: revealReady && !prefersReducedMotion ? 0.15 : 0 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="gap-2 px-8"
                data-testid="button-view-work"
              >
                {t("hero.viewWork")}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={allComplete ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: allComplete && !prefersReducedMotion ? 0.2 : 0 }}
              className="mt-12 flex justify-center"
              data-testid="scroll-indicator"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2"
              >
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
