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
      user = this.lastID; // store last user id
      res.redirect('/jungle/categories');
    }
  });
});

app.get('/jungle/forum', function (req, res){
  //console.log('im in')
  db.all("SELECT categories.name FROM categories, topics ORDER BY topics.vote DESC", function (err, row){
    // console.log(row);
    //  console.log(name);
    if (err){
      throw err;
    } else {
      //console.log(row);
      res.render('index.ejs', {table: row}); // table is the temporary storage of the new joined table
    }
  });
    db.all("SELECT topics.topic FROM topics ORDER BY topics.vote DESC", function (err, row){
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
  db.all("SELECT * FROM categories INNER JOIN topics ON topics.cat_id=categories.c_id ORDER BY topics.vote DESC", function (err, row){
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

// add new category
app.post('/jungle/categories', function(req, res){
  db.run('INSERT INTO categories(name) VALUES(?)', req.body.newcat, function (err){
    if (err){
      throw err;
    }
  }); res.redirect('/jungle/categories');
});

// display all the topics
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

app.post('/jungle/topic/:t_id/posts', function (req, res){
  console.log('topic id');
  console.log(t_id);
  thisTopic = req.params.t_id;
  
  db.run('INSERT INTO posts(t_id, post) VALUES(?,?)',thisTopic, req.body.post, function(err){
    if (err){
      throw err;
    } else {
    db.run('UPDATE topics SET num_of_posts=num_of_posts+1 WHERE t_id=?', thisTopic, function (err){
      if (err){
        throw err;
      }
      res.redirect('/jungle/topic/'+thisTopic+'/posts')
      });
    }
  });
});

// render new post.ejs and call the data from the DB
app.get('/jungle/topic/:t_id/new/post', function (req, res){
  console.log('topic id for new post');
  console.log(req.params.t_id);
  db.all('SELECT posts.t_id, posts.post, users.username, FROM posts, users WHERE t_id=?',req.params.t_id, function(err, row){
    if (err) {
      throw err;
    } else {
      res.render('post.ejs', {table: row});
    }
  });
});

app.post('/jungle/topic/:t_id/new/post', function (req, res){
  db.run('INSERT INTO posts(t_id, post) VALUES(?,?)',req.params.t_id, req.body.post, function(err){
    if (err){
      throw err;
    }
  });
});



app.get('/jungle/:id/topic', function (req, res){
  console.log('category id');
  console.log(req.params.id);
  id = req.params.id;
  db.all("SELECT topics.t_id, topics.topic, topics.vote FROM topics WHERE topics.cat_id=?",req.params.id, function (err, row){
    if (err){
      throw err;
    } else {
      // console.log('test for topic output');
      // console.log(row);
      res.render('topic.ejs', {table: row});
    }
  });
});

/// this part is not reached
// add new topic
app.post('/jungle/:id/topic', function(req, res){
  console.log('id is loged');
  console.log(id);

  db.run('INSERT INTO topics(topic, vote, num_of_posts, cat_id) VALUES(?,?,?)',req.body.topic,0,0,req.params.id, function (err){
    if (err){
      throw err;
    }
  }); res.redirect('/jungle/:id/topic');
});



app.listen(3000, function(){
  console.log('Listening on port 3000');
});

