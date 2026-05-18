const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/products", (req, res) => {

  const data = fs.readFileSync(
    path.join(__dirname, "public", "products.json"),
    "utf-8"
  );

  res.json(JSON.parse(data));
});

const PORT = process.env.PORT || 45000;

app.listen(PORT, () => {
  console.log("Server Running on Port " + PORT);
});