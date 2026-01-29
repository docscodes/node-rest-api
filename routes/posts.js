const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("posts route");
});

module.exports = router;
