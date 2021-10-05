import React, { useState } from 'react';
import PropTypes from 'prop-types';

function BlogForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async (event) => {
    event.preventDefault();
    onSubmit({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            value={author}
            onChange={(evt) => setAuthor(evt.target.value)}
          />
        </div>
        <div>
        url:
          <input
            id="url"
            value={url}
            onChange={(evt) => setUrl(evt.target.value)}
          />
        </div>
        <button id="btn-create" type="submit">create</button>
      </form>
    </div>
  );
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default BlogForm;
