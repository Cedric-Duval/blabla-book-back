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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Review',
    tableName: 'review',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'book_id'],
      }
    ]
  }
);