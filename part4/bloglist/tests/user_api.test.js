const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany();
    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });
    await user.save();
  });

  test('creation succeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'andrew',
      name: 'Andrew',
      password: 'andrew',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((each) => each.username);
    expect(usernames).toContain(newUser.username);
  }, 100000);

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with invalid username and password', async () => {
    const userWithouUsername = {
      name: 'test',
      password: '123',
    };

    const userWithoutPassword = {
      username: 'test',
      name: 'test',
    };

    const userWithInvalidUsernameLength = {
      username: 'te',
      name: 'test',
      password: '123',
    };

    const userWithInvalidPasswordLength = {
      username: 'test',
      name: 'test',
      password: '12',
    };

    await api.post('/api/users').send(userWithoutPassword).expect(400)

    // const users = [userWithouUsername, userWithoutPassword, userWithInvalidPasswordLength, userWithInvalidUsernameLength];
    // await Promise.all(users.map( async (each) => await api.post('/api/users').send(each).expect(400)));
  });
});

afterAll(() => {
  mongoose.connection.close();
});
