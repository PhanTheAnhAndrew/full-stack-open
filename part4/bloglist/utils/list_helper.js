const { groupBy, sumBy } = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return 0;
  }
  const reducer = (sum, item) => sum + item.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null;
  }
  blogs.sort((a, b) => b.likes - a.likes);
  const { title, author, likes } = blogs[0];
  return {
    title, author, likes
  };
};

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null;
  }
  const groupedBlogsByAuthor = groupBy(blogs, 'author');
  const totalLikesByAuthor = Object.keys(groupedBlogsByAuthor).map((key) => {
    const blogsByAuthor = groupedBlogsByAuthor[key];
    const likes = sumBy(blogsByAuthor, 'likes');
    return {
      author: key,
      likes,
    };
  });

  totalLikesByAuthor.sort((a, b) => b.likes - a.likes);
  return totalLikesByAuthor[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
