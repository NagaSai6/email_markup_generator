const express = require("express");
const app = express();
const useRoutes = require("./app/routes/routes");
// Set the view engine to EJS.
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/email-template-generator", useRoutes);

// Create a route for the index page.
app.get("/", (req, res) => {
  res.status(200).send("Server is up");
});

// Start the server.
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
