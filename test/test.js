const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const {app, runServer, closeServer} = require('../server');
const mongoose = require('mongoose');

describe('Tests root url', function() {
	before(function() {
		return runServer();
	});

	after(function() {
		return closeServer();
	})



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

