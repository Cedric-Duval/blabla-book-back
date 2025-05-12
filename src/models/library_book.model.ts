import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize.client';

export class LibraryBook extends Model {}

LibraryBook.init(
  {
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'library_book',
  },
);
