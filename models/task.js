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
        // personal: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false
        // },
        // wellness: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false
        // },
        // learning: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false
        // },
        // creativity: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false
        // },
        // exercise: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false
        // },
        // chores: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false
        // },
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