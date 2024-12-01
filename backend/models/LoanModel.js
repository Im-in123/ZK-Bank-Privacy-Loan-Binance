// models/LoanModel.js
import { DataTypes, Model } from "sequelize";
import { sequelizeLoans } from "../database/db.js";

class LoanModel extends Model {}

LoanModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Referring to the User table
        key: "id",
      },
    },
    loanAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    loanTerm: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    loanStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending", // Status can be "pending", "approved", or "rejected"
    },
    approvedAmount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    loanDetails: {
      type: DataTypes.JSONB, // To store additional details like monthly payment, interest, etc.
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: sequelizeLoans,
    modelName: "Loan",
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

export default LoanModel;
