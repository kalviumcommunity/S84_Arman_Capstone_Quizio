const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to Quizio API!');
});

app.get('/api/doubts', (req, res) => {
  const sampleDoubts = [
    { id: 1, question: "What is React?", askedBy: "Alice" },
    { id: 2, question: "Explain closures in JavaScript", askedBy: "Bob" },
  ];
  res.json({ doubts: sampleDoubts });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
