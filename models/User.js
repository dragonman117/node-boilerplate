var bcrypt = require('bcrypt-nodejs')

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            password: {type: DataTypes.STRING }
        },
        {
            hooks: {
                beforeValidate: function(user, opt){
                    var salt = bcrypt.genSaltSync(12);
                    user.password = bcrypt.hashSync(user.password,salt);
                }
            },
            classMethods:{
                validPassword: function(pass1, pass2, done, user){
                    bcrypt.compare(pass1, pass2, function(err, isMatch){
                        if(isMatch){
                            return done(null, user);
                        }else{
                            return done(null, false);
                        }
                    });
                }
            }
        }
    );

    return User
};