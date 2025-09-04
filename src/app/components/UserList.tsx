// 🚀 Animated User List with buttery-smooth animations!

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/user';

interface UserListProps {
  users: User[];
  loading: boolean;
}

const USERS_PER_PAGE = 5;

const UserList: React.FC<UserListProps> = ({ users, loading }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 🔍 Search filtering with real-time results
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);

  // 🎯 Handle user selection
  const handleUserClick = (userId: number) => {
    navigate(`/users/${userId}`);
  };

  // 📑 Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-background p-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* 🎨 Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-text">User Management</h1>
          </div>
          <p className="text-muted-foreground text-lg">Manage and explore user profiles</p>
        </motion.div>

        {/* 🔍 Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="dashboard-card p-6 mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input pl-10"
            />
          </div>
        </motion.div>

        {/* 📊 Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="dashboard-card overflow-hidden"
        >
          {/* Table Header */}
          <div className="bg-muted/30 px-6 py-4 border-b border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              <div className="md:col-span-3">Name</div>
              <div className="hidden md:block md:col-span-4">Email</div>
              <div className="hidden md:block md:col-span-3">Phone</div>
              <div className="hidden md:block md:col-span-2">Company</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border/50">
            <AnimatePresence mode="wait">
              {paginatedUsers.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-6 py-12 text-center text-muted-foreground"
                >
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>No users found matching your search.</p>
                </motion.div>
              ) : (
                paginatedUsers.map((user, index) => (
                  <div key={user.id} className="overflow-hidden">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        scale: 1.01,
                        backgroundColor: "rgba(var(--primary-rgb), 0.05)",
                        transition: { duration: 0.2 }
                      }}
                      className="table-row px-6 py-4 cursor-pointer origin-center"
                      onClick={() => handleUserClick(user.id)}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        {/* Name Column */}
                        <div className="md:col-span-3 flex flex-col min-w-0">
                          <span className="font-semibold text-foreground truncate">{user.name}</span>
                          <span className="text-sm text-muted-foreground truncate">@{user.username}</span>
                        </div>
                        
                        {/* Email Column - Mobile: show below name */}
                        <div className="md:col-span-4 md:flex md:items-center min-w-0">
                          <span className="text-sm md:text-base text-foreground truncate">{user.email}</span>
                        </div>
                        
                        {/* Phone Column - Hidden on mobile */}
                        <div className="hidden md:flex md:col-span-3 md:items-center min-w-0">
                          <span className="text-sm text-muted-foreground truncate">{user.phone}</span>
                        </div>
                        
                        {/* Company Column - Hidden on mobile */}
                        <div className="hidden md:flex md:col-span-2 md:items-center min-w-0">
                          <span className="text-sm font-medium text-foreground truncate">{user.company.name}</span>
                        </div>

                        {/* Mobile: Show additional info */}
                        <div className="md:hidden mt-2 pt-2 border-t border-border/30">
                          <div className="flex justify-between text-sm text-muted-foreground gap-2">
                            <span className="truncate flex-1">{user.phone}</span>
                            <span className="font-medium truncate flex-1 text-right">{user.company.name}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="px-6 py-4 border-t border-border/50 flex items-center justify-between"
            >
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + USERS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} users
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-border hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-3 py-1 text-sm font-medium">
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-border hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// 💀 Loading skeleton component
const LoadingState = () => (
  <div className="min-h-screen bg-background p-6">
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="loading-pulse h-10 w-64 mb-2"></div>
        <div className="loading-pulse h-6 w-96"></div>
      </div>
      
      <div className="dashboard-card p-6 mb-6">
        <div className="loading-pulse h-12 w-full rounded-lg"></div>
      </div>
      
      <div className="dashboard-card">
        <div className="p-6 border-b border-border/50">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="loading-pulse h-4 w-20"></div>
            ))}
          </div>
        </div>
        <div className="divide-y divide-border/50">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-6">
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="loading-pulse h-6 w-full"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default UserList;