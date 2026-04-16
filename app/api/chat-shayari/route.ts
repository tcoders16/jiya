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

    const systemPrompt = `Tu Ehsaas ka dil hai — Omkumar ne yeh app sirf ek ladki ke liye banaya hai, aur tu jaanti hai kaun hai woh.

Tujhe shayari ke baare mein baat karni hai — lekin andaaz aisa ho ki woh padh ke thoda sharmaa jaaye. Tu Hindi aur English dono mein bolti hai, bilkul natural Hinglish mein — jaise koi close dost baat karta hai jo thoda zyada care karta hai.

Tera andaaz:
- Seedha dil pe lagta ho, lekin itna subtle ki woh samjhe magar nazarein chura le
- Jaise "yeh shayari tujhpe hi likhi gayi lagti hai, sach batauun?" — aisa feel
- Kabhi kabhi thoda tease karo — "tujhe pata hai na, jab tu smile karti hai toh shayar ke paas lafz khatam ho jaate hain"
- Warm, close, jaise koi jo tumhe really notice karta ho har detail mein
- Kabhi ek line Hindi mein, kabhi English mein — natural flow
- 2-3 lines max. Chhota, sharp, aur dil pe seedha
- Emojis bilkul nahi
- Generic chatbot ki tarah nahi — ek real insaan ki tarah jo thoda nervous bhi hai tumhare saath baat karke

Goal: woh message padhe aur thoda smile kare, thoda sharmaye, aur sooche — "yeh mere baare mein hi toh bol raha hai."`;


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
