var express = require('express');
var app = express();
var ejs = require('ejs');
var fs = require('fs');
var request = require('request');
var bodyParser = require('body-parser');
var urlencodedBodyParcer = bodyParser.urlencoded({extended: false});
var methodOverride = require('method-override');
//var _ = require('underscore');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('forum.db');

app.use(urlencodedBodyParcer);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view_engine', 'ejs');

app.get('/', function (req, res){
  res.redirect('/jungle/about');
});

// renders about page
app.get('/jungle/about', function(req, res){
  res.render('about.ejs');
});


//render login page
app.get('/jungle/login', function (req, res){
  res.render('login.ejs');
});
// create new user / login
app.post('/jungle/login', function (req, res){
  db.run('INSERT INTO users(username, password, avatar, admin) VALUES(?,?,?,?)', req.body.username, req.body.password, req.body.avatar,'no', function (err){
    if (err){
      throw err;
    } else {
      res.redirect('/jungle/categories');
    }
  });
});

app.get('/jungle/forum', function (req, res){
  //console.log('im in')
  db.all("SELECT categories.name FROM categories, topics ORDER BY topics.vote ", function (err, row){
    // console.log(row);
    //  console.log(name);
    if (err){
      throw err;
    } else {
      //console.log(row);
      res.render('index.ejs', {table: row}); // table is the temporary storage of the new joined table
    }
  });
    db.all("SELECT topics.topic FROM topics ORDER BY topics.vote ", function (err, row){
    // console.log(row);
    //  console.log(name);
    if (err){
      throw err;
    } else {
      //console.log(row);
      res.render('index.ejs', {table: row}); // table is the temporary storage of the new joined table
    }
  });
});

app.post('/jungle/forum', function (req, res){
  db.all("SELECT * FROM categories INNER JOIN topics ON topics.cat_id=categories.c_id ORDER BY topics.vote ", function (err, row){
    if (err){
      throw err;
    } else {
      //console.log(row);
      res.render('index.ejs', {categories: row, topics:row});
    }
  });
});

/// display all the categories
app.get('/jungle/categories', function(req, res){
   db.all("SELECT * FROM categories", function (err, row){
    if (err){
      throw err;
    } else {
      //console.log(row);
      res.render('categories.ejs', {table: row});
    }
  });
});
// display all the topics
app.get('/jungle/:id/topic', function (req, res){
  console.log(req.params.id);
  db.all("SELECT topics.t_id, topics.topic FROM topics WHERE topics.cat_id=? ORDER BY topics.vote",req.params.id, function (err, row){
    if (err){
      throw err;
    } else {
      // console.log('test for topic output');
      // console.log(row);
      res.render('topic.ejs', {table: row});
    }
  });
});

app.get('/jungle/topic/:t_id/posts', function (req, res){
  db.all("SELECT posts.t_id, posts.post FROM posts WHERE posts.t_id=?",req.params.t_id, function (err, row){
    if (err){
      throw err;
    } else {
      console.log(row);
      res.render('posts.ejs', {table: row});
    }
  });
});


app.listen(3000, function(){
  console.log('Listening on port 3000');
});

