import 'dotenv/config';
import { Sequelize } from 'sequelize';

if (!process.env.PG_URL) {
  throw new Error("La variable d'environnement PG_URL n'est pas définie");
}

export const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    timestamps: true,
  },
});
