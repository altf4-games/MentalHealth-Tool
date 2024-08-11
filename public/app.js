document.getElementById("sendBtn").addEventListener("click", function () {
  const userInput = document.getElementById("userInput").value;
  if (userInput.trim() === "") return;

  // Display user's message
  displayMessage(userInput, "user");

  // Clear input field
  document.getElementById("userInput").value = "";

  // Simulate chatbot response
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
  chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom
}

function simulateChatbotResponse(userMessage) {
  // Placeholder for the actual API call to the chatbot backend
  setTimeout(function () {
    const botResponse = `You said: ${userMessage}`;
    displayMessage(botResponse, "bot");
  }, 1000);
}
