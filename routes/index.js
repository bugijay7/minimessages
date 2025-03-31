const express = require("express");
const router = express.Router();

const allowedUsers = ["Kibugi", "Kashio"];

const messages = [
  { text: "Hi there!", user: "Kibugi", added: new Date() },
  { text: "Hello World!", user: "Kashio", added: new Date() }
];

// GET index route (Display messages)
router.get("/", (req, res) => {
  res.render("index", { title: "KiKa Chat", messages });
});

// GET form route (Show message submission form)
router.get("/new", (req, res) => {
  res.render("form");
});

// POST new message route (Save new messages)
r// POST new message route
router.post("/new", (req, res) => {
  const { user, message } = req.body; // Extract form data

  console.log("Received User:", user); // Debugging
  console.log("Received Message:", message); // Debugging

  if (!user || !message) {
      return res.send("Error: Both name and message fields are required.");
  }

  if (!allowedUsers.includes(user.trim())) {
      return res.send("Error: Only Kibugi and Kashio are allowed to post messages.");
  }

  messages.push({
      text: message,
      user: user.trim(), // Ensure no extra spaces
      added: new Date()
  });

  res.redirect("/"); // Redirect back to the homepage
});


module.exports = router;
