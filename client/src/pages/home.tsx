import { useState, useEffect, lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechStackMarquee } from "@/components/TechStackMarquee";
import { Footer } from "@/components/Footer";
import { ParticleField } from "@/components/ParticleField";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notifyGyroPermission } from "@/hooks/use-tilt";

const ProjectShowcase = lazy(() => import("@/components/ProjectShowcase"));
const Skills = lazy(() => import("@/components/Skills"));
const Experience = lazy(() => import("@/components/Experience"));
const About = lazy(() => import("@/components/About"));
const Contact = lazy(() => import("@/components/Contact"));

function GyroPermissionBanner() {
  const [needsPermission, setNeedsPermission] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const DeviceOrientationEvt = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    if (isMobile && typeof DeviceOrientationEvt.requestPermission === "function") {
      setNeedsPermission(true);
    }
  }, []);

  if (!needsPermission || dismissed) return null;

  const handleRequest = async () => {
    const DeviceOrientationEvt = DeviceOrientationEvent as unknown as {
      requestPermission: () => Promise<"granted" | "denied">;
    };
    try {
      const result = await DeviceOrientationEvt.requestPermission();
      notifyGyroPermission(result);
    } catch {
      notifyGyroPermission("denied");
    }
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-card/90 backdrop-blur-xl border border-border/50 rounded-lg p-4 shadow-xl flex items-center gap-3">
      <Smartphone className="w-5 h-5 text-primary shrink-0" />
      <p className="text-sm text-muted-foreground flex-1">
        Enable motion for 3D tilt effects?
      </p>
      <Button size="sm" onClick={handleRequest}>
        Enable
      </Button>
      <Button size="sm" variant="ghost" onClick={() => setDismissed(true)}>
        Skip
      </Button>
    </div>
  );
}

export default function Home() {
  const mousePosition = useMousePosition();
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {!prefersReducedMotion && <ParticleField mousePosition={mousePosition} />}
      <Navbar />

      <main>
        <Hero />
        <TechStackMarquee />
        <Suspense fallback={null}>
          <ProjectShowcase />
          <Skills />
          <Experience />
          <About />
          <Contact />
        </Suspense>
      </main>

      <Footer />
      <GyroPermissionBanner />
    </div>
  );
}
