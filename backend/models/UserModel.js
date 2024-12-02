const { DataTypes, Model } = require("sequelize");
const { sequelizeUsers } = require("../database/db.js");


class UserModel extends Model {}

UserModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		salt: {
			type: DataTypes.STRING,
			allowNull: false,
		}
		
	 
	},
	{
		sequelize: sequelizeUsers,
		modelName: "users",
	},
);

module.exports = UserModel;