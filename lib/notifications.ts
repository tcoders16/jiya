import templates from "@/data/notificationTemplates.json";

const PREF_KEY = "ehsaas:reminders:enabled";
const LAST_SHOWN_KEY = "ehsaas:reminders:lastShown";

export type PermState = NotificationPermission | "unsupported";

export function isSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window;
}

export function getPermission(): PermState {
  if (!isSupported()) return "unsupported";
  return Notification.permission;
}

export async function requestPermission(): Promise<PermState> {
  if (!isSupported()) return "unsupported";
  try {
    const perm = await Notification.requestPermission();
    if (perm === "granted") setEnabled(true);
    return perm;
  } catch {
    return "default";
  }
}

export function setEnabled(enabled: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PREF_KEY, enabled ? "1" : "0");
}

export function isEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(PREF_KEY) === "1";
}

export function randomTemplate(): string {
  const list = templates.templates as string[];
  return list[Math.floor(Math.random() * list.length)] || list[0];
}

export function showSampleNotification(body?: string) {
  if (!isSupported() || Notification.permission !== "granted") return;
  try {
    new Notification("Ehsaas", {
      body: body || randomTemplate(),
      silent: true,
      icon: "/icons/icon-192.png",
    });
    localStorage.setItem(LAST_SHOWN_KEY, new Date().toISOString());
  } catch {
    // ignore
  }
}
