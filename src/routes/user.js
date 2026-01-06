const express = require("express");
const router = express.Router();
const ConnectionRequest = require("../models/connection-request");
const { userAuth } = require("../middleware/auth");

router.get("/request/received", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const connectionRequests = await ConnectionRequest.find({
      receiver: user._id,
      status: "interested",
    }).populate("sender", "firstName lastName");

    res.status(200).json({ connectionRequests });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
