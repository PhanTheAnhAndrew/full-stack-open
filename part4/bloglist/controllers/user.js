const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
  res.json(users);
});

userRouter.post('/', async (req, res) => {
  const { body: { password, username, name } } = req;
  if (!password) {
    return res.status(400).json({ error: 'User validation failed: password: Path `password` is required.' });
  } else if (password && password.length < 3) {
    return res.status(400).json({ error: 'Path `password` is shorter than the minimum allowed length (3).' });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.json(savedUser);
});

module.exports = userRouter;