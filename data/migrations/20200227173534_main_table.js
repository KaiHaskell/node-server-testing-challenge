exports.up = async function(knex) {
  await knex.schema.createTable("posts", tbl => {
    tbl.increments();
    tbl.string("title", 64).notNullable();
    tbl.string("content").notNullable();
  });
  await knex.schema.createTable("comments", tbl => {
    tbl.increments();
    tbl.string("comment").notNullable();
    tbl
      .integer("post_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("posts")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("comments");
  await knex.schema.dropTableIfExists("posts");
};
