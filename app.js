const express = require("express");

const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Sample messages array
const messages = [
  { text: "Hi there!", user: "Maina", added: new Date() },
  { text: "Hello World!", user: "Kashio", added: new Date() }
];

// Index route (Displays all messages)
app.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

// New message form route (Displays the form)
app.get("/new", (req, res) => {
  res.render("form");
});

// Route to handle new message submission
app.post("/new", (req, res) => {
  const { user, message } = req.body;
  
  if (!user || !message) {
    return res.send("Both fields are required!");
  }

  messages.push({ text: message, user: user, added: new Date() });

  res.redirect("/"); // Redirects back to the homepage
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
