const express = require("express");
const path = require("path");
const routes = require("./routes/index"); // Import the routes

const app = express();
const PORT = process.env.PORT || 3000;

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
