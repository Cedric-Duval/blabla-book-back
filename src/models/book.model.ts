import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize.client';

export class Book extends Model {}

Book.init(
  {
    isbn: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },

    title: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    pages: {
      type: DataTypes.INTEGER,
    },

    editor: {
      type: DataTypes.STRING(100),
    },

    publication_year: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: 'book',
    timestamps: false,
  },
);
