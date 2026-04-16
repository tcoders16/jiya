"use client";
import type { PermState } from "@/lib/notifications";

export default function NotificationStatusPill({ state }: { state: PermState }) {
  const map: Record<PermState, { label: string; dotVar: string }> = {
    granted: { label: "On", dotVar: "var(--accent)" },
    denied: { label: "Off", dotVar: "var(--mute)" },
    default: { label: "Not set", dotVar: "var(--mute)" },
    unsupported: { label: "Unsupported", dotVar: "var(--mute)" },
  };
  const { label, dotVar } = map[state];
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-hair px-2.5 py-1 text-[10px] uppercase tracking-widest2 text-mute">
      <span className="h-1 w-1 rounded-full" style={{ background: dotVar }} />
      {label}
    </span>
  );
}
