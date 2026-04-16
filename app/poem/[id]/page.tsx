"use client";
import { useEffect, useMemo, useState } from "react";
import { notFound, useParams } from "next/navigation";
import NavBar from "@/components/NavBar";
import OriginalPoemCard from "@/components/OriginalPoemCard";
import MeaningCard from "@/components/MeaningCard";
import ForHerCard from "@/components/ForHerCard";
import { allPoems, getPoemById } from "@/lib/poem-store";
import { prettyDate } from "@/lib/date";

type Layer = {
  title: string;
  meaning: string;
  forHer: string;
  notificationText: string;
};

export default function PoemDetailPage() {
  const params = useParams<{ id: string }>();
  const poem = useMemo(() => getPoemById(params.id), [params.id]);
  const [layer, setLayer] = useState<Layer | null>(null);
  const [loading, setLoading] = useState(true);

  // next poem (older in archive)
  const nextId = useMemo(() => {
    if (!poem) return null;
    const list = allPoems();
    const idx = list.findIndex((p) => p.id === poem.id);
    return idx >= 0 && idx < list.length - 1 ? list[idx + 1].id : null;
  }, [poem]);

  useEffect(() => {
    if (!poem) return;
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
    setLoading(true);
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
        const data = (await res.json()) as Layer;
        if (!cancelled) {
          setLayer(data);
          sessionStorage.setItem(cacheKey, JSON.stringify(data));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [poem]);

  if (!poem) return notFound();

  return (
    <div className="flex flex-col gap-7">
      <NavBar
        label={prettyDate(poem.date)}
        title={poem.title}
        backHref="/archive"
        rightHref={nextId ? `/poem/${nextId}` : undefined}
        rightLabel={nextId ? "Older" : undefined}
      />
      <OriginalPoemCard title={poem.title} poem={poem.originalPoem} />
      <MeaningCard title={layer?.title} meaning={layer?.meaning} loading={loading} />
      <ForHerCard line={layer?.forHer} loading={loading} />
      {layer?.notificationText ? (
        <div className="px-1">
          <div className="mb-2 flex items-center gap-3">
            <span className="label">Notification preview</span>
            <div className="hair flex-1" />
          </div>
          <div className="serif-italic text-[15px] text-ink/90">
            {layer.notificationText}
          </div>
        </div>
      ) : null}
    </div>
  );
}
