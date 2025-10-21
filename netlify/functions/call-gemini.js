// call-gemini.js

async function generateContent(userPrompt) {
    const outputEl = document.getElementById("output");
    outputEl.innerText = "Generating...";

    try {
        const response = await fetch("/.netlify/functions/call_gemini", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "gemini-2.5", // replace with your desired Gemini model if needed
                payload: {
                    contents: [{ parts: [{ text: userPrompt }] }]
                }
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Server Error: ${errText}`);
        }

        const data = await response.json();
        const resultText = data?.candidates?.[0]?.content?.[0]?.text;

        outputEl.innerText = resultText || "No result returned.";
    } catch (error) {
        console.error("Error generating content:", error);
        outputEl.innerText = "Error generating content!";
    }
}

// Attach click event to your button
document.getElementById("generateButton").addEventListener("click", () => {
    const prompt = document.getElementById("userInput").value.trim();
    if (prompt) generateContent(prompt);
});
