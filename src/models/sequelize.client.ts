import "dotenv/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    'postgres://blablabook:blablabook@localhost:5432/blablabook',
    {
        define: {
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    }
);