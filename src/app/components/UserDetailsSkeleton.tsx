import React from 'react';

const UserDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header Skeleton */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <div className="animate-pulse flex items-center space-x-4">
            <div className="h-6 w-6 bg-blue-400 rounded"></div>
            <div className="h-4 w-24 bg-blue-400 rounded"></div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="h-8 w-64 bg-blue-400 rounded"></div>
            <div className="h-4 w-32 bg-blue-300 rounded"></div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-6 space-y-8">
          {/* Personal Info Skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-48 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Address Skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Company Skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsSkeleton;