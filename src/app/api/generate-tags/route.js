import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request) {
    try {
        const { title, url } = await request.json();

        if (!process.env.GROQ_API_KEY) {
            return NextResponse.json(
                { error: "GROQ_API_KEY is missing" },
                { status: 500 }
            );
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful bookmark assistant. You strictly output JSON."
                },
                {
                    role: "user",
                    content: `
            Analyze this bookmark:
            Title: "${title}"
            URL: "${url}"

            Return a JSON object with:
            - "category": A single category string (Tech, Design, Cooking, News, etc).
            - "tags": An array of 3-5 lowercase single-word tags.

            Example Output:
            { "category": "Coding", "tags": ["react", "javascript", "web"] }
          `
                }
            ],
            // 👇 THIS IS THE FIX: Use the new stable model
            model: "llama-3.3-70b-versatile",

            // Groq's native JSON mode
            response_format: { type: "json_object" },
        });

        const jsonString = completion.choices[0]?.message?.content || "{}";
        const data = JSON.parse(jsonString);

        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to generate tags" },
            { status: 500 }
        );
    }
}