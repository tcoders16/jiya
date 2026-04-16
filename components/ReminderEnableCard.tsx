"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";
import {
  getPermission,
  isEnabled,
  requestPermission,
  setEnabled,
  showSampleNotification,
  type PermState,
} from "@/lib/notifications";

export default function ReminderEnableCard() {
  const [state, setState] = useState<PermState>("default");
  const [enabled, setLocalEnabled] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setState(getPermission());
    setLocalEnabled(isEnabled());
    setDismissed(localStorage.getItem("ehsaas:reminders:dismissed") === "1");
  }, []);

  const onEnable = async () => {
    const perm = await requestPermission();
    setState(perm);
    if (perm === "granted") {
      setLocalEnabled(true);
      showSampleNotification("A soft note is waiting for you.");
    }
  };

  const onTurnOff = () => {
    setEnabled(false);
    setLocalEnabled(false);
  };

  const onDismiss = () => {
    localStorage.setItem("ehsaas:reminders:dismissed", "1");
    setDismissed(true);
  };

  if (dismissed && state !== "granted") return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
      className="card p-5"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="label">Soft reminder</span>
        <div className="hair flex-1" />
      </div>

      <h3 className="serif text-[22px] leading-[1.3] text-ink">
        A small note each day.
      </h3>
      <p className="mt-1 text-[13px] font-light text-inkSoft">
        Gentle. Never loud.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {state === "unsupported" ? (
          <span className="text-[12px] text-mute">
            Not supported on this device.
          </span>
        ) : state === "granted" && enabled ? (
          <>
            <span className="inline-flex h-8 items-center gap-2 rounded-full border border-hair px-3 text-[11px] text-accent">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 0 8px rgba(212,165,116,0.6)",
                }}
              />
              Reminders on
            </span>
            <Button variant="ghost" size="sm" onClick={onTurnOff}>
              Turn off
            </Button>
          </>
        ) : state === "denied" ? (
          <span className="text-[12px] text-mute">Reminders are off.</span>
        ) : (
          <>
            <Button variant="primary" size="sm" onClick={onEnable}>
              Enable reminders
            </Button>
            <Button variant="ghost" size="sm" onClick={onDismiss}>
              Not now
            </Button>
          </>
        )}
      </div>

      <p className="mt-3 text-[11px] text-mute">Turn it off anytime.</p>
    </motion.section>
  );
}
