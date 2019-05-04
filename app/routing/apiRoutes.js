var friends = require("../data/friends");

module.exports = function(app) {

  // show all friends 
  app.get("/api/friends", function(req, res) {
    res.json(friends);
    console.log(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

    // save user details
    var user = req.body;

    // parseInt scores for math
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    // Bff is one with lowest difference in score. default bff is first entry
    var bffIndex = 0;
    var minDiff = 40;

    //  compare user scores with friend scores
     for(var i = 0; i < friends.length; i++) {
      var totDiff = 0;
 
      for(var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totDiff += difference;
      }

      // set bff based on new min score
      if(totDiff < minDiff) {
        bffIndex = i;
        minDiff = totDiff;
      }
    }

    // add user to friend array
    friends.push(user);
    console.log(friends);

    // best friend match
    res.json(friends[bffIndex]);
   
  });
};