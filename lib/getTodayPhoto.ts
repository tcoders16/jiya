import data from "@/data/jiyaPhotos.json";
import { todayIso } from "./date";

export type JiyaPhoto = {
  id: string;
  src: string;
  alt: string;
  date: string;
  caption: string;
};

export function allPhotos(): JiyaPhoto[] {
  return [...(data.featuredPhotos as JiyaPhoto[])];
}

export function getTodayPhoto(): JiyaPhoto | null {
  const list = allPhotos();
  if (list.length === 0) return null;

  const iso = todayIso();
  const exact = list.find((p) => p.date === iso);
  if (exact) return exact;

  const sorted = [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
  const past = sorted.find((p) => p.date <= iso);
  return past || sorted[0] || list[0];
}
