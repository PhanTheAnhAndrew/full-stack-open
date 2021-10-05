import React from 'react';
import ToggleContent from './ToggleContent';
import PropTypes from 'prop-types';

const Blog = ({ blog, onLikeBlog, onRemove }) => {
  const { url, author, likes, title } = blog;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const likeBlog = async () => {
    onLikeBlog({
      ...blog,
      likes: likes + 1,
    });
  };

  const handleRemove = () => {
    onRemove(blog);
  };

  return (
    <div className="blog" style={blogStyle}>
      <ToggleContent label={`${title} ${author}`}>
        <div>{url}</div>
        <div>likes <span className="like-count">{likes}</span> <button className="btn-click" onClick={likeBlog}>like</button></div>
        <div>{author}</div>
        <button onClick={handleRemove}>remove</button>
      </ToggleContent>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLikeBlog: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Blog