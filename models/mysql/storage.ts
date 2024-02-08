import { DataTypes } from "sequelize";
import { sequelize } from "../../config/mysql"

export const Storage = sequelize.define(
    "storage",
    {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        filename: {
            type: DataTypes.STRING,
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

export default Storage;