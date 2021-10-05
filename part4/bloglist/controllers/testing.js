const testingRouter = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');

testingRouter.get('/reset', async (req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  console.log('hello');
  res.status(204).end();
});


module.exports = testingRouter;