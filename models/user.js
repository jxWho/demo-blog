var mongodb = require('./db');

function User(user)
{
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
}

module.exports = User;

//store user's information
User.prototype.save = function( callback ) {
  // The document needed to be stored into database
  var user = {
    name: this.name,
    password: this.password,
    email: this.email
  };

  //Open the database
  mongodb.open( function (err, db){
    if(err){
      mongodb.close();
      return callback( err );
    }

    db.collection( 'users', function(err, collection){
      if(err){
        mongodb.close();
        return callback(err);
      }
      //Insert data in to the users collection
      collection.insert( user, {
        safe: true
      }, function(err, user){
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, user[0]);
      });
    });
  });
};
