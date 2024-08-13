const express = require("express");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const Sentiment = require("sentiment");

const resources = require("./resources.json");
const sentiment = new Sentiment();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();

app.get("/generate", async (req, res) => {
  const prompt = req.query.prompt;

  // Analyze the sentiment of the user's prompt
  const sentimentResult = sentiment.analyze(prompt);

  console.log("Sentiment Analysis:", sentimentResult);

  let recommendedResources = [];
  if (sentimentResult.score > 0) {
    recommendedResources = resources.positive;
  } else if (sentimentResult.score < 0) {
    recommendedResources = [...resources.neutral, ...resources.negative];
  }

  // shuffle recommended resources
  recommendedResources.sort(() => Math.random() - 0.5);
  recommendedResources = recommendedResources.slice(0, 2);

  // Tailor the prompt
  let tailoredPrompt = prompt;

  // Add context about the assistant's role
  const assistantContext =
    "You are an emotional assistant designed to help children and college students with their mental health. Your responses should be supportive, empathetic, and understanding, catering specifically to the needs of young individuals.";

  if (sentimentResult.score < 0) {
    tailoredPrompt = `${assistantContext} The user appears to be feeling down or stressed. Respond with empathy and offer support: "${prompt}"`;
  } else if (sentimentResult.score > 0) {
    tailoredPrompt = `${assistantContext} The user's mood seems neutral. Encourage and engage with their positive energy: "${prompt}"`;
  } else {
    tailoredPrompt = `${assistantContext} The user's mood seems neutral. Provide a balanced and thoughtful response: "${prompt}"`;
  }
  // Generate response using the LLM
  const result = await model.generateContent([tailoredPrompt]);

  // Send back the sentiment analysis along with the AI's response
  const text = result.response.text();
  res.json({
    sentiment: sentimentResult,
    text,
    resources: recommendedResources,
  });
});

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
