const db = require('../data/dbConfig.js');
const request = require('supertest');
const server = require('../server.js');

describe('server.js', () => {
  beforeAll(async () => {
    await db('users').truncate();
  });

  describe('POST /register', () => {
    it('should return 201', async () => {
      const res = await request(server).post('/api/users/register').send({username: 'new3', password: '123test', type: 'owner'});
      expect(res.status).toBe(201);
    })

    it('message should be - "User successfully created..."', async () => {
      const res = await request(server).post('/api/users/register').send({username: 'new4', password: '123test', type: 'renter'});
      let response = JSON.parse(res.text)
      expect(response.message).toBe("User successfully created. Welcome, new4! Here is your token...");
    })
  })

  describe('POST /login', () => {
    it('should return 200', async () => {
      const res = await request(server).post('/api/users/login').send({username: 'new3', password: '123test'});
      expect(res.status).toBe(200);
    })

    it('message should be - "Welcome, new4!..."', async () => {
      const res = await request(server).post('/api/users/login').send({username: 'new4', password: '123test'});
      let response = JSON.parse(res.text)
      expect(response.message).toBe("Welcome, new4! Have a token...");
    })
  })

  describe('GET /', () => {
    it('should return 200', async () => {
      const res = await request(server).get('/api/users');
      expect(res.status).toBe(200);
    })

    it('message should be - "Here are the users"', async () => {
      const res = await request(server).get('/api/users');
      let response = JSON.parse(res.text)
      expect(response.message).toBe("Here are the users");
    })
  })

  describe('GET /:id', () => {
    it('should return 200', async () => {
      const res = await request(server).get('/api/users/1');
      expect(res.status).toBe(200);
    })

    it('message should be - "Here is the user"', async () => {
      const res = await request(server).get('/api/users/1');
      let response = JSON.parse(res.text)
      expect(response.message).toBe("Here is the user");
    })
  })

  describe('GET /:id/items', () => {
    it('should return 200', async () => {
      const res = await request(server).get('/api/users/2/items');
      expect(res.status).toBe(200);
    })

    it('message should be - "Here are the user\'s items"', async () => {
      const res = await request(server).get('/api/users/2/items');
      let response = JSON.parse(res.text)
      expect(response.message).toBe("Here are the user's items");
    })
  })

  describe('PUT /:id', () => {
    it('should return 200', async () => {
      const res = await request(server).put('/api/users/5').send({username: 'new test'});
      expect(res.status).toBe(200);
    })

    it('message should be - "User successfully updated"', async () => {
      const res = await request(server).put('/api/users/5').send({username: 'new test2'});
      let response = JSON.parse(res.text)
      expect(response.message).toBe("User successfully updated");
    })
  })

  describe('DELETE /:id', () => {
    it('should return 200', async () => {
      const res = await request(server).delete('/api/users/5');
      expect(res.status).toBe(200);
    })

    it('message should be - "User successfully deleted"', async () => {
      const res = await request(server).delete('/api/users/6');
      let response = JSON.parse(res.text)
      expect(response.message).toBe("User successfully deleted");
    })
  })
})
