const express = require("express");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const Sentiment = require("sentiment");

const sentiment = new Sentiment();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();

app.get("/generate", async (req, res) => {
  const prompt = req.query.prompt;

  // Analyze the sentiment of the user's prompt
  const sentimentResult = sentiment.analyze(prompt);

  console.log("Sentiment Analysis:", sentimentResult);

  // Tailor the prompt
  let tailoredPrompt = prompt;

  if (sentimentResult.score < 0) {
    tailoredPrompt = `This person seems a bit down: ${prompt}`;
  } else if (sentimentResult.score > 0) {
    tailoredPrompt = `This person is in a positive mood: ${prompt}`;
  }

  // Generate response using the LLM
  const result = await model.generateContent([tailoredPrompt]);

  // Send back the sentiment analysis along with the AI's response
  const text = result.response.text();
  res.json({ sentiment: sentimentResult, text });
});

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
