const { faker } = require('@faker-js/faker');
const Product = require('../models/Product');

const createMockProducts = async () => {
  const products = [];

  for (let i = 0; i < 100; i++) {
    const product = new Product({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      date: faker.date.recent(),
      owner: null,
    });

    products.push(product);
  }

  await Product.insertMany(products);
  console.log('100 mock products created successfully!');
};

module.exports = createMockProducts;
