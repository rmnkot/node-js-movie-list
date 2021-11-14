import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { fakeDB, Role } from '../../data/fakeDB';

class UsersService {
  get = (id: string) => {
    /** */
  };

  getAll = () => {
    return fakeDB.users;
  };

  create = (email: string, password: string) => {
    const generatedId = uuidv4();
    const hashedPassword = bcrypt.hashSync(password, 7);

    const newUser = {
      id: generatedId,
      email,
      password: hashedPassword,
      role: Role.user,
    };

    fakeDB.users.push(newUser);

    return newUser;
  };

  find = (email: string, password?: string) => {
    const user = fakeDB.users.find((item) => {
      if (password) {
        return item.email === email && bcrypt.compareSync(password, item.password);
      }

      return item.email === email;
    });

    return user || { result: false, error: 'User not found' };
  };
}

export const users = new UsersService();
