import React from 'react';
import { User } from '@/types/user';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-2">
      <div className="font-bold text-xl mb-2">{user.name}</div>
      <p className="text-gray-700 text-base">
        <span className="font-semibold">Email:</span> {user.email}
      </p>
      <p className="text-gray-700 text-base">
        <span className="font-semibold">Role:</span> {user.role}
      </p>
      {/* Add more user details as needed */}
    </div>
  );
};

export default UserCard;
