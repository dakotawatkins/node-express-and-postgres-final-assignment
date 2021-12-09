
const service = require("./comments.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function commentExists(req, res, next) {
  const { commentId } = req.params;
  const comment = await service.read(commentId);
  if (comment) {
    res.locals.comment = comment;
    return next();
  }
  return next({ status: 404, message: `Comment cannot be found.` });
}


// modify the list() function to call the service method and 
// return a json of all comments in the response.
async function list(req, res, next) {
  // your solution here
  const data = await service.list();
  res.json({ data });
}


async function listCommenterCount(req, res, next) {
  // your solution here
  const results = await service.listCommenterCount();
  res.json({
    data: results.map((result) => ({
      ...result,
      count: parseInt(result.count),
    })),
  });
}

async function read(req, res, next) {
  const knexInstance = req.app.get("db");
  const { comment } = res.locals;
  res.json({ data: comment });
}


module.exports = {
  list: asyncErrorBoundary(list),
  listCommenterCount: asyncErrorBoundary(listCommenterCount),
  read: [asyncErrorBoundary(commentExists), read],
};
