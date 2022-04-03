const express = require("express");
const router = express.Router();

//Basic Route
router.get("/", (req, res) => {
    res.render("welcome");
});

module.exports = router;