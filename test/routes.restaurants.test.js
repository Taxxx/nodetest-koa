process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : restaurants', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
  });

  describe('GET /api/v1/restaurants', () => {
    it('should return all restaurants', (done) => {
      chai.request(server)
        .get('/api/v1/restaurants')
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": [3 restaurant objects]}
          res.body.data.length.should.eql(3);
          // the first object in the data array should
          // have the right keys
          res.body.data[0].should.include.keys(
            'id', 'commercialName', 'rating'
          );
          done();
        });
    });
  });

  describe('GET /api/v1/restaurants/:id', () => {
    it('should respond with a single restaurant', (done) => {
      chai.request(server)
        .get('/api/v1/restaurants/1')
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 restaurant object}
          res.body.data[0].should.include.keys(
            'id', 'commercialName', 'rating'
          );
          done();
        });
    });

    it('should throw an error if the restaurant does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/restaurants/9999999')
        .end((err, res) => {
          // there should an error
          should.exist(err);
          // there should be a 404 status code
          res.status.should.equal(404);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "error"}
          res.body.status.should.eql('error');
          // the JSON response body should have a
          // key-value pair of {"message": "That restaurant does not exist."}
          res.body.message.should.eql('That restaurant does not exist.');
          done();
        });
    });
  });

  describe('POST /api/v1/restaurants', () => {
    it('should return the restaurant that was added', (done) => {
      chai.request(server)
        .post('/api/v1/restaurants')
        .send({
          commercialName: 'Casa de Campo',
          rating: 8
        })
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 201 status code
          // (indicating that something was "created")
          res.status.should.equal(201);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 restaurant object}
          res.body.data[0].should.include.keys(
            'id', 'commercialName', 'rating'
          );
          done();
        });
    });

    it('should throw an error if the payload is malformed', (done) => {
      chai.request(server)
        .post('/api/v1/restaurants')
        .send({
          name: 'Don Lucho'
        })
        .end((err, res) => {
          // there should an error
          should.exist(err);
          // there should be a 400 status code
          res.status.should.equal(400);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "error"}
          res.body.status.should.eql('error');
          // the JSON response body should have a message key
          should.exist(res.body.message);
          done();
        });
    });
  });

  describe('PUT /api/v1/restaurants', () => {
    it('should return the restaurant that was updated', (done) => {
      knex('restaurants')
        .select('*')
        .then((restaurant) => {
          const restaurantObject = restaurant[0];
          chai.request(server)
            .put(`/api/v1/restaurants/${restaurantObject.id}`)
            .send({
              rating: 3
            })
            .end((err, res) => {
              // there should be no errors
              should.not.exist(err);
              // there should be a 200 status code
              res.status.should.equal(200);
              // the response should be JSON
              res.type.should.equal('application/json');
              // the JSON response body should have a
              // key-value pair of {"status": "success"}
              res.body.status.should.eql('success');
              // the JSON response body should have a
              // key-value pair of {"data": 1 restaurant object}
              res.body.data[0].should.include.keys(
                'id', 'commercialName', 'rating'
              );
              // ensure the restaurant was in fact updated
              const newRestaurantObject = res.body.data[0];
              newRestaurantObject.rating.should.not.eql(restaurantObject.rating);
              done();
            });
        });
    });

    it('should throw an error if the restaurant does not exist', (done) => {
      chai.request(server)
        .put('/api/v1/restaurants/9999999')
        .send({
          rating: 3
        })
        .end((err, res) => {
          // there should an error
          should.exist(err);
          // there should be a 404 status code
          res.status.should.equal(404);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "error"}
          res.body.status.should.eql('error');
          // the JSON response body should have a
          // key-value pair of {"message": "That restaurant does not exist."}
          res.body.message.should.eql('That restaurant does not exist.');
          done();
        });
    });
  });

  describe('DELETE /api/v1/restaurants/:id', () => {
    it('should return the restaurant that was deleted', (done) => {
      knex('restaurants')
        .select('*')
        .then((restaurants) => {
          const restaurantObject = restaurants[0];
          const lengthBeforeDelete = restaurants.length;
          chai.request(server)
            .delete(`/api/v1/restaurants/${restaurantObject.id}`)
            .end((err, res) => {
              // there should be no errors
              should.not.exist(err);
              // there should be a 200 status code
              res.status.should.equal(200);
              // the response should be JSON
              res.type.should.equal('application/json');
              // the JSON response body should have a
              // key-value pair of {"status": "success"}
              res.body.status.should.eql('success');
              // the JSON response body should have a
              // key-value pair of {"data": 1 restaurant object}
              res.body.data[0].should.include.keys(
                'id', 'commercialName', 'rating'
              );
              // ensure the restaurant was in fact deleted
              knex('restaurants').select('*')
                .then((updatedRestaurants) => {
                  updatedRestaurants.length.should.eql(lengthBeforeDelete - 1);
                  done();
                });
            });
        });
    });
    it('should throw an error if the restaurant does not exist', (done) => {
      chai.request(server)
        .delete('/api/v1/restaurants/9999999')
        .end((err, res) => {
          // there should an error
          should.exist(err);
          // there should be a 404 status code
          res.status.should.equal(404);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "error"}
          res.body.status.should.eql('error');
          // the JSON response body should have a
          // key-value pair of {"message": "That restaurant does not exist."}
          res.body.message.should.eql('That restaurant does not exist.');
          done();
        });
    });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });
});