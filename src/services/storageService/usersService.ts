import bcrypt from 'bcryptjs';
import { ForeignKeyConstraintError } from 'sequelize/dist';
import { Role, User } from '../../database/models/user';
import { FavMovie } from '../../database/models/favMovie';

class UsersService {
  async get(userId: number) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      include: {
        model: FavMovie,
        as: 'fav_movies',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    });

    return user || { result: false, error: 'User was not found' };
  }

  async getAll() {
    const users = await User.findAll({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      raw: true,
    });

    return users;
  }

  async create(email: string, password: string) {
    const [user, isCreated] = await User.findOrCreate({
      where: { email },
      defaults: {
        email,
        password,
        role: Role.user,
      },
      raw: true,
    });

    return isCreated
      ? { id: user.id }
      : { result: false, error: 'Email is already in use' };
  }

  async find(email: string, password: string) {
    const user = await User.findOne({ where: { email }, raw: true });

    if (!user) return { result: false, error: 'User was not found', status: 404 };

    if (!bcrypt.compareSync(password, user.password)) {
      return { result: false, error: 'Invalid password', statue: 422 };
    }

    return user;
  }

  async setFavourite(userId: number, movieId: number) {
    try {
      const [favMovie, isCreated] = await FavMovie.findOrCreate({
        where: { user_id: userId, movie_id: movieId },
        raw: true,
      });

      return isCreated
        ? { fav_movie_id: favMovie.id }
        : { result: false, error: 'Movie is already selected as favourite' };
    } catch (error) {
      if (error instanceof ForeignKeyConstraintError) {
        return { result: false, error: `There is no movie with ID of ${movieId}` };
      }
      return Promise.reject(error);
    }
  }
}

export const users = new UsersService();
