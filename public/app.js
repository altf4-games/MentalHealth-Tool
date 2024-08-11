document.getElementById("sendBtn").addEventListener("click", function () {
  const userInput = document.getElementById("userInput").value;
  if (userInput.trim() === "") return;

  displayMessage(userInput, "user");

  document.getElementById("userInput").value = "";

  simulateChatbotResponse(userInput);
});

function displayMessage(message, sender) {
  const chatWindow = document.getElementById("chatWindow");
  const messageElement = document.createElement("div");

  if (sender === "user") {
    messageElement.classList.add("text-right", "my-2");
    messageElement.innerHTML = `<span class="bg-blue-500 text-white px-4 py-2 rounded-md inline-block">${message}</span>`;
  } else {
    messageElement.classList.add("text-left", "my-2");
    messageElement.innerHTML = `<span class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md inline-block">${message}</span>`;
  }

  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function simulateChatbotResponse(userMessage) {
  fetch(`/generate?prompt=${encodeURIComponent(userMessage)}`)
    .then((response) => response.json())
    .then((data) => {
      const botResponse = data.text;
      const sentimentScore = data.sentiment.score;

      displayMessage(botResponse, "bot");

      // displayMessage(`Sentiment Score: ${sentimentScore}`, "bot");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
