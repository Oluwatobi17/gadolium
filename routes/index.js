var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var db = require('monk')('mongodb://Gadoo:ganiu123456@ds239368.mlab.com:39368/gadolinium')

var post = db.get('blog')

/* GET home page. */
router.get('/', function(req, res, next){
	post.find({}, function(err, comments){
		res.render('index', { title: 'Home page: Welcome to DacSample home page', comments: comments});
	});
});

/* POST /comment */
router.post('/comment', function(req, res, next){
	var comments = {
		name: req.body.name,
		email: req.body.email,
		body: req.body.body
	}
	post.insert(comments, function(err, success){
		req.flash('success', 'Comment added!!!');
		res.redirect('/');
	});
});

/* GET about page. */
router.get('/about', function(req, res, next) {
	res.render('about', { title: 'This is about DacSample.com' });
});
module.exports = router;
