//Problem need node js

//npm install captcha-canvas

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { CaptchaGenerator } = require('captcha-canvas');

const app = express();

// Generate a random URL
const randomUrl = `/app/${uuidv4()}`;

// Set up CAPTCHA generator
const captchaGenerator = new CaptchaGenerator({
  width: 160,
  height: 60,
  background: {
    color: '#eee'
  },
  fontSize: 50,
  charPreset: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
});

// Set up your form handling route
app.post(randomUrl, (req, res) => {
  // Verify the CAPTCHA
  const userInput = req.body.captcha;
  const isValid = captchaGenerator.validate(userInput);

  if (isValid) {
    // Handle the form submission here
    console.log('Form data:', req.body);
    res.send({ success: true });
  } else {
    res.status(400).send({ error: 'Invalid CAPTCHA' });
  }
});

// Serve the CAPTCHA image
app.get(`${randomUrl}/captcha`, (req, res) => {
  const captcha = captchaGenerator.generateSync();
  res.set('Content-Type', 'image/png');
  res.send(captcha.data);
});

// Start the server
app.listen(3000, () => {
  console.log(`Web app available at: http://localhost:3000${randomUrl}`);
});