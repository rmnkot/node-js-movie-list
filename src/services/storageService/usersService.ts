import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { fakeDB, FavouriteMovie, Role } from '../../data/fakeDB';

class UsersService {
  get(userId: string) {
    const user = fakeDB.users.find((item) => item.id === userId);

    return user || { result: false, error: 'User not found' };
  }

  getAll() {
    return fakeDB.users;
  }

  create(email: string, password: string) {
    const generatedId = uuidv4();
    const hashedPassword = bcrypt.hashSync(password, 7);

    const newUser = {
      id: generatedId,
      email,
      password: hashedPassword,
      role: Role.user,
      favouriteMovies: [],
    };

    fakeDB.users.push(newUser);

    return newUser.id;
  }

  find(email: string, password?: string) {
    const user = fakeDB.users.find((item) => {
      if (password) {
        return item.email === email && bcrypt.compareSync(password, item.password);
      }

      return item.email === email;
    });

    return user || { result: false, error: 'User not found' };
  }

  setFavourite(userId: string, { id, name }: FavouriteMovie) {
    const user = fakeDB.users.find((item) => item.id === userId);

    if (!user) return { result: false, error: 'User not found' };

    const data = {
      ...user,
      favouriteMovies: [...user.favouriteMovies, { id, name }],
    };

    const userIdx = fakeDB.users.findIndex((item) => item.id === userId);

    fakeDB.users.splice(userIdx, 1, data);

    return data.favouriteMovies;
  }

  deleteFavourite(userId: string, movieId: string) {
    const user = fakeDB.users.find((item) => item.id === userId);

    if (!user) return;

    const data = {
      ...user,
      favouriteMovies: user.favouriteMovies.filter((movie) => movie.id !== movieId),
    };

    const userIdx = fakeDB.users.findIndex((item) => item.id === userId);

    fakeDB.users.splice(userIdx, 1, data);
  }
}

export const users = new UsersService();
