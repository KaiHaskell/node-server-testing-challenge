const db = require("../../data/dbConfig");

const request = require("supertest");
const server = require("../../api/server");

const Posts = require("./post-model");

const testPost = {
  title: "It don't make no sense",
  content: "I feel like gucci mane in 2006"
};

/* TESTING IF MY ENVIROMENT EXISTS */
describe("test enivronment", function() {
  it("should use the testing environment", function() {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("POST /api/posts", function() {
  beforeEach(async () => {
    await db("posts").truncate();
  });
  it("adds the new post to the db", async function() {
    await Posts.addPost({
      title: "It don't make no sense",
      content: "I feel like gucci mane in 2006"
    });
    const post = await db("posts");
    expect(post).toHaveLength(1);
  });
});

// describe("DELETE /api/posts", function() {
//   beforeEach(async () => {
//     await db("posts").truncate();

//     await Posts("posts").addPost({
//       title: "It don't make no sense",
//       content: "I feel like gucci mane in 2006"
//     });
//     await Posts("comments").addComment({
//       post_id: 1,
//       comment: "All these f*cking diamonds on my neck cost like four bricks"
//     });
//   });
// });

describe("POST /", function() {
  it("it shoud return status code 201", async function() {
    await db("posts").truncate();
    request(server)
      .post("/api/posts")
      .send(testPost)
      .expect(201);
  });
  it("should delete an object I create", function(done) {
    return request(server)
      .delete("/api/posts/:id")
      .send({ id: 1 })
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        done();
      });
  });
});

describe("DELETE /", function() {});

//   it("should GET the object I made with POST", function() {
//     return request(server)
//       .get("/api/posts")
//       .first()
//       .then(post => {
//         expect(post).toBe({
//           title: "It don't make no sense",
//           content: "I feel like gucci mane in 2006"
//         });
//       });
//   });
