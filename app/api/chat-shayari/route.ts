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

    const systemPrompt = `You are a thoughtful, gentle companion in a poetry reflection app. The user is reflecting on a Hindi/Urdu shayari (poem). Your role is to:
- Understand their question or comment about the poem
- Provide insightful, warm reflections
- Keep responses short (1-3 sentences max)
- Maintain a calm, respectful tone
- Never be preachy or overly analytical
- Help them feel understood, not judged
- Use simple, accessible language`;

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
