import { SYSTEM_PROMPT, DEVELOPER_PROMPT, buildUserPrompt } from "./prompt";

export type GeneratedLayer = {
  title: string;
  meaning: string;
  forHer: string;
  notificationText: string;
};

type AnalyzeInput = {
  poemTitle: string;
  originalPoem: string;
  contextHint?: string;
  manualNotes?: string;
};

export async function analyzePoem(
  input: AnalyzeInput,
): Promise<GeneratedLayer> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          max_tokens: 600,
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            {
              role: "user",
              content: `${DEVELOPER_PROMPT}\n\n${buildUserPrompt(input)}`,
            },
          ],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const text = data?.choices?.[0]?.message?.content ?? "";
        const parsed = safeJson(text);
        if (parsed) return normalize(parsed);
      }
    } catch {
      // fall through to local
    }
  }

  return localFallback(input);
}

function safeJson(text: string): Partial<GeneratedLayer> | null {
  if (!text) return null;
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

function normalize(p: Partial<GeneratedLayer>): GeneratedLayer {
  return {
    title: (p.title || "A Quiet Note").toString().slice(0, 60),
    meaning: (p.meaning || "").toString(),
    forHer: (p.forHer || "").toString(),
    notificationText: (p.notificationText || "Today's poem is waiting.")
      .toString()
      .slice(0, 80),
  };
}

function localFallback(input: AnalyzeInput): GeneratedLayer {
  const t = input.poemTitle || "Today";
  const ctx = (input.contextHint || "calm").toLowerCase();
  const toneMap: Record<string, string> = {
    morning: "a soft, hopeful beginning",
    evening: "a quiet, reflective warmth",
    rainy: "a gentle, thoughtful ache",
    calm: "a still, settled feeling",
    missing: "a warm remembrance",
    birthday: "a tender celebration",
    gentle: "a calm, tender softness",
  };
  const tone = toneMap[ctx] || "a quiet softness";

  return {
    title: shortTitle(t),
    meaning: `This poem carries ${tone}. It speaks about what is felt more than what is said, and values the kind of presence that stays with the heart.`,
    forHer:
      "You are the kind of quiet that feels like home — soft, steady, and always a little missed.",
    notificationText: "A quiet line for today.",
  };
}

function shortTitle(t: string): string {
  const words = t.split(/\s+/).slice(0, 4).join(" ");
  return words || "A Quiet Note";
}
