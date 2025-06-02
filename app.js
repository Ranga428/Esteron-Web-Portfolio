const express = require('express');
const pool = require('./db'); // your MySQL connection pool

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (like your index.html, css, js)
app.use(express.static('public')); // adjust folder name if different

// API route to get portfolio data
app.get('/api/portfolio', async (req, res) => {
  try {
    // Get first user (for demo)
    const [users] = await pool.query('SELECT * FROM users LIMIT 1');
    if (users.length === 0) return res.status(404).json({ error: 'No user found' });

    const user = users[0];

    // Get portfolio info for user
    const [portfolioRows] = await pool.query('SELECT * FROM portfolio WHERE user_id = ?', [user.id]);
    if (portfolioRows.length === 0) return res.status(404).json({ error: 'Portfolio not found' });
    const portfolio = portfolioRows[0];

    // Get skills
    const [skills] = await pool.query('SELECT skill FROM skills WHERE portfolio_id = ?', [portfolio.id]);

    // Get projects
    const [projects] = await pool.query('SELECT name, description, link FROM projects WHERE portfolio_id = ?', [portfolio.id]);

    // Respond with combined portfolio data
    res.json({
      name: portfolio.name,
      bio: portfolio.bio,
      skills: skills.map(s => s.skill),
      projects,
      contact: {
        email: portfolio.email,
        linkedin: portfolio.linkedin,
      }
    });

  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
