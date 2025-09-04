'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { User } from '@/types/user';
import { userService } from '@/services/userService';

// Dynamically import components with no SSR
const UserDetails = dynamic(
  () => import('@/app/components/UserDetails'),
  { ssr: false, loading: () => <UserDetailsSkeleton /> }
);

const UserDetailsSkeleton = dynamic(
  () => import('@/app/components/UserDetailsSkeleton'),
  { ssr: false }
);

const UserDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userId = Number(params.id);
        const userData = await userService.getUserById(userId);
        setUser(userData);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchUser();
    }
  }, [params?.id]);

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return <UserDetailsSkeleton />;
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading User</h2>
          <p className="text-gray-600 mb-6">{error || 'User not found'}</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <UserDetails user={user} onBack={handleBack} />;
};

export default UserDetailsPage;