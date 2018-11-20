const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        //stores whatever username the user submitted
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        //stores whatever password the user submitted
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        //url to profile picture, defaults to google on User creation
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // path to castel icon for easy rendering on profile page
        castle: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "./images/castle-1.png"
        },
        //stores the user's active title
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Land Owner",
            validate: {
                len: [1]
            }
        },
        //just a simple 'm' or 'f' to check user's stored gender for title logic
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        //stores how many provinces the user has
        provinceCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                len: [1]
            }
        },
        //stores how many knights the user has
        knightCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 3,
            validate: {
                len: [1]
            }
        },
        //stores how many mages the user has
        mageCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                len: [1]
            }
        },
        //stores how many archers the user has
        archerCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2,
            validate: {
                len: [1]
            }
        },
        //stores information for google account
        googleId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        //google token for validation
        googleToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        //currently unused, used to store potential group id information
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });

    User.associate = function (models) {
        //associating user with their current tasks, deletes on user deletion
        User.hasMany(models.Task, {
            onDelete: "cascade"
        });
    };

    // generating encryption for locally stored passwords
    // the .hook "beforeCreate" runs the encryption function before generating the actual database object
    User.hook("beforeCreate", function(user){
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    // comparing encrypted passwords 
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.associate = function(models) {
        //associates the single encounter for the user
        User.hasOne(models.Encounter, {
            onDelete: "cascade"
        });
    }

    return User;
};