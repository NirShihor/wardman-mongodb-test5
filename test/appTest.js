const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const start = require('../start');
const clientRoutes = require('../routes/clientRoutes');
const { timeout } = require('../server');
var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
var MockMongoose = require('mock-mongoose').MockMongoose;
// const { connect } = require('../routes/clientRoutes');
var mockMongoose = new MockMongoose(mongoose);
const supertest = require('supertest');
const request = supertest(server);

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Tasks API', () => {
  // Test GET all clients route
  describe('GET clients', () => {
    it('It should GET all clients', (done) => {
      chai
        .request(server)
        .get('/api/client/getclients')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          // response.body.length.should.be.eq(4);
          done();
        });
    });
    it('It should NOT GET all clients', (done) => {
      chai
        .request(server)
        .get('/api/client/getclient')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  // Test GET one client route
  describe('Tasks API GET client', () => {
    it('It should GET one client', (done) => {
      chai
        .request(server)
        // with error in url
        .get('/api/client/getclientbyid')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });
    it('It should NOT GET one client', (done) => {
      chai
        .request(server)
        // with error in url
        .get('/api/client/getclientbyi')
        .end((err, response) => {
          response.should.have.status(404);
          response.text.should.be.a('string');
          done();
        });
    });
  });
  // Test GET client by simcard route
  describe('GET client by simcard id', () => {
    it('It should GET one client with that simcard', (done) => {
      chai
        .request(server)
        .get('/api/client/getclientbysimcard')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });
  });

  // Test POST new client route
  before(function (done) {
    mockMongoose.prepareStorage().then(function () {
      mongoose.connect('mongodb://example.com/TestingDB', function (err) {
        // done(err);
      });
    });
    done();
  });
  describe('POST new Client', () => {
    it('It returns 200 response ', (done) => {
      chai
        // instead of .request(server) [will create a new post in database] use superhost(npm package)
        .request(supertest)
        .post('/api/client/addclient')
        .send({
          Client: {
            accountNumber: '5',
            clientName: 'Some Client',
            internalComment: 'Some Comments',
            simcards: [],
          },
        })
        .then((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
        });
      done();
    });
  });
});
