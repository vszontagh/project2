var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('forum.db');

db.run('INSERT INTO users(username,password, avatar, admin) VALUES (?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?)', 
  'Jake','Secret','https://pbs.twimg.com/profile_images/480411834/John_Avatar.jpg', 'yes',
  'Aaron','Secret','http://www.binarytradingforum.com/core/image.php?userid=9&dateline=1355299254','no',
  'Ann','Secret','https://pbs.twimg.com/profile_images/1481054316/ilona_gravatar_400x400.png','no',
  'John','Secret','https://zohodiscussions.com/getCustomFile.do?fileId=2266000001344499&forumGroupId=2266000000002001','no',
  'Andy','Secret','https://www.google.com/search?q=john+avatar&biw=1129&bih=767&source=lnms&tbm=isch&sa=X&ved=0CAYQ_AUoAWoVChMI9q2N5euuxwIVjJqACh1_CQqQ#tbm=isch&q=forum+avatar+image&imgdii=I8RYMOR5vsIgTM%3A%3BI8RYMOR5vsIgTM%3A%3Ba2nyL6My5_3ciM%3A&imgrc=I8RYMOR5vsIgTM%3A','no',
  function (err){
    if (err) {
      throw err;
    }
  }
);

db.run('INSERT INTO topics (u_id, topic, vote,num_of_posts, cat_id) VALUES (?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?)', 
  1,'Brooklyn Sneaker Culture ',0,1,1,
  2,'Pom Pom Mirror',0,1,1,
  3,'US Open Tennis',0,1,1,
  4,'Tue Thai',0,1,2,
  5,'Hillstones',0,1,2,
  6,'Ichi Umi',0,1,2,
  7,'Tonic',0,1,3,
  8,'Ink 48',0,1,3,
  9,'Eli Tahari Sample Sale',0,1,4,
  function (err){
    if (err) {
      throw err;
    }
  }
);

db.run('INSERT INTO categories(name) VALUES (?),(?),(?),(?)',
  'Exhibits & events',
  'Restaurants',
  'Bars',
  'Hot deals',
  function (err){
    if (err) {
      throw err;
    }
  }
);

db.run('INSERT INTO posts(t_id,username,post) VALUES (?,?,?),(?,?,?),(?,?,?),(?,?,?),(?,?,?),(?,?,?),(?,?,?),(?,?,?),(?,?,?)',
  1,'Jake','Hey guys - just been to the Sneaker Culture exhibit - really cheap entry fee & a must see if you are in to sneakers. They had every trendsetting sneaker from the last 40 years including every single Air Jordan!',
  2,'Aaron','Wow, I didn’t expect to like this one so much. Pretty quirky interactive art but really cool - a mirror made of pom poms that reflects your image if you stand in front of it.',
  3,'John','Incredible - really fun event, got to see 3 top players play today and only had to pay $20 for my entry fee. ',
  4,'Aaron','Can’t believe I just had a delicious three course Thai meal for $9!',
  5,'Andy','Great restaurant, a bit pricey but really innovative food',
  6,'Jake','If anyone likes eating lots - this is the place to be! Just had 3 FULL plates of sushi and desert for $35. ',
  7,'John','Huge soccer fan here - saw some great Soccer World Cup matches here, fantastic atmosphere ',
  8,'Aaron','Great rooftop bar, good company, spectacular views of Manhattan - what more could you ask for?',
  9,'Ann','Alert - all girls who want 90% off designer gear should check this out immediately, limited stock',
  function (err){
    if (err) {
      throw err;
    }
  }
);