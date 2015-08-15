var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('forum.db');

db.run('INSERT INTO users(username,password, avatar, admin) VALUES (?,?,?,?)', 
  'Vadmin','Secret','https://pbs.twimg.com/profile_images/1481054316/ilona_gravatar_400x400.png', 'yes',
  function (err){
    if (err) {
      throw err;
    }
  }
);

db.run('INSERT INTO topics (u_id, topic, vote, num_of_posts, cat_id) VALUES (?,?,?,?,?)', 
  1,'Forum Policy',0,0,1,
  function (err){
    if (err) {
      throw err;
    }
  }
);

db.run('INSERT INTO categories(name) VALUES (?),(?),(?),(?),(?)',
  'Policy',
  'Sport',
  'Food',
  'Exhibitions',
  function (err){
    if (err) {
      throw err;
    }
  }
);

db.run('INSERT INTO posts(t_id, post) VALUES (?,?),(?,?),(?,?),(?,?),(?,?)',
  1,'No obscene or profane language is allowed. No personal attack or abusive language is allowed. No Tolls, Dragons and any other creatures are allowed.',
  function (err){
    if (err) {
      throw err;
    }
  }
);