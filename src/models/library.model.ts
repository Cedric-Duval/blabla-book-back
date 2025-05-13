import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize.client';

export class Library extends Model {}

Library.init(
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'library',
  },
);
