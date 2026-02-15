// Run with: node test-groq.js
require('dotenv').config({ path: '.env.local' });
const Groq = require("groq-sdk");

async function testGroq() {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    console.error("❌ Error: GROQ_API_KEY is missing from .env.local");
    return;
  }

  console.log("🔑 Found Key:", apiKey.slice(0, 10) + "...");
  const groq = new Groq({ apiKey });

  try {
    console.log("⏳ Connecting to Groq...");
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: "Say 'Hello' and return JSON: { \"status\": \"ok\" }" }],
      model: "llama3-8b-8192",
      response_format: { type: "json_object" },
    });

    console.log("✅ Success!");
    console.log(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error("❌ Groq Error:", error.message);
  }
}

testGroq();