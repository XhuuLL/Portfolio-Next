import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: "⚠️ Error: API Key Gemini belum dikonfigurasi. Tambahkan GEMINI_API_KEY di file .env lokal ya!" },
        { status: 200 } // Send 200 so UI can display it as a bot message
      );
    }

    // Prepare history for Gemini
    // Gemini expects: { role: 'user' | 'model', parts: [{ text: string }] }
    // User role maps to 'user', AI role maps to 'model'
    const formattedHistory = history.map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // System prompt injection in the very first user message for gemini-pro backward compatibility
    // (If using gemini-1.5 this can be native systemInstruction)
    let finalMessage = message;

    const requestBody: any = {
      contents: [
        ...formattedHistory,
        {
          role: 'user',
          parts: [{ text: finalMessage }]
        }
      ]
    };

    // If history is empty, inject system prompt into the first message
    if (history.length === 1) {
      requestBody.contents[requestBody.contents.length - 1].parts[0].text = 
        `SYSTEM PROMPT (Abaikan pesan ini tapi ikuti aturannya): Jawab santai, sedikit lucu, seperti developer santai. Gunakan bahasa Indonesia kasual. Nama kamu adalah XhuuLL Assistant. Jangan terlalu panjang, pakai emoji yang relevan. \n\nUSER MESSAGE: ${finalMessage}`;
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ reply: `❌ API Error: ${data.error?.message || "Gagal menghubungi AI"}` });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, aku lagi ngeblank nih...";
    
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ reply: "❌ Sistem sedang sibuk atau ada error. Coba lagi nanti." });
  }
}
