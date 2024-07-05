// test/ticket.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Asegúrate de exportar tu aplicación Express en app.js
const { expect } = chai;

chai.use(chaiHttp);

describe('Ticket Model Tests', () => {
  it('should create a new ticket', (done) => {
    chai.request(app)
      .post('/carts/cart_id/purchase')
      .set('Authorization', 'Bearer YOUR_JWT_TOKEN')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('ticket');
        expect(res.body.ticket).to.have.property('userId');
        expect(res.body.ticket).to.have.property('cartId');
        expect(res.body.ticket).to.have.property('total');
        done();
      });
  });
});
