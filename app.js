const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Session setup
app.use(session({
  secret: 'your_super_secret_key', // replace with a strong secret!
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set secure: true if using HTTPS
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

// Mock portfolio data (in-memory)
let portfolio = {
  name: 'John Doe',
  bio: 'Student passionate about web development.',
  skills: ['JavaScript', 'React', 'Node.js'],
  projects: [
    { name: 'Portfolio Website', description: 'My personal portfolio', link: 'https://example.com' }
  ],
  contact: {
    email: 'john.doe@example.com',
    linkedin: 'https://linkedin.com/in/johndoe'
  }
};

// Hardcoded user credentials for demo (use DB or env vars in production!)
const USER = { username: 'student', password: 'password123' };

// Middleware to protect routes
function authRequired(req, res, next) {
  if (req.session && req.session.authenticated) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

// API to get portfolio data
app.get('/api/portfolio', (req, res) => {
  res.json(portfolio);
});

// API to update portfolio (protected)
app.post('/api/portfolio', authRequired, (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    return res.status(400).json({ message: 'Name and bio are required.' });
  }
  portfolio.name = name;
  portfolio.bio = bio;
  res.json({ message: 'Portfolio updated successfully.' });
});

// API to login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    req.session.authenticated = true;
    res.json({ message: 'Login successful.' });
  } else {
    res.status(401).json({ message: 'Invalid username or password.' });
  }
});

// API to logout
app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out.' });
  });
});

// Serve edit.html only if authenticated (fallback)
app.get('/edit.html', (req, res, next) => {
  if (req.session && req.session.authenticated) {
    next(); // serve edit.html
  } else {
    res.redirect('/login.html');
  }
});

// Serve login and other static files by default from /public
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
