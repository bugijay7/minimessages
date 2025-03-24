const express = require("express");
const router = express.Router();

const messages = [
  { text: "Hi there!", user: "Maina", added: new Date() },
  { text: "Hello World!", user: "Kashio", added: new Date() }
];

// GET index route
router.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

// GET form route
router.get("/new", (req, res) => {
  res.render("form");
});

// POST new message route
router.post("/new", (req, res) => {
  const { user, message } = req.body; // Extract form data

  messages.push({
    text: message,
    user: user,
    added: new Date() // Store the current timestamp
  });

  res.redirect("/"); // Redirect back to the homepage
});

module.exports = router;
