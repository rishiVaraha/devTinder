const express = require("express");
const connectDB = require("./config/db");
const User = require("./models/user");
const app = express();

require("dotenv").config();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User is Created Successfully!");
});

app.get("/user", async (req, res) => {
  try {
    const userEmailId = req.query.emailId;
    const users = await User.find({ emailId: userEmailId });
    if (!users) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch {
    res.status(400).send("something wents worng");
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch {
    res.status(400).send("something wents worng");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.query.id;
  try {
    await User.findByIdAndDelete(userId);

    res.send("User Deleted successfully");
  } catch {
    res.status(400).send("something wents worng");
  }
});

app.put("/user", async (req, res) => {
  const userId = req.query.id;
  const userData = req.body;
  console.log(userData);
  try {
    await User.findByIdAndUpdate(userId, userData, { runValidators: true });
    res.send("User Update successfully");
  } catch (err) {
    res.status(400).send(`UPDATE failed:${err.message}`);
  }
});

// Start server only after DB connection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
