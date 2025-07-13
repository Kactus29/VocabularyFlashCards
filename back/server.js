const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Remplace par ta propre URI MongoDB Atlas
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Schéma de flashcard
const flashcardSchema = new mongoose.Schema({
  fr: String,
  en: String,
  kanji: String,
  kana: String,
  categories: [String]
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

// Route pour créer une flashcard
app.post('/flashcards', async (req, res) => {
  try {
    const card = new Flashcard(req.body);
    await card.save();
    res.status(201).json(card);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route pour récupérer toutes les flashcards
app.get('/flashcards', async (req, res) => {
  const cards = await Flashcard.find();
  console.log(cards); // Affiche les cartes dans la console
  res.json(cards);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));