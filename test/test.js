const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const {app, runServer, closeServer} = require('../server');
const mongoose = require('mongoose');
const {TEST_DATABASE_URL} = require('../config');




function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}


describe('Tests root url', function() {
	before(function() {
		return runServer(TEST_DATABASE_URL);
	});


	afterEach(function() {
		return tearDownDb();
	});


	after(function() {
		return closeServer();
	});



	it('should give status 200 and be html', function() {
		let res; 
		return chai.request(app)
			.get('/')
			.then(function(_res) {
				res = _res;
				res.should.have.status(200);
				res.should.be.html;
			});
	});
});