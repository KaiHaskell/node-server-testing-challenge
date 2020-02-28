const router = require("express").Router();
const Posts = require("./post-model");

router.get("/", (req, res) => {
  Posts.getAll()
    .then(posts => {
      res.status(200).json({ posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Cant retrieve posts" });
    });
});

router.post("/", (req, res) => {
  Posts.addPost(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "could not add the post" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Posts.deletePost(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "could not delete the post" });
    });
});

module.exports = router;
