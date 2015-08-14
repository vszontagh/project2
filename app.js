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
var name='';
app.post('/jungle/login', function (req, res){
  db.run('INSERT INTO users(username, password, avatar, admin) VALUES(?,?,?,?)', req.body.username, req.body.password, req.body.avatar,'no', function (err){
    if (err){
      throw err;
    } else {
      //console.log(req.body.username);
      name=req.body.username;
      console.log(name);
      res.redirect('/jungle/forum');
    }
  });
});

app.get('/jungle/forum', function (req, res){
  //console.log('im in')
  db.all("SELECT topics.topic,categories.name, posts.post, categories.c_id FROM categories, posts, topics WHERE topics.cat_id=categories.c_id AND topics.t_id=posts.t_id ORDER BY topics.vote ", function (err, row){
    console.log(row);
     console.log(name);
    if (err){
      throw err;
    } else {
      //console.log(row);
      res.render('index.ejs', {table: row}); // table is the temporary storage of the new joined table
    }
  });
  //res.render('index.ejs');
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
  //res.render('newtopic.ejs');
  db.all('SELECT categories.c_id, categories.name FROM categories, topics WHERE categories.c_id=topics.cat_id ORDER BY topics.vote', function (err, row){
    if (err){
      throw err;
    } else {
      console.log(row);
      res.render('newtopic.ejs', {table: row}); // the object of the render
    }
  });
});
//add new topic
app.post('/jungle/forum/:id/new/topic', function (req, res){
  //console.log('topic');
      db.run('INSERT INTO topics(u_id, topic, vote, cat_id) VALUES(?,?,?,?)',name, req.body.topic,0,req.params.id, function (err){
        console.log(name);
        console.log(req.params.id);
        console.log(req.body.topic);
      if (err){
        throw err;
      }
      });
      res.redirect('/jungle/forum');
});

app.get('/jungle/about', function(req, res){
  res.render('about.ejs');
});

// when adding a new post
// have them login every time they post - if else statement

// show route to spec id 
// hinrid of index rout and show route , use req.param to get the cat. id and render all topic  which mathing with it


app.get('/jungle/forum/topic', function (req, res){
  db.all("SELECT * FROM topics ORDER BY topics.vote", function (err, row){
    if (err){
      throw err;
    } else {
      console.log(row);
      res.render('topic.ejs', {table: row});
    }
  });
});
app.get('/jungle/categories', function(req, res){
   db.all("SELECT * FROM categories", function (err, row){
    if (err){
      throw err;
    } else {
      console.log(row);
      res.render('categories.ejs', {table: row});
    }
  });
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
});