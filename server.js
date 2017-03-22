var express = require('express');
var app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 8080, function() {
	console.log('your app is listening on port 8080')
});