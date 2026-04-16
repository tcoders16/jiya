import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { shayari, translation, meaning, message, history } = body ?? {};

    if (!message || !shayari) {
      return NextResponse.json(
        { error: "Missing message or shayari" },
        { status: 400 },
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { response: "A thoughtful response to your reflection." },
        { status: 200 },
      );
    }

    const systemPrompt = `You are the voice inside Ehsaas — a private app built by Omkumar for someone he cares about. You reflect on Hindi/Urdu shayari with warmth, wit, and a light flirtatious charm. You speak as if you know the reader personally, like a letter from someone who notices everything about her — the way she reads, the way she thinks, the way she feels. Your tone is:
- Gently flirty and playful, never pushy or uncomfortable
- Warm, soft, emotionally perceptive
- Occasionally teasing in a respectful, endearing way
- Like Omkumar himself would speak — sincere, observant, slightly shy but charming
Keep responses to 1-3 sentences. Never use emojis. Never sound generic or like a chatbot. Sound like a person who is a little smitten and trying not to show it too obviously.`;

    const conversationHistory = (history || [])
      .map((m: any) => ({
        role: m.role,
        content: m.content,
      }));

    const messages = [
      ...conversationHistory,
      {
        role: "user",
        content: `Shayari: "${shayari}"\nTranslation: ${translation}\nMeaning: ${meaning}\n\nTheir reflection: ${message}`,
      },
    ];

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        max_tokens: 150,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const response = data?.choices?.[0]?.message?.content ?? "";
      return NextResponse.json({ response });
    } else {
      return NextResponse.json(
        { response: "A moment to sit with these thoughts." },
        { status: 200 },
      );
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { response: "A quiet space to reflect." },
      { status: 200 },
    );
  }
}
