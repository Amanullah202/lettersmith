export async function POST(req) {
  console.log("📥 Incoming POST request to /api/Chat/Cover");

  try {
    const body = await req.json();
    console.log("🧾 Parsed body from client:", body);

    const OPENROUTER_API_KEY = process.env.OPENROUTERS_API_KEY;
    if (!OPENROUTER_API_KEY) {
      console.error("❌ Missing OPENROUTERS_API_KEY in env");
      return new Response(JSON.stringify({ error: "Missing API Key" }), {
        status: 401,
      });
    }

    const prompt = `Generate a ${body.length}, ${body.tone} cover letter in ${body.language}, using this style: ${body.style}. 
Here is the job description:\n${body.jobDescription}\n
And here is my CV:\n${body.cvText}\n
User prompt: ${body.prompt}`;

    console.log("🧠 Constructed prompt for OpenRouter:\n", prompt);
    const systemPrompt =
      "You are an expert cover letter writer. Your task is to write complete, polished, and tailored cover letters using the job description, the user's CV, and their input prompt. DO NOT hallucinate any user information like name, email, phone, or role title. The user's full CV is provided in plain text. Use that information directly to: - Address the user by their actual name - Include their real email and phone number - Mention relevant education, experience, and skills. If any detail is not found in the CV, then check if it is provided in the prompt. If it is not found in CV or prompt, then and only then, use a placeholder like [NAME], [EMAIL], [PHONE], [ADDRESS]. Never use both placeholders and real info together. Use one or the other consistently. Keep the letter focused, clean, and professional. Avoid fluff or repetition. You are not a chatbot. You are a reliable writing assistant that helps users apply for jobs with real, usable letters.";

    const payload = {
      model: "mistralai/mistral-7b-instruct",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        { role: "user", content: prompt },
      ],
    };

    console.log("📦 Sending payload to OpenRouter:", payload);

    const openrouterRes = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    console.log("⏳ Awaiting response from OpenRouter...");

    if (!openrouterRes.ok) {
      const errorText = await openrouterRes.text();
      console.error("❌ OpenRouter API error response:", errorText);
      return new Response(
        JSON.stringify({ error: "OpenRouter Error", detail: errorText }),
        { status: 500 }
      );
    }

    const result = await openrouterRes.json();
    console.log("✅ OpenRouter response received:", result);

    const aiMessage =
      result.choices?.[0]?.message?.content || "⚠️ No content in response";

    console.log("📝 Extracted AI message:", aiMessage);

    return new Response(JSON.stringify({ aiMessage }), {
      status: 200,
    });
  } catch (error) {
    console.error("🔥 Server error:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong", detail: error.message }),
      { status: 500 }
    );
  }
}
