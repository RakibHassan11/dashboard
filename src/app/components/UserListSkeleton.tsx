import React from 'react';

const UserListSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Skeleton */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-xl p-6 text-white mb-6">
          <div className="h-8 w-64 bg-blue-500/50 rounded-md mb-2"></div>
          <div className="h-4 w-80 bg-blue-400/50 rounded"></div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="bg-white p-1 rounded-lg shadow-sm mb-6">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 bg-gray-200 rounded"></div>
            <div className="h-12 w-full pl-10 pr-4 bg-white border border-gray-200 rounded-lg"></div>
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Table Header */}
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm font-medium">
                <th className="py-4 px-6 text-left">Name</th>
                <th className="py-4 px-6 text-left hidden md:table-cell">Email</th>
                <th className="py-4 px-6 text-left hidden md:table-cell">Phone</th>
                <th className="py-4 px-6 text-left hidden md:table-cell">Company</th>
              </tr>
            </thead>
          </table>

          {/* Table Rows */}
          <div className="divide-y divide-gray-100">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-6 hover:bg-gray-50 transition-colors duration-200 animate-pulse">
                <div className="md:hidden space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="hidden md:table-row">
                  <div className="table-cell py-4 px-6">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="table-cell py-4 px-6">
                    <div className="h-5 bg-gray-200 rounded w-5/6"></div>
                  </div>
                  <div className="table-cell py-4 px-6">
                    <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                  </div>
                  <div className="table-cell py-4 px-6">
                    <div className="h-5 bg-gray-200 rounded w-4/5"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-100 bg-gray-50">
            <div className="h-4 bg-gray-200 rounded w-48 mb-2 sm:mb-0"></div>
            <div className="flex items-center space-x-2">
              <div className="h-9 w-9 bg-gray-200 rounded-lg"></div>
              <div className="h-9 w-16 bg-gray-200 rounded-lg"></div>
              <div className="h-9 w-9 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListSkeleton;
