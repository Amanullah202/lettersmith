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

    const payload = {
      model: "mistralai/mistral-7b-instruct",
      messages: [
        {
          role: "system",
          content: "You are an assistant that writes excellent cover letters. Donot hullicunate. You are a professional Cover letter writer. DONOT use placeholders for users name, phone number or any other details. user has already attached those details in the CV. if CV is not present, see if details provided in User prompt, or in any other way. if still no where to be found, then use placeholders like [NAME], [PHONE], [EMAIL] etc.",
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
