const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Post} = require('./models');

//Gets all posts
router.get('/', function(req,res) {
	console.log('hello');
	Post
		.find()
		.exec()
		.then(posts => {
			res.json(posts.map(post => post.apiRepr()));
		})
		.catch(function(err) {
			console.error(err);
			res.status(500).json({error: 'there was an error'});
		});
});




//Get one post by id
router.get('/:id', (req,res) => {
	console.log('you got one post');

	Post
		.findById(req.params.id)
		.exec()
		.then(posts => res.json(posts.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'there was an error'});
		});
});




//Create Post
router.post('/', (req,res) => {
console.log('this is a post entry');
	Post
		.create({
			title: req.body.title,
			categories: req.body.categories,
			content: req.body.content
		})
		.then(postEntry => res.status(201).json(postEntry.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'there was an error'});	
		});
});


module.exports = router;