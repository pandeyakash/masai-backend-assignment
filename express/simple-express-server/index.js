const express = require("express");

const app = express();

const randomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

app.get("/", (req, res) => {
  res.send("Welcome to the Express.js Server!");
});

app.get("/about", (req, res) => {
  res.send("This is a simple Web Server built using Express.js.");
});

app.get("/contact", (req, res) => {
  res.json({ email: "pandeyakash2412@gmail.com", phone: "11223344555" });
});

app.get("/random", (req, res) => {
  const num = randomNumber();
  res.send(`The current random number is: ${num}`);
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found.");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
