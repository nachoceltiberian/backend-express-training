import { DataTypes } from "sequelize";
import { sequelize } from "../../config/mysql"

const User = sequelize.define(
    "users",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.NUMBER,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
        },
        // deleted: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false,
        // },
    },
    {
        timestamps: true,
    }
);

export default User;