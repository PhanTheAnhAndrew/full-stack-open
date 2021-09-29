const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

let authorizationToken = '';

const login = async () => {
  const loginInfo = await api.post('/api/login').send(helper.defaultLoginInfo);
  const { token } = loginInfo.body;
  authorizationToken = `Bearer ${token}`;
};

const createDefaultUser = async () => {
  await api.post('/api/users').send(helper.defaultLoginInfo);
};


beforeAll(async () => {
  await User.deleteMany({});
  await createDefaultUser();
  await login();
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await Promise.all(
    helper.initialBlogs.map(async (each) => {
      await api
        .post('/api/blogs')
        .set('Authorization', authorizationToken)
        .send(each);
    })
  );
});

describe('when there is initially some blogs saved', () => {
  test('The blog list application returns the correct amount of blog posts in the JSON format.', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', authorizationToken)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs').set('Authorization', authorizationToken);
    response.body.forEach((each) => {
      expect(each.id).toBeDefined();
    });
  });
});

describe('addition of a new blog', () => {
  test('Successfully creates a new blog post', async () => {
    const newBlog = {
      title: 'Andrew 1',
      author: 'Andrew',
      url: 'Andrew',
      likes: 2,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', authorizationToken)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs').set('Authorization', authorizationToken);
    const { body } = response;
    const transformedBody = body.map((each) => {
      const { title, author, url, likes } = each;
      return { title, author, url, likes };
    });
    expect(body).toHaveLength(helper.initialBlogs.length + 1);
    expect(transformedBody).toContainEqual(newBlog);
  });

  test('Successfully creates a new blog post with missing likes', async () => {
    const newBlog = {
      title: 'Andrew 2',
      author: 'Andrew',
      url: 'Andrew',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', authorizationToken)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs').set('Authorization', authorizationToken);
    const { body } = response;
    const transformedBody = body.map((each) => {
      const { title, author, url, likes } = each;
      return { title, author, url, likes };
    });
    expect(body).toHaveLength(helper.initialBlogs.length + 1);
    expect(transformedBody).toContainEqual({
      ...newBlog,
      likes: 0,
    });
  });

  test('Fail to create a new blogs without title and url', async () => {
    const blogWithoutTitle = {
      author: 'Andrew',
      url: 'Andrew',
    };

    const blogWithoutURL = {
      title: 'Andrew',
      author: 'Andrew',
    };

    const blogWithoutTitleAndURL = {
      author: 'Andrew',
    };

    const blogs = [blogWithoutTitle, blogWithoutURL, blogWithoutTitleAndURL];
    await Promise.all(blogs.map(async (each) => await api.post('/api/blogs').set('Authorization', authorizationToken).send(each).expect(400)));
  });

  test('fail with status code 401 if user is invalid', async () => {
    const newBlog = {
      title: 'Andrew 1',
      author: 'Andrew',
      url: 'Andrew',
      likes: 2,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', '')
      .send(newBlog)
      .expect(401);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const response = await api.get('/api/blogs').set('Authorization', authorizationToken);
    const idToDelete = response.body[response.body.length - 1].id;
    await api.delete(`/api/blogs/${idToDelete}`).set('Authorization', authorizationToken).expect(204);
  });

  test('fail with status code 400 if id is invalid', async () => {
    await api.delete('/api/blogs/tempId').set('Authorization', authorizationToken).expect(400);
  });
});

describe('update of a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const likes = 10;
    const response = await api.get('/api/blogs').set('Authorization', authorizationToken);
    const idToUpdate = response.body[0].id;
    const newBlog = await api.put(`/api/blogs/${idToUpdate}`).set('Authorization', authorizationToken).send({ likes }).expect(200);
    expect(newBlog.body).toEqual({
      ...response.body[0],
      likes,
      user: response.body[0].user.id,
    });
  });

  test('fail with status code 400 if id is invalid', async () => {
    await api.put('/api/blogs/tempId').set('Authorization', authorizationToken).expect(400);
  });

});

afterAll(() => {
  mongoose.connection.close();
});
