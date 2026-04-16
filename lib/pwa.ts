export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const mq = window.matchMedia?.("(display-mode: standalone)").matches;
  const ios = (window.navigator as any).standalone === true;
  return !!(mq || ios);
}

export function isIOS(): boolean {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
}

export async function registerServiceWorker() {
  if (
    typeof window === "undefined" ||
    !("serviceWorker" in navigator) ||
    process.env.NODE_ENV !== "production"
  )
    return;
  try {
    await navigator.serviceWorker.register("/sw.js");
  } catch {
    // ignore
  }
}
