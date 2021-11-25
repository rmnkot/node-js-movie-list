import { Model, Optional, DataTypes, Association } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '.';
import { FavMovie } from './favMovie';

export enum Role {
  admin = 'admin',
  user = 'user',
}

export type FavouriteMovie = {
  id: string;
  name: string;
};

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;

  public email!: string;

  public password!: string;

  public role!: Role;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  // public getProjects!: HasManyGetAssociationsMixin<Project>; // Note the null assertions!
  // public addProject!: HasManyAddAssociationMixin<Project, number>;
  // public hasProject!: HasManyHasAssociationMixin<Project, number>;
  // public countProjects!: HasManyCountAssociationsMixin;
  // public createProject!: HasManyCreateAssociationMixin<Project>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly fav_movies?: FavMovie[];

  public static associations: {
    fav_movies: Association<User, FavMovie>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: new DataTypes.STRING(32),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    role: {
      type: new DataTypes.STRING(16),
      allowNull: false,
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
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          // eslint-disable-next-line no-param-reassign
          user.password = bcrypt.hashSync(user.password, 7);
        }
      },
    },
    tableName: 'users',
    sequelize,
  },
);

User.hasMany(FavMovie, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  as: 'fav_movies',
});

FavMovie.belongsTo(User, { foreignKey: 'user_id' });
