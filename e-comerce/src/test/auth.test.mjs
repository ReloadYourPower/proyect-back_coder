// test/auth.test.js
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, before, it } from 'mocha'; // Asegúrate de importar las funciones de Mocha que necesitas
import app from '../app'; // Asegúrate de exportar tu aplicación Express en app.js

describe('Authentication and Authorization Tests', () => {
  let token;

  before(async () => {
    const chai = await import('chai');
    const chaiHttp = await import('chai-http');
    const app = await import('../app');

    chai.use(chaiHttp);

    // Tu lógica de autenticación previa
    // ...
  });

  it('should get current user with DTO', (done) => {
    chai.request(app)
      .get('/current')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('user');
        done();
      });
  });

  it('should purchase cart', (done) => {
    const cartId = 'cart_id_example';
    chai.request(app)
      .post(`/carts/${cartId}/purchase`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('ticket');
        done();
      });
  });

  it('should not allow unauthorized access', (done) => {
    chai.request(app)
      .get('/protected-endpoint')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
