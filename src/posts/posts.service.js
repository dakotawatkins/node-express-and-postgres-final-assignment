const knex = require("../db/connection");


// complete the create() function to create a Knex query that
// creates a new post in the posts table.
function create(post) {
  //your solution here
  return knex("posts")
    .insert(post)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}


function read(postId) {
  return knex("posts").select("*").where({ post_id: postId }).first();
}


// complete the update() function to create a Knex query that updates a
// post given a body with the updated post and the postId from the url.
function update(updatedPost) {
  //your solution here
  return knex("posts")
    .select("*")
    .where({ post_id: updatedPost.post_id })
    .update(updatedPost, "*")
    .then((updatedRecords) => updatedRecords[0]);
}


// complete the destroy() function to create a Knex query 
// that deletes a post given a post ID.
function destroy(postId) {
  //your solution here
  return knex("posts").where({ post_id: postId }).del();
}


module.exports = {
  create,
  read,
  update,
  delete: destroy,
};
