const express = require("express");
const path = require("path");
const pool = require("./db"); // Import database connection
const allowedUsers = ["Kibugi", "Kashio"];
const app = express();

// Use the PORT environment variable if available, otherwise default to 3000
const PORT = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Ensure views directory is set

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Index route (Fetch messages from the database)
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages ORDER BY added DESC");
    res.render("index", { title: "KiKa Chat", messages: result.rows });
  } catch (err) {
    console.error("Database Fetch Error:", err);
    res.status(500).send("Database error. Please try again later.");
  }
});

// New message form route (Display the form)
app.get("/new", (req, res) => {
  res.render("form"); // Ensure you have a 'form.ejs' file in your 'views' directory
});

// New message submission route
app.post("/new", async (req, res) => {
  let { user, message } = req.body;

  // Trim user input
  user = user.trim();
  message = message.trim();

  // Check if the user is allowed
  if (!allowedUsers.includes(user)) {
    return res.status(403).send("Error: Only Kashio and Kibugi are allowed to post messages.");
  }

  // Check if message is empty
  if (!message) {
    return res.status(400).send("Error: Message cannot be empty.");
  }

  try {
    // Insert message into database
    const result = await pool.query(
      "INSERT INTO messages (text, user_name, added) VALUES ($1, $2, NOW()) RETURNING *",
      [message, user]
    );

    console.log("Message added:", result.rows[0]);
    res.redirect("/");
  } catch (err) {
    console.error("Database Insert Error:", err);
    res.status(500).send("Error saving message. Please try again later.");
  }
});

// Start server
app.listen(PORT,'0.0.0.0', () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
