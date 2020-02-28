const router = require("express").Router();
const Posts = require("../posts/post-model");

router.post("/:id", (req, res) => {
  const id = req.params.id;
  const { comment } = req.body;
  console.log(comment);
  Posts.addComment({ comment, post_id: id })
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Cannot add comment" });
    });
});

module.exports = router;
