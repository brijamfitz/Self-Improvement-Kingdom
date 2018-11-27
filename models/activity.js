module.exports = function (sequelize, DataType) {
    var Activity = sequelize.define("Activity", {
        actor : {
            type: DataType.STRING,
            allowNull: false,
        },
        category: {
            type: DataType.ENUM('task', 'battle', 'friend'),
            allowNull: false,
        } ,
        action: {
            type: DataType.STRING,
            allowNUll: false,
        }
    });
    return Activity;
}