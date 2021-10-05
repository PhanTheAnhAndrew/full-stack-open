import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) {
      blogService.getAll().then((blogs) =>
        setBlogs(blogs)
      );
    }
  }, [initialized]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      setInitialized(true);
    }
  }, []);

  const showMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleLogin = (newUser, message) => {
    if (newUser) {
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(newUser));
      setUser(newUser);
      setInitialized(true);
      blogService.setToken(newUser.token);
    }
    if (message) {
      showMessage(message);
    }
  };

  const handleAddBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.create(newBlog);
      showMessage(`a new blog ${savedBlog.title} by ${savedBlog.author} added`);
      setBlogs(blogs.concat(savedBlog));
    } catch (exception) {
      showMessage(exception.error);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
    blogService.setToken('');
    setInitialized(false);
  };

  const handleLikeBlog = async (blog) => {
    const updatedBlog = await blogService.update(blog.id, blog);
    if (updatedBlog) {
      const newBlogs = blogs.map((each) => {
        if (each.id === updatedBlog.id) {
          return updatedBlog;
        }
        return each;
      })
      setBlogs(newBlogs);
      showMessage(`a blog ${updatedBlog.title} by ${updatedBlog.author} updated`);
    }
  };

  const handleRemoveBlog = async (blog) => {
    const { title, author, id } = blog;

    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      try {
        await blogService.remove(id);
        const newBlogs = blogs.filter((each) => each.id !== id);
        setBlogs(newBlogs);
        showMessage(`a blog ${title} by ${author} removed`);
      } catch (error) {
        showMessage(error.response.data.error);
      }
    }
  }

  if (user === null) {
    return (
      <>
        <Notification message={errorMessage} />
        <LoginForm onSubmit={handleLogin} />
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="create new blog">
        <BlogForm onSubmit={handleAddBlog} />
      </Togglable>
      <br />
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog onRemove={handleRemoveBlog} onLikeBlog={handleLikeBlog} key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App