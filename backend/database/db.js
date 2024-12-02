const { Sequelize } = require("sequelize");

const sequelizeUsers = new Sequelize({
	database: "users",
	dialect: "sqlite",
	storage: "./database/users.sqlite",
	logging: false,
});

sequelizeUsers
	.authenticate()
	.then(async () => {
		await sequelizeUsers
			.sync({ alter: true })
			.then(() => console.log("Database is synchronised for users db"));
		console.log("Connection established for users db");
	})
	.catch((err) => console.error("Unable to connect to users database: ", err));

	 
	
// Define the database connection for the loans database
const sequelizeLoans= new Sequelize({
    database: "loans",
    dialect: "sqlite",
    storage: "./database/loans.sqlite",
    logging: false,
});

// Authenticate and sync the orders database
sequelizeLoans
    .authenticate()
    .then(async () => {
        await sequelizeLoans
            .sync({ alter: true }) // You can remove this line if you don't want to sync the orders table schema
            .then(() => console.log("Database is synchronised for loans db"));
        console.log("Connection established for orders db");
    })
    .catch((err) => console.error("Unable to connect to loans database: ", err));

module.exports = { sequelizeUsers, sequelizeLoans };