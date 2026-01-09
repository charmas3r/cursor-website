interface UmamiTracker {
  track: (event: string, properties?: Record<string, string | number | boolean>) => void;
}

declare global {
  interface Window {
    umami?: UmamiTracker;
  }
  const umami: UmamiTracker;
}

export {};





