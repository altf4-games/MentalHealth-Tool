const express = require("express");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();

app.get("/generate", async (req, res) => {
  const prompt = req.query.prompt;

  const result = await model.generate({ prompt });

  res.json({ result });
});

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
