const express = require('express');
const Doubt = require('./models/Doubt');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to Quizio API!');
});


app.get('/api/doubts', async (req, res) => {
  try {
    const doubts = await Doubt.find();
    res.json({ doubts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch doubts.' });
  }
});



app.post('/api/doubts', async (req, res) => {
  const { question, mediaUrl } = req.body;

  try {
    const newDoubt = new Doubt({
      question,
      mediaUrl
    });

    await newDoubt.save();
    res.status(201).json({ message: "Doubt saved!", doubt: newDoubt });
  } catch (error) {
    res.status(500).json({ error: "Failed to save doubt." });
  }
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

mongoose.connect("mongodb+srv://arman:arman@cluster.hav342r.mongodb.net/?retryWrites=true&w=majority&appName=cluster")
.then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.log('MongoDB connection error:', err);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});