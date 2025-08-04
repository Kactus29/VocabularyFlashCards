import React, { useEffect, useState } from 'react';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [form, setForm] = useState({
    fr: '', en: '', kanji: '', kana: '', categories: ''
  });

  useEffect(() => {
    fetch('http://localhost:3001/flashcards')
      .then(res => res.json())
      .then(setFlashcards);
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const body = { ...form, categories: form.categories.split(',').map(s => s.trim()) };
    await fetch('http://localhost:3001/flashcards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    // Refresh list
    fetch('http://localhost:3001/flashcards')
      .then(res => res.json())
      .then(setFlashcards);
    setForm({ fr: '', en: '', kanji: '', kana: '', categories: '' });
  };

  return (
    <div>
      <h1>Vocabulary Flashcards</h1>
      <form onSubmit={handleSubmit}>
        <input name="fr" placeholder="Français" value={form.fr} onChange={handleChange} />
        <input name="en" placeholder="Anglais" value={form.en} onChange={handleChange} />
        <input name="kanji" placeholder="Kanji" value={form.kanji} onChange={handleChange} />
        <input name="kana" placeholder="Kana" value={form.kana} onChange={handleChange} />
        <input name="categories" placeholder="Catégories (séparées par des virgules)" value={form.categories} onChange={handleChange} />
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {flashcards.map(card => (
          <li key={card._id}>
            {card.fr} | {card.en} | {card.kanji} | {card.kana} | [{card.categories.join(', ')}]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;