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


app.put('/api/doubts/:id', (req, res) => {
  const { id } = req.params;
  const { question, askedBy } = req.body;

  let sampleDoubts = [
    { id: 1, question: "What is React?", askedBy: "Alice" },
    { id: 2, question: "Explain closures in JavaScript", askedBy: "Bob" },
  ];

  const doubtIndex = sampleDoubts.findIndex(doubt => doubt.id == id);

  if (doubtIndex === -1) {
    return res.status(404).json({ message: 'Doubt not found' });
  }

  if (question) sampleDoubts[doubtIndex].question = question;
  if (askedBy) sampleDoubts[doubtIndex].askedBy = askedBy;

  console.log(`Doubt with ID ${id} updated:`, sampleDoubts[doubtIndex]);

  res.json({
    message: 'Doubt updated successfully',
    updatedDoubt: sampleDoubts[doubtIndex]
  });
});

// Connect to MongoDB
const mongoose = require('mongoose');
const Doubt = require('./models/Doubt');

mongoose.connect('mongodb://127.0.0.1:27017/quizio', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.log('MongoDB connection error:', err));



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
