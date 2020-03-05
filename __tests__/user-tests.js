const db = require('../data/dbConfig.js');
const request = require('supertest');
const server = require('../server.js');

describe('server.js', () => {
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
})
