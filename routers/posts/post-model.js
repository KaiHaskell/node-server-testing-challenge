const db = require("../../data/dbConfig");

module.exports = {
  getAll,
  getByID,
  addPost,
  addComment,
  deletePost
};

function getAll() {
  return db("posts")
    .join("comments", "posts.id", "comments.post_id")
    .select("posts.id", "posts.title", "posts.content", "comments.comment")
    .options({ rowMode: "array" })
    .orderBy("posts.id");
}

function getByID(id) {
  return db("posts")
    .select("id", "title", "content")
    .where("id", id);
}

async function addPost(post) {
  const [id] = await db("posts").insert(post);

  return getByID(id);
}

function addComment(comment) {
  return db("comments").insert(comment, "id");
}

async function deletePost(id) {
  await db("comments")
    .where("post_id", id)
    .del();
  await db("posts")
    .where("posts.id", id)
    .del();
}
