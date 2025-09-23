require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));
app.use(express.json());

// Naive backend: static Q/A logic (extend for full AI)
app.post('/ask', async (req, res) => {
  const question = (req.body.message || '').toLowerCase();
  let answer = "Sorry, I'm not sure about that.";
  if (question.includes('income tax') || question.includes('tax slab')) {
    answer = "FY 2025-26: Up to ₹4 lakh tax free. 5% for ₹4-8 lakh, 10% for ₹8-12 lakh. Ask 'full slabs' for more!";
  } else if (question.includes('gst')) {
    answer = "GST 2.0 slabs: 0% (essentials), 5%, 18%, 40% (luxury). Try asking about HSN/SAC too!";
  } else if (question.includes('budget')) {
    answer = "Budget planning uses 50-30-20 rule: 50% needs, 30% wants, 20% savings. Want an example?";
  } else if (question.includes('80c') || question.includes('deduct')) {
    answer = "Section 80C: Claim up to ₹1.5 lakh for PPF, ELSS, insurance, home loan principal, etc.";
  } else if (question.includes('tax law') || question.includes('gst law')) {
    answer = "Browse IT Act sections or ask about GST returns, due dates, or compliance.";
  }
  res.json({ reply: answer });
});

app.listen(PORT, () => {
  console.log(`TAX GURU chatbot running at http://localhost:${PORT}`);
});
