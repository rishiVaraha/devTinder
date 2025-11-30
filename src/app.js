const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello From Home page!");
});

app.get("/test", (req, res) => {
  res.send("Hello, World!");
});

app.get("/users", (req, res) => {
  res.send({
    name: "Rishi kumar",
    age: "23",
    role: "FrontEnd Developer",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
