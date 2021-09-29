const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post('/', async (req, res) => {
  const { body, user } = req;
  const blog = new Blog({
    ...body,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.json(savedBlog);
});

blogRouter.delete('/:id', async (req, res) => {
  const { user } = req;
  const blog = await Blog.findById(req.params.id).populate('user');
  if (blog.user?.id.toString() === user._id.toString()) {
    await blog.remove();
    return res.status(204).end();
  }
  return res.status(401).json({ error: 'invalid user' });
});

blogRouter.put('/:id', async (req, res) => {
  const { body: { likes } } = req;
  const updatedBlogs = await Blog.findByIdAndUpdate(req.params.id, { likes }, { new: true });
  res.json(updatedBlogs);
});

module.exports = blogRouter;