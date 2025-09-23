// Simple frontend chatbot workflow (use a real backend/AI for prod)
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function appendMessage(message, sender="bot") {
  let div = document.createElement("div");
  div.className = sender === "user" ? "user-message" : "bot-message";
  div.innerText = message;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Bot welcome
appendMessage('👋 Hi! I am TAX GURU. Ask about GST, tax slabs, budgets, or Indian law.');

sendBtn.onclick = async () => {
  const msg = userInput.value.trim();
  if(!msg) return;
  appendMessage(msg, "user");
  userInput.value = '';
  let response = await fetch('/ask', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  });
  let data = await response.json();
  appendMessage(data.reply || "Sorry, I couldn't answer that.");
};

userInput.addEventListener("keypress", function(e){
  if (e.key === "Enter") sendBtn.click();
});
