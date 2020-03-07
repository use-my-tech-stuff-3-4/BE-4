const db = require('../data/dbConfig.js');
const request = require('supertest');
const server = require('../server.js');

describe('server.js', () => {
  beforeAll(async () => {
    await db('items').truncate();
  });

  describe('POST /', () => {
    it('should return 201', async () => {
      const res = await request(server).post('/api/items').send({name: 'Portable Charger2', description: 'Recharge your devices on the go', price: 20, price_type: 'hour', img_url: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6348/6348848_sa.jpg', user_id: 2});
      expect(res.status).toBe(201);
    })

    it('message should be - "Item successfully created"', async () => {
      const res = await request(server).post('/api/items').send({name: 'Portable Charger3', description: 'Recharge your devices on the go', price: 30, price_type: 'hour', img_url: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6348/6348848_sa.jpg', user_id: 3});
      let response = JSON.parse(res.text)
      expect(response.message).toBe("Item successfully created");
    })
  })

  describe('GET /', () => {
    it('should return 200', async () => {
      const res = await request(server).get('/api/items');
      expect(res.status).toBe(200);
    })

    it('message should be - "Here are the items"', async () => {
      const res = await request(server).get('/api/items');
      let response = JSON.parse(res.text)
      expect(response.message).toBe("Here are the items");
    })
  })

  describe('GET /:id', () => {
    it('should return 200', async () => {
      const res = await request(server).get('/api/items/1');
      expect(res.status).toBe(200);
    })

    it('message should be - "Here is the item"', async () => {
      const res = await request(server).get('/api/items/2');
      let response = JSON.parse(res.text)
      expect(response.message).toBe("Here is the item");
    })
  })

  describe('PUT /:id', () => {
    it('should return 200', async () => {
      const res = await request(server).put('/api/items/13').send({name: 'high tech'});
      expect(res.status).toBe(200);
    })

    it('message should be - "Item successfully updated"', async () => {
      const res = await request(server).put('/api/items/14').send({price: 50});
      let response = JSON.parse(res.text)
      expect(response.message).toBe("Item successfully updated");
    })
  })

  describe('DELETE /:id', () => {
    it('should return 200', async () => {
      const res = await request(server).delete('/api/items/13');
      expect(res.status).toBe(200);
    })

    it('message should be - "Item successfully deleted"', async () => {
      const res = await request(server).delete('/api/items/14');
      let response = JSON.parse(res.text)
      expect(response.message).toBe("Item successfully deleted");
    })
  })
})
