import { useState, useRef, useEffect, useCallback } from "react";

interface TiltState {
  x: number;
  y: number;
}

interface UseTiltOptions {
  maxDeg?: number;
  perspective?: number;
}

// Shared module-level permission state so all hook instances stay in sync
export let sharedGyroPermission: "granted" | "denied" | "prompt" = "prompt";
export const GYRO_EVENT = "gyro-permission-changed";

/** Call this after DeviceOrientationEvent.requestPermission() resolves */
export function notifyGyroPermission(result: "granted" | "denied") {
  sharedGyroPermission = result;
  window.dispatchEvent(new CustomEvent(GYRO_EVENT, { detail: result }));
}

export function useTilt({ maxDeg = 15, perspective = 600 }: UseTiltOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [gyroPermission, setGyroPermission] = useState(sharedGyroPermission);
  const [isVisible, setIsVisible] = useState(false);

  // Per-instance baseline — reset when element leaves viewport
  const baselineRef = useRef<{ beta: number; gamma: number } | null>(null);

  // Detect mobile
  useEffect(() => {
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Track visibility with IntersectionObserver
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          // Reset tilt and baseline when scrolled out of view
          baselineRef.current = null;
          setTilt({ x: 0, y: 0 });
        }
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Listen for shared permission changes from the banner (or any caller)
  useEffect(() => {
    const handler = (e: Event) => {
      const result = (e as CustomEvent).detail as "granted" | "denied";
      setGyroPermission(result);
    };
    window.addEventListener(GYRO_EVENT, handler);

    // Sync in case permission was already granted before this hook mounted
    if (sharedGyroPermission !== gyroPermission) {
      setGyroPermission(sharedGyroPermission);
    }

    return () => window.removeEventListener(GYRO_EVENT, handler);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Gyroscope orientation handler
  useEffect(() => {
    if (!isMobile || gyroPermission !== "granted") return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      // Only update tilt when element is on screen
      if (!isVisible) return;

      const beta = e.beta ?? 0;
      const gamma = e.gamma ?? 0;

      // Capture baseline from the user's current holding position
      if (!baselineRef.current) {
        baselineRef.current = { beta, gamma };
        return;
      }

      // Tilt = deviation from baseline
      const deltaBeta = beta - baselineRef.current.beta;
      const deltaGamma = gamma - baselineRef.current.gamma;

      const normalizedX = Math.max(-maxDeg, Math.min(maxDeg, deltaBeta * 0.8));
      const normalizedY = Math.max(-maxDeg, Math.min(maxDeg, deltaGamma * 0.8));

      setTilt({ x: -normalizedX, y: normalizedY });
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [isMobile, gyroPermission, maxDeg, isVisible]);

  // Auto-grant on Android (no prompt needed), iOS needs user gesture via banner
  useEffect(() => {
    if (!isMobile) return;

    const DeviceOrientationEvt = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<"granted" | "denied">;
    };

    if (typeof DeviceOrientationEvt.requestPermission !== "function") {
      // Android — permission not required
      notifyGyroPermission("granted");
    }
  }, [isMobile]);

  // Mouse handlers for desktop
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || isMobile) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      setTilt({
        x: ((y - centerY) / centerY) * -maxDeg,
        y: ((x - centerX) / centerX) * maxDeg,
      });
    },
    [isMobile, maxDeg],
  );

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setTilt({ x: 0, y: 0 });
    }
  }, [isMobile]);

  const style: React.CSSProperties = {
    transform: `perspective(${perspective}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
    transition: isMobile ? "transform 0.1s ease-out" : "transform 0.15s ease-out",
  };

  return {
    ref,
    style,
    handleMouseMove,
    handleMouseLeave,
    isMobile,
    gyroPermission,
  };
}
