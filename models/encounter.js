module.exports = function(sequelize, DataTypes) {
    var Encounter = sequelize.define("Encounter", {

        knightCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        mageCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        archerCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        encounterDesc: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    Encounter.associate = function(models) {
        Encounter.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Encounter;

};