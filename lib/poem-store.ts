import poems from "@/data/poems.json";
import { dayOfYear, todayIso } from "./date";

export type PoemEntry = {
  id: string;
  date: string;
  title: string;
  originalPoem: string;
  tags: string[];
  contextHint: string;
  manualNotes?: string;
};

export function allPoems(): PoemEntry[] {
  return [...(poems as PoemEntry[])].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
}

export function getTodayPoem(): PoemEntry {
  const list = poems as PoemEntry[];
  const iso = todayIso();
  const exact = list.find((p) => p.date === iso);
  if (exact) return exact;
  const idx = dayOfYear() % list.length;
  return list[idx];
}

export function getPoemById(id: string): PoemEntry | undefined {
  return (poems as PoemEntry[]).find((p) => p.id === id);
}
