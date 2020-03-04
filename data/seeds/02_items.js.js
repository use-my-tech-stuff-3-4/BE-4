
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {name: 'High End Camera', description: 'Takes beautiful photos', price: 10, price_type: 'hour', img_url: 'https://i.pinimg.com/originals/34/ce/09/34ce099339efd1d035f648b413765f63.jpg', user_id: 1},
        {name: 'High End Video Game Console', description: 'Plays the best games', price: 100, price_type: 'week', img_url: 'https://gamespot1.cbsistatic.com/uploads/original/1574/15747411/3614974-series-xbox3.jpg', user_id: 3},
        {name: 'High End Lights', description: 'Create amazing lighting', price: 50, price_type: 'day', img_url: 'https://static.bhphoto.com/images/images1000x1000/1514376314_1381601.jpg', user_id: 1},
        {name: 'Oculus Quest', description: 'Virtual reality headset', price: 20, price_type: 'day', img_url: 'https://media.gamestop.com/i/gamestop/10176627/Oculus-Quest-64GB', user_id: 2},
        {name: 'Segway miniPRO', description: 'Self-balancing electric transporter', price: 30, price_type: 'hour', img_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FBalancing-Transporter-10-5-Inch-Pneumatic-Customizable%2Fdp%2FB0749956JC&psig=AOvVaw36fMwfIyqN9vXWjjKyI2mQ&ust=1583341909057000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOi6u7Lm_ucCFQAAAAAdAAAAABAF', user_id: 2},
        {name: 'Nintendo Switch', description: 'Portable gaming console', price: 15, price_type: 'hour', img_url: 'https://images-na.ssl-images-amazon.com/images/I/61JnrafZ7zL._AC_SL1457_.jpg', user_id: 3},
        {name: 'Surround Sound System', description: 'High quality speakers with great volume and bass', price: 40, price_type: 'hour', img_url: 'https://image.made-in-china.com/202f0j00YwoELBPrgWcl/Nice-Produce-Wireless-Super-HiFi-Surround-Sound-Speakers-for-Home.jpg', user_id: 4},
        {name: 'DJI Mini Drone', description: 'Takes breathtaking aerial videos', price: 100, price_type: 'day', img_url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/HNFZ2_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1573236458394', user_id: 4},
        {name: 'PlayStation 4', description: 'Plays the best games', price: 110, price_type: 'week', img_url: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5850/5850905_sd.jpg', user_id: 4},
        {name: 'Epson Home Cinema Projector', description: 'Plays large format movies', price: 50, price_type: 'day', img_url: 'https://static.bhphoto.com/images/images2000x2000/1554822338_1359427.jpg', user_id: 3},
        {name: 'Google Chromecast', description: 'Cast streaming services and media straight to any tv', price: 5, price_type: 'hour', img_url: 'https://cdn.shopify.com/s/files/1/0186/4037/1776/products/googlechromecast_black_side_2048x2048_60edee41-11f4-4973-8c34-f33d808f2450_1200x1200.jpg?v=1577471199', user_id: 2},
        {name: 'Portable Charger', description: 'Recharge your devices on the go', price: 10, price_type: 'day', img_url: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6348/6348848_sa.jpg', user_id: 1},
      ]);
    });
};
