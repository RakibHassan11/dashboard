import React from 'react';

const UserListSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Search Bar Skeleton */}
      <div className="animate-pulse bg-muted/30 h-12 rounded-lg w-full max-w-md mb-6"></div>
      
      {/* Table Header Skeleton */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-muted/30 rounded-t-lg">
        <div className="h-4 bg-muted/50 rounded col-span-3"></div>
        <div className="h-4 bg-muted/50 rounded col-span-4"></div>
        <div className="h-4 bg-muted/50 rounded col-span-3"></div>
        <div className="h-4 bg-muted/50 rounded col-span-2"></div>
      </div>
      
      {/* Table Rows Skeleton */}
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 rounded-lg border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-3 space-y-2">
                <div className="h-5 bg-muted/30 rounded w-3/4"></div>
                <div className="h-4 bg-muted/20 rounded w-1/2"></div>
              </div>
              <div className="md:col-span-4">
                <div className="h-5 bg-muted/30 rounded w-5/6"></div>
              </div>
              <div className="hidden md:block md:col-span-3">
                <div className="h-5 bg-muted/30 rounded w-2/3"></div>
              </div>
              <div className="hidden md:block md:col-span-2">
                <div className="h-5 bg-muted/30 rounded w-4/5"></div>
              </div>
              <div className="md:hidden mt-2 pt-2 border-t border-border/30">
                <div className="flex justify-between">
                  <div className="h-4 bg-muted/30 rounded w-1/3"></div>
                  <div className="h-4 bg-muted/30 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Skeleton */}
      <div className="flex justify-between items-center mt-6">
        <div className="h-4 bg-muted/30 rounded w-48"></div>
        <div className="flex items-center space-x-2">
          <div className="h-9 w-9 bg-muted/30 rounded-lg"></div>
          <div className="h-9 w-16 bg-muted/30 rounded-lg"></div>
          <div className="h-9 w-9 bg-muted/30 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default UserListSkeleton;
