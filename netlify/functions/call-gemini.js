async function generateContent(userPrompt) {
  try {
    const response = await fetch("/.netlify/functions/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payload: {
          contents: [{ parts: [{ text: userPrompt }] }]
        }
      })
    });

    const data = await response.json();
    const resultText = data?.candidates?.[0]?.content?.[0]?.text;
    document.getElementById("output").innerText = resultText || "No result returned.";

  } catch (error) {
    console.error("Error generating:", error);
    document.getElementById("output").innerText = "Error generating content!";
  }
}

document.getElementById("generateButton").addEventListener("click", () => {
  const prompt = document.getElementById("userInput").value.trim();
  if(prompt) generateContent(prompt);
});
