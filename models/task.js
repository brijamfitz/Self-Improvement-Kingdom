module.exports = function (sequelize, DataTypes) {
    var Task = sequelize.define("Task", {
        //stores the name of the task
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 100]
            }
        },
        //stores the body of the text describing task
        // taskBody: {
        //     type: DataTypes.TEXT,
        //     allowNull: false
        // },
        //assigned difficulty value by the user
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    // Task.associate = function(models) {
    //     //this sets which user owns the current task
    //     Task.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return Task;
};