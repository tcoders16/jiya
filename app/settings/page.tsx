"use client";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import NotificationStatusPill from "@/components/NotificationStatusPill";
import ReminderEnableCard from "@/components/ReminderEnableCard";
import AddToHomeScreen from "@/components/AddToHomeScreen";
import { getPermission, type PermState } from "@/lib/notifications";
import { isStandalone } from "@/lib/pwa";

export default function SettingsPage() {
  const [installed, setInstalled] = useState(false);
  const [state, setState] = useState<PermState>("default");

  useEffect(() => {
    setInstalled(isStandalone());
    setState(getPermission());
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <NavBar
        label="Quiet controls"
        title="Settings"
        backHref="/"
        rightHref="/archive"
        rightLabel="Archive"
      />

      <AddToHomeScreen />

      <section className="px-1">
        <div className="mb-3 flex items-center gap-3">
          <span className="label">Reminders</span>
          <div className="hair flex-1" />
          <NotificationStatusPill state={state} />
        </div>
        <ReminderEnableCard />
      </section>

      <section className="px-1">
        <div className="mb-2 flex items-center gap-3">
          <span className="label">About</span>
          <div className="hair flex-1" />
        </div>
        <p className="serif-italic text-[18px] leading-[1.5] text-ink/90">
          A small, quiet place — one poem a day, read with care.
        </p>
      </section>
    </div>
  );
}
