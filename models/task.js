module.exports = function (sequelize, DataTypes) {
    var Task = sequelize.define("Task", {
        //stores the name of the task
        taskName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        //stores the body of the text describing task
        taskBody: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        //assigned difficulty value by the user
        taskDifficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        taskCompleted: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    });

    Task.associate = function(models) {
        //this sets which user owns the current task
        Task.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Task;
};