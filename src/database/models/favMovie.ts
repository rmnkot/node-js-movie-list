import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '.';

interface FavMovieAttributes {
  id: number;
  user_id: number;
  movie_id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface FavMovieCreationAttributes
  extends Optional<FavMovieAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class FavMovie
  extends Model<FavMovieAttributes, FavMovieCreationAttributes>
  implements FavMovieAttributes
{
  public id!: number;

  public user_id!: number;

  public movie_id!: number;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static associations: {
    // projects: Association<User, Project>;
  };
}

FavMovie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'movies',
        key: 'id',
      },
    },
    createdAt: {
      type: new DataTypes.DATE(),
      defaultValue: DataTypes.NOW,
      field: 'created_at',
      allowNull: false,
    },
    updatedAt: {
      type: new DataTypes.DATE(),
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
      allowNull: false,
    },
  },
  {
    tableName: 'fav_movies',
    sequelize,
  },
);
