const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const {app, runServer, closeServer} = require('../server');
const mongoose = require('mongoose');
const {TEST_DATABASE_URL} = require('../config');
const {Post} = require('../models');
const faker = require('faker');


function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

function seedPostData() {
	console.info('seeding post data');
	const seedData = [];
	for (let i = 1; i <= 10; i++) {
		seedData.push(createPost());
	}
	return Post.insertMany(seedData);

}

function createPost() {
	return {
		title: faker.name.title(),
		categories: faker.lorem.word(),
		content: faker.lorem.paragraph()
	}
}


describe('laugh box API Resource', function() {
	before(function() {
		return runServer(TEST_DATABASE_URL);
	});

	beforeEach(function() {
		return seedPostData();
	})


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


	it('should return all existing posts', function() {
		let res;
		return chai.request(app)
		.get('/posts')
		.then(function(_res) {
			res = _res;
			res.should.have.status(200);
			res.should.be.json;
			return Post.count();
		})
		.then(function(count) {
			res.body.should.have.length.of(count);
		})
	});



	it('should return posts with right fields', function() {
		let resPost;
		return chai.request(app)
			.get('/posts')
			.then(function(res) {
				res.body.forEach(function(post){
					post.should.be.a('object');
					post.should.include.keys('id', 'title', 'categories', 'content');
				});
				resPost = res.body[0];
				return Post.findById(resPost.id);
			})
			.then(function(post) {
				resPost.id.should.equal(post.id);
				resPost.title.should.equal(post.title);
				resPost.categories.should.equal(post.categories);
				resPost.content.should.equal(post.content);
			});
	});
});