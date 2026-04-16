import { NextRequest, NextResponse } from "next/server";
import { analyzePoem } from "@/lib/llm";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { poemTitle, originalPoem, contextHint, manualNotes } = body ?? {};
    if (!originalPoem || !poemTitle) {
      return NextResponse.json(
        { error: "Missing poemTitle or originalPoem" },
        { status: 400 },
      );
    }
    const layer = await analyzePoem({
      poemTitle,
      originalPoem,
      contextHint,
      manualNotes,
    });
    return NextResponse.json(layer, {
      headers: { "cache-control": "public, max-age=3600" },
    });
  } catch (e) {
    return NextResponse.json({ error: "Unable to analyze" }, { status: 500 });
  }
}
