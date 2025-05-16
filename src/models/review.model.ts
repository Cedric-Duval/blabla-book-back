import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize.client';

export class Review extends Model {}

Review.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
  },
  {
    sequelize,
    modelName: 'Review',
    tableName: 'review',
    timestamps: true,
  }
);