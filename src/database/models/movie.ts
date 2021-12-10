import { Model, Optional, DataTypes, Association } from 'sequelize';
import { sequelize } from '.';
import { FavMovie } from './favMovie';

export enum ResponseState {
  True = 'True',
  False = 'False',
}

interface MovieAttributes {
  id: number;
  comment: string;
  personal_score: number;
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  poster: string;
  metascore: string;
  imdb_rating: string;
  imdb_votes: string;
  imdb_id: string;
  type: string;
  dvd: string;
  box_office: string;
  production: string;
  website: string;
  response: ResponseState;
  is_favourite?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface MovieCreationAttributes
  extends Optional<
    MovieAttributes,
    | 'id'
    | 'comment'
    | 'personal_score'
    | 'year'
    | 'rated'
    | 'released'
    | 'runtime'
    | 'genre'
    | 'director'
    | 'writer'
    | 'actors'
    | 'plot'
    | 'language'
    | 'country'
    | 'awards'
    | 'poster'
    | 'metascore'
    | 'imdb_rating'
    | 'imdb_votes'
    | 'imdb_id'
    | 'type'
    | 'dvd'
    | 'box_office'
    | 'production'
    | 'website'
    | 'response'
    | 'is_favourite'
    | 'createdAt'
    | 'updatedAt'
  > {}

export class Movie
  extends Model<MovieAttributes, MovieCreationAttributes>
  implements MovieAttributes
{
  public id!: number;

  public comment!: string;

  public personal_score!: number;

  public title!: string;

  public year!: string;

  public rated!: string;

  public released!: string;

  public runtime!: string;

  public genre!: string;

  public director!: string;

  public writer!: string;

  public actors!: string;

  public plot!: string;

  public language!: string;

  public country!: string;

  public awards!: string;

  public poster!: string;

  public metascore!: string;

  public imdb_rating!: string;

  public imdb_votes!: string;

  public imdb_id!: string;

  public type!: string;

  public dvd!: string;

  public box_office!: string;

  public production!: string;

  public website!: string;

  public response!: ResponseState;

  public readonly is_favourite?: boolean;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly favourites?: FavMovie[];

  public static associations: {
    favourites: Association<Movie, FavMovie>;
  };
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    comment: {
      type: new DataTypes.TEXT(),
    },
    personal_score: {
      type: new DataTypes.FLOAT(),
    },
    title: {
      type: new DataTypes.STRING(64),
    },
    year: {
      type: new DataTypes.STRING(32),
    },
    rated: {
      type: new DataTypes.STRING(32),
    },
    released: {
      type: new DataTypes.STRING(32),
    },
    runtime: {
      type: new DataTypes.STRING(32),
    },
    genre: {
      type: new DataTypes.STRING(64),
    },
    director: {
      type: new DataTypes.STRING(128),
    },
    writer: {
      type: new DataTypes.STRING(128),
    },
    actors: {
      type: new DataTypes.STRING(255),
    },
    plot: {
      type: new DataTypes.TEXT(),
    },
    language: {
      type: new DataTypes.STRING(255),
    },
    country: {
      type: new DataTypes.STRING(255),
    },
    awards: {
      type: new DataTypes.TEXT(),
    },
    poster: {
      type: new DataTypes.STRING(255),
    },
    metascore: {
      type: new DataTypes.STRING(32),
    },
    imdb_rating: {
      type: new DataTypes.STRING(32),
    },
    imdb_votes: {
      type: new DataTypes.STRING(32),
    },
    imdb_id: {
      type: new DataTypes.STRING(32),
    },
    type: {
      type: new DataTypes.STRING(32),
    },
    dvd: {
      type: new DataTypes.STRING(32),
    },
    box_office: {
      type: new DataTypes.STRING(32),
    },
    production: {
      type: new DataTypes.STRING(32),
    },
    website: {
      type: new DataTypes.STRING(32),
    },
    response: {
      type: new DataTypes.STRING(32),
    },
    is_favourite: {
      type: DataTypes.VIRTUAL,
      get() {
        return !!this.favourites?.length;
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
    tableName: 'movies',
    sequelize,
  },
);

Movie.hasMany(FavMovie, {
  foreignKey: 'movie_id',
  onDelete: 'CASCADE',
  as: 'favourites',
});

FavMovie.belongsTo(Movie, { foreignKey: 'movie_id' });
