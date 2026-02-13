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
let sharedGyroPermission: "granted" | "denied" | "prompt" = "prompt";
const GYRO_EVENT = "gyro-permission-changed";

// Shared baseline orientation — captured from the first readings after permission is granted
let baselineBeta: number | null = null;
let baselineGamma: number | null = null;

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

  // Detect mobile
  useEffect(() => {
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
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
      const beta = e.beta ?? 0;   // front-back tilt (-180 to 180)
      const gamma = e.gamma ?? 0; // left-right tilt (-90 to 90)

      // Capture baseline from the user's natural holding position
      if (baselineBeta === null || baselineGamma === null) {
        baselineBeta = beta;
        baselineGamma = gamma;
        return;
      }

      // Tilt = deviation from baseline
      const deltaBeta = beta - baselineBeta;
      const deltaGamma = gamma - baselineGamma;

      const normalizedX = Math.max(-maxDeg, Math.min(maxDeg, deltaBeta * 0.8));
      const normalizedY = Math.max(-maxDeg, Math.min(maxDeg, deltaGamma * 0.8));

      setTilt({ x: -normalizedX, y: normalizedY });
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [isMobile, gyroPermission, maxDeg]);

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
