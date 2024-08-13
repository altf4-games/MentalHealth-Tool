document.getElementById("sendBtn").addEventListener("click", function () {
  const userInput = document.getElementById("userInput").value;
  if (userInput.trim() === "") return;

  displayMessage(userInput, "user");

  document.getElementById("userInput").value = "";

  simulateChatbotResponse(userInput);
});

document.getElementById("userInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return;

    displayMessage(userInput, "user");

    document.getElementById("userInput").value = "";

    simulateChatbotResponse(userInput);
  }
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

displayMessage(
  "Hi there! I'm ZenBuddy, here to listen and support you. How are you feeling today? You can tell me anything on your mind.",
  "bot"
);

function simulateChatbotResponse(userMessage) {
  fetch(`/generate?prompt=${encodeURIComponent(userMessage)}`)
    .then((response) => response.json())
    .then((data) => {
      const botResponse = data.text;
      const sentimentScore = data.sentiment.score;
      const resources = data.resources;

      displayMessage(botResponse, "bot");

      // displayMessage(`Sentiment Score: ${sentimentScore}`, "bot");

      if (resources.length > 0) {
        displayMessage(
          "Here are some resources you might find helpful:",
          "bot"
        );
        resources.forEach((resource) => {
          displayMessage(
            `<a href="${resource.url}" target="_blank" class="text-blue-500 underline">${resource.title}: ${resource.description}</a>`,
            "bot"
          );
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
