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
  res.redirect('/jungle/login');
});

// app.get to see all the posts and render them on a template
// app.post to add new comment/ category/topic
// app.post to update/edit a post
// app.delete to delete post ?? only for admins

// render login page
app.get('/jungle/login', function (req, res){
  res.render('login.ejs');
});
// create new user / login
app.post('/jungle/login', function (req, res){
  db.run('INSERT INTO users(username, password, avatar, admin) VALUES(?,?,?,?)', req.body.username, req.body.password, req.body.avatar,'no', function (err){
    if (err){
      throw err;
    } else {
      //console.log(req.body.username);
      res.redirect('/jungle/forum');
    }
  });
});

app.get('/jungle/forum', function (req, res){
  //console.log('im in')
  db.all("SELECT topics.topic,categories.name, posts.post FROM categories, posts, topics WHERE topics.cat_id=categories.c_id AND topics.t_id=posts.t_id ORDER BY topics.vote ", function (err, row){
    if (err){
      throw err;
    } else {
      //console.log(row);
      res.render('index.ejs', {table: row}); // table is the temporary storage of the new joined table
    }
  });
  //res.render('index.ejs');
});

// create new category
app.get('/jungle/forum/new/category', function (req, res){
  res.render('newcat.ejs');
});
// add new category to db
app.post('/jungle/forum/new/category', function (req, res){
  db.run('INSERT INTO categories(name) VALUES(?)', req.body.newcat, function (err){
    if (err){
      throw err;
    }
  });
});
// create new category
app.get('/jungle/forum/:id/new/topic', function (req, res){
  res.render('newtopic.ejs');

});
//add new category to db
app.post('/jungle/forum/:id/new/topic', function (req, res){
  console.log('topic');
  db.all('SELECT categories.c_id, categories.name FROM topics, categories WHERE topics.cat_id=categories.c_id ORDER BY topics.vote', function (req, res){
    if (err){
      throw err;
    } else {
      console.log(row);
      res.render('newtopic.ejs', {table: row});

      db.run('INSERT INTO topics(topic, cat_id) VALUES(?,?)', req.body.newtop,req.params.c_id, function (err){
      if (err){
        throw err;
      }
      });
    }
    res.redirect('/jungle/forum');
  });
});



app.post('/jungle/forum', function (req, res){
  db.all("SELECT * FROM categories INNER JOIN topics ON topics.cat_id=categories.c_id ORDER BY topics.vote ", function (err, row){
    if (err){
      throw err;
    } else {
      console.log(row);
      res.render('index.ejs', {categories: row, topics:row});
    }
  });
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
});