import { useState, useEffect, useRef, useCallback } from "react";
import { sharedGyroPermission, GYRO_EVENT } from "./use-tilt";

export interface MousePosition {
  /** Normalized -1 to +1 from viewport center */
  x: number;
  /** Normalized -1 to +1 from viewport center */
  y: number;
  /** Raw client X (pixels) */
  clientX: number;
  /** Raw client Y (pixels) */
  clientY: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
  });

  const posRef = useRef(position);
  const rafRef = useRef<number>(0);
  const isMobileRef = useRef(false);
  const baselineRef = useRef<{ beta: number; gamma: number } | null>(null);

  // Flush latest ref value to React state inside rAF
  const scheduleUpdate = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      setPosition({ ...posRef.current });
      rafRef.current = 0;
    });
  }, []);

  // Desktop: mousemove
  useEffect(() => {
    const isMobile =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    isMobileRef.current = isMobile;
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      posRef.current = {
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
        clientX: e.clientX,
        clientY: e.clientY,
      };
      scheduleUpdate();
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scheduleUpdate]);

  // Mobile: gyroscope
  useEffect(() => {
    if (!isMobileRef.current) return;

    let gyroPermission = sharedGyroPermission;

    const onPermissionChange = (e: Event) => {
      gyroPermission = (e as CustomEvent).detail as "granted" | "denied";
    };
    window.addEventListener(GYRO_EVENT, onPermissionChange);

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (gyroPermission !== "granted") return;

      const beta = e.beta ?? 0;
      const gamma = e.gamma ?? 0;

      if (!baselineRef.current) {
        baselineRef.current = { beta, gamma };
        return;
      }

      const dx = (gamma - baselineRef.current.gamma) / 45; // normalize ~±45° to ±1
      const dy = (beta - baselineRef.current.beta) / 45;

      posRef.current = {
        x: Math.max(-1, Math.min(1, dx)),
        y: Math.max(-1, Math.min(1, dy)),
        clientX: window.innerWidth / 2 + dx * (window.innerWidth / 2),
        clientY: window.innerHeight / 2 + dy * (window.innerHeight / 2),
      };
      scheduleUpdate();
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener(GYRO_EVENT, onPermissionChange);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scheduleUpdate]);

  return position;
}
