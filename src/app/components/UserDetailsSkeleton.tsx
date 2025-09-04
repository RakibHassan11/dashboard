import React from 'react';

const UserDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button Skeleton */}
        <div className="h-10 w-32 bg-muted/30 rounded-lg mb-8"></div>
        
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-10 bg-muted/30 rounded w-1/3 mb-2"></div>
          <div className="h-5 bg-muted/20 rounded w-1/2"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info Skeleton */}
            <div className="dashboard-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-6 w-6 bg-muted/30 rounded-full"></div>
                <div className="h-6 bg-muted/30 rounded w-48"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-muted/20 rounded w-1/3"></div>
                    <div className="h-5 bg-muted/30 rounded w-5/6"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Skeleton */}
            <div className="dashboard-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-6 w-6 bg-muted/30 rounded-full"></div>
                <div className="h-6 bg-muted/30 rounded w-48"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-muted/20 rounded w-1/3"></div>
                    <div className="h-5 bg-muted/30 rounded w-5/6"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Skeleton */}
            <div className="dashboard-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-6 w-6 bg-muted/30 rounded-full"></div>
                <div className="h-6 bg-muted/30 rounded w-48"></div>
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-muted/20 rounded w-1/3"></div>
                    <div className="h-5 bg-muted/30 rounded w-5/6"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Location Skeleton */}
            <div className="dashboard-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-6 w-6 bg-muted/30 rounded-full"></div>
                <div className="h-6 bg-muted/30 rounded w-24"></div>
              </div>
              <div className="aspect-square bg-muted/30 rounded-lg mb-4"></div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="h-4 bg-muted/50 rounded w-1/2 mb-2"></div>
                <div className="space-y-1">
                  <div className="h-4 bg-muted/30 rounded w-3/4"></div>
                  <div className="h-4 bg-muted/30 rounded w-2/3"></div>
                </div>
              </div>
            </div>

            {/* Quick Stats Skeleton */}
            <div className="dashboard-card p-6">
              <div className="h-6 bg-muted/30 rounded w-32 mb-4"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center py-2">
                    <div className="h-4 bg-muted/30 rounded w-1/3"></div>
                    <div className="h-5 bg-muted/30 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsSkeleton;
