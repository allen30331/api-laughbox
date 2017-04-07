const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Post} = require('../models/models');

//Gets all posts
router.get('/', (req,res) => {
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




//Create post
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


//Update Post
router.put('/:id', (req,res) => {
	console.log('you updated a post');

	const toUpdate = {};
	const updateableFields = ['title', 'categories', 'content'];

	updateableFields.forEach(field => {
		if (field in req.body) {
			toUpdate[field] = req.body[field];
		}

		Post
			.findByIdAndUpdate(req.params.id, {$set: toUpdate})
			.exec()
			.then(post => res.status(204).end())
			.catch(err => res.status(500).json({message: 'Internal server error'}));
	});
});




//Delete post
router.delete('/:id', (req,res) => {
	console.log('you delted a post');
	
	Post 
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(() => res.status(204).end())
		.catch(err => res.status(500).json({message: 'there was an error'}));
}); 


module.exports = router;