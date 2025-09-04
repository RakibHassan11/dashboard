import { User, UserListResponse, UserQueryParams } from '@/types/user';
import { get, post, put, del } from '@/utils/api';

const USERS_ENDPOINT = '/users';

export const fetchUsers = async (params?: UserQueryParams): Promise<UserListResponse> => {
  return get(USERS_ENDPOINT, params);
};

export const fetchUserById = async (id: string): Promise<User> => {
  return get(`${USERS_ENDPOINT}/${id}`);
};

export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
  return post(USERS_ENDPOINT, userData);
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  return put(`${USERS_ENDPOINT}/${id}`, userData);
};

export const deleteUser = async (id: string): Promise<void> => {
  return del(`${USERS_ENDPOINT}/${id}`);
};

export const searchUsers = async (query: string): Promise<User[]> => {
  return get(`${USERS_ENDPOINT}/search`, { q: query });
};
