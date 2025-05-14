const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());


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


app.post('/api/doubts', (req, res) => {
  const { question, askedBy } = req.body;

  if (!question || !askedBy) {
    return res.status(400).send({ message: 'Question and askedBy are required fields.' });
  }

  const newDoubt = {
    id: Math.floor(Math.random() * 1000), 
    question,
    askedBy
  };

  
  console.log('New doubt submitted:', newDoubt);

  res.status(201).json({ message: 'Doubt created successfully!', doubt: newDoubt });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
