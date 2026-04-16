"use client";
import { useEffect, useMemo, useState } from "react";
import TodayHeader from "@/components/TodayHeader";
import JiyaPhotoBlock from "@/components/JiyaPhotoBlock";
import OriginalPoemCard from "@/components/OriginalPoemCard";
import MeaningCard from "@/components/MeaningCard";
import ForHerCard from "@/components/ForHerCard";
import ReminderEnableCard from "@/components/ReminderEnableCard";
import BottomActionRow from "@/components/BottomActionRow";
import InstallPromptCard from "@/components/InstallPromptCard";
import { getTodayPoem } from "@/lib/poem-store";
import { getTodayPhoto } from "@/lib/getTodayPhoto";
import { prettyDate, softGreeting } from "@/lib/date";

type Layer = {
  title: string;
  meaning: string;
  forHer: string;
  notificationText: string;
};

export default function Home() {
  const poem = useMemo(() => getTodayPoem(), []);
  const photo = useMemo(() => getTodayPhoto(), []);
  const greeting = useMemo(() => softGreeting(), []);
  const [layer, setLayer] = useState<Layer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const cacheKey = `ehsaas:layer:${poem.id}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        setLayer(JSON.parse(cached));
        setLoading(false);
        return;
      } catch {}
    }
    (async () => {
      try {
        const res = await fetch("/api/analyze-poem", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            poemTitle: poem.title,
            originalPoem: poem.originalPoem,
            contextHint: poem.contextHint,
            manualNotes: poem.manualNotes,
          }),
        });
        if (!res.ok) throw new Error("bad");
        const data = (await res.json()) as Layer;
        if (!cancelled) {
          setLayer(data);
          sessionStorage.setItem(cacheKey, JSON.stringify(data));
        }
      } catch {
        if (!cancelled) {
          setLayer({
            title: poem.title,
            meaning:
              "A quiet feeling, held gently in a few words — meant to be felt more than explained.",
            forHer: "You are the soft part of my day that never really leaves.",
            notificationText: "A quiet line for today.",
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [poem]);

  return (
    <div className="flex flex-col gap-7">
      <TodayHeader greeting={greeting} date={prettyDate(poem.date)} />
      <JiyaPhotoBlock photo={photo} />
      <OriginalPoemCard title={poem.title} poem={poem.originalPoem} />
      <MeaningCard title={layer?.title} meaning={layer?.meaning} loading={loading} />
      <ForHerCard line={layer?.forHer} loading={loading} />
      <ReminderEnableCard />
      <InstallPromptCard />
      <BottomActionRow />
    </div>
  );
}
