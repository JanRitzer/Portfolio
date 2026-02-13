import { useState, useRef, useEffect, useCallback } from "react";

interface TiltState {
  x: number;
  y: number;
}

interface UseTiltOptions {
  maxDeg?: number;
  perspective?: number;
}

export function useTilt({ maxDeg = 15, perspective = 600 }: UseTiltOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [gyroPermission, setGyroPermission] = useState<"granted" | "denied" | "prompt">("prompt");

  // Detect mobile
  useEffect(() => {
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Gyroscope orientation handler
  useEffect(() => {
    if (!isMobile || gyroPermission !== "granted") return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const beta = e.beta ?? 0;   // front-back tilt (-180 to 180)
      const gamma = e.gamma ?? 0; // left-right tilt (-90 to 90)

      // Normalize: assume phone held upright (~45deg beta as neutral)
      const normalizedX = Math.max(-maxDeg, Math.min(maxDeg, (beta - 45) * 0.3));
      const normalizedY = Math.max(-maxDeg, Math.min(maxDeg, gamma * 0.3));

      setTilt({ x: -normalizedX, y: normalizedY });
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [isMobile, gyroPermission, maxDeg]);

  // Request gyroscope permission (iOS requires explicit permission)
  const requestGyroPermission = useCallback(async () => {
    const DeviceOrientationEvt = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<"granted" | "denied">;
    };

    if (typeof DeviceOrientationEvt.requestPermission === "function") {
      try {
        const result = await DeviceOrientationEvt.requestPermission();
        setGyroPermission(result);
      } catch {
        setGyroPermission("denied");
      }
    } else {
      // Android or desktop — no permission needed
      setGyroPermission("granted");
    }
  }, []);

  // Auto-request on Android (no prompt needed), iOS needs user gesture
  useEffect(() => {
    if (!isMobile) return;

    const DeviceOrientationEvt = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<"granted" | "denied">;
    };

    if (typeof DeviceOrientationEvt.requestPermission !== "function") {
      // Android — permission not required
      setGyroPermission("granted");
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
    requestGyroPermission,
  };
}
