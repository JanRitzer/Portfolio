import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechStackMarquee } from "@/components/TechStackMarquee";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notifyGyroPermission } from "@/hooks/use-tilt";

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
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main>
        <Hero />
        <TechStackMarquee />
        <ProjectShowcase />
        <Skills />
        <Experience />
        <About />
        <Contact />
      </main>

      <Footer />
      <GyroPermissionBanner />
    </div>
  );
}
