import { DataTypes } from 'sequelize';
import { sequelize } from '../server.js';

export const Board = sequelize.define('Board', {
  id: { type: DataTypes.UUID, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
});

export const Column = sequelize.define('Column', {
  id: { type: DataTypes.UUID, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  order: { type: DataTypes.INTEGER, allowNull: false },
});

export const Card = sequelize.define('Card', {
  id: { type: DataTypes.UUID, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  assignee: { type: DataTypes.STRING },
});

Board.hasMany(Column);
Column.belongsTo(Board);
Column.hasMany(Card);
Card.belongsTo(Column);

export const syncModels = async () => {
  await sequelize.sync();
};
