var express = require('express');
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(3000);

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'project_node'
});

connection.connect(function(err) {
	if (err) {
		console.log('not connect');
	} else {
		console.log('connected');
	}
});


// List

app.get("/", function(req, res){
	connection.query('SELECT * FROM product', function(err, rows, fields) {
		if (!err)
			res.render("index",{data:rows});
		else
			console.log('not connected');
	});
});


// Add

app.get("/add", function(req, res){
	res.render("add");
});


app.post('/add', urlencodedParser, function (req, res) {
	var post = {
		name: req.body.name,
		price: req.body.price,
		content: req.body.content
	};
	connection.query('insert into product SET ?', post, function(err, rows, fields) {
		if (!err)
			res.redirect("../");
		else
			console.log('Not Success');
	});
})


// Edit

app.get("/edit/:id", function(req, res){
	var id = req.params.id;
	connection.query('SELECT * FROM product WHERE id = ?', [id], function(err, rows, fields) {
		if (!err)
			//console.log(rows);
		res.render("edit",{data:rows});
		else
			res.end();
		console.log('not connected');
	});
});

app.post("/edit/:id",urlencodedParser, function(req, res){

	var id = req.params.id;

	var post = {
		name: req.body.name,
		price: req.body.price,
		content: req.body.content
	};

	connection.query('UPDATE product SET ? WHERE id = ?', [post,id], function(err, rows, fields) {
		if (!err)
			//console.log(Success);
		res.redirect("../");
		else
			console.log('Not Success');
	});
});


// Delete

app.get("/delete/:id", function(req, res){
	var id = req.params.id;
	connection.query('DELETE FROM product WHERE id = ?', [id], function(err, rows, fields) {
		if (!err)
			//console.log(Success);
		res.redirect("../");
		else
			console.log('Not Success');
	});
});


