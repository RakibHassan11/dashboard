import { User } from '../types/user';
import { userService as api } from '../utils/api';


export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    return await api.getAllUsers();
  },

  getUserById: async (id: number): Promise<User> => {
    return await api.getUserById(id);
  },
};

export default userService;
