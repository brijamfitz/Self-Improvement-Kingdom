module.exports = function (sequelize, DataType) {
    var Friend = sequelize.define("Friend", {
        requester: {
            type: DataType.STRING,
            allowNull: false
        },
        status: DataType.ENUM('pending', 'accepted', 'rejected', 'deleted'),
        requestee: {
            type: DataType.STRING,
            allowNull: false
        } 
    });
    return Friend;
}