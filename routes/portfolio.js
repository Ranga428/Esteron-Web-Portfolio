const express = require('express');
const router = express.Router();

let portfolioData = {
  name: "John Doe",
  bio: "Computer Science student passionate about web development and AI.",
  skills: ["JavaScript", "Node.js", "Express", "React", "Python"],
  projects: [
    {
      name: "Personal Website",
      description: "My personal portfolio website built with React.",
      link: "https://github.com/johndoe/personal-website"
    },
    {
      name: "Chatbot AI",
      description: "A chatbot using NLP techniques.",
      link: "https://github.com/johndoe/chatbot-ai"
    }
  ],
  contact: {
    email: "johndoe@example.com",
    linkedin: "https://linkedin.com/in/johndoe"
  }
};

// GET portfolio data
router.get('/', (req, res) => {
  res.json(portfolioData);
});

// POST to update portfolio data
router.post('/', (req, res) => {
  const updatedData = req.body;

  // Simple validation can be added here if needed

  // Overwrite the in-memory portfolioData with updated data
  portfolioData = { ...portfolioData, ...updatedData };

  res.json({ message: 'Portfolio updated', portfolio: portfolioData });
});

module.exports = router;
