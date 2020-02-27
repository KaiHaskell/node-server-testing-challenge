const router = require("express").Router();
const Posts = require("./post-model");

router.get("/", (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json({ posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Cant retrieve posts" });
    });
});

module.exports = router;
