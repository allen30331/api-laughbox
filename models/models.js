const mongoose = require('mongoose');



const postSchema = mongoose.Schema({
	title: {type: String, required: true},
	categories: {type: String, required: true},
	content: {type: String, required: true}
});

postSchema.methods.apiRepr = function() {
	return {
		id: this._id,
		title: this.title,
		categories: this.categories,
		content: this.content
	}
}

const Post = mongoose.model('Posts', postSchema);

module.exports = {Post};