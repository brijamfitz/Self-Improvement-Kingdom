module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
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
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        //stores the user's active title
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        //just a simple 'm' or 'f' to check user's stored gender for title logic
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            },
        },
        //stores how many provinces the user has
        provinceCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        //stores how many knights the user has
        knightCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        //stores how many mages the user has
        mageCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        //stores how many archers the user has
        archerCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        //stores information for google account
        googleId: {
            type: DataTypes.STRING
        },
        //currently unused, used to store potential group id information
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });

    // User.associate = function(models) {
    //     //associating user with their current tasks, deletes on user deletion
    //     User.hasMany(models.Task, {
    //       onDelete: "cascade"
    //     });
    //   };

    User.associate = function(models) {
        //associates the single encounter for the user
        User.hasOne(models.Encounter, {
            onDelete: "cascade"
        });
    }

    return User;
};