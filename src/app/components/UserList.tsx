import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { User } from '../../types/user';

interface UserListProps {
  users: User[];
  loading: boolean;
}

const USERS_PER_PAGE = 5;

const UserList: React.FC<UserListProps> = ({ users, loading }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedSearchTerm, setDisplayedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Debounced search handler
  useEffect(() => {
    const handler = setTimeout(() => {
      if (displayedSearchTerm !== searchTerm) {
        setSearchTerm(displayedSearchTerm);
        setCurrentPage(1);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [displayedSearchTerm, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDisplayedSearchTerm(value);
  };

  // Clear search and reset state
  const handleClearSearch = () => {
    setDisplayedSearchTerm('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    
    const term = searchTerm.toLowerCase().trim();
    return users.filter(user => 
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.username.toLowerCase().includes(term) ||
      user.phone.toLowerCase().includes(term) ||
      user.company.name.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);

  const handleUserClick = (userId: number) => {
    router.push(`/users/${userId}`);
  };

  // Reset to first page on search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) {
    return <div className="text-center py-4 text-gray-500">Loading...</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  } as const;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 10
      }
    }
  } as const;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 p-4 md:p-8"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className="max-w-4xl mx-auto"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-xl p-6 text-white"
        >
          <motion.h1 variants={itemVariants} className="text-2xl sm:text-3xl font-bold mb-2">
            User Management
          </motion.h1>
          <motion.p variants={itemVariants} className="text-sm sm:text-base text-blue-100">
            Browse and manage users
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-4 sm:p-6">
            <div className="mb-4 sm:mb-6 bg-gray-50 p-1 rounded-lg shadow-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <input
                  type="text"
                  value={displayedSearchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-9 pr-8 sm:pl-10 sm:pr-10 py-2 sm:py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  aria-label="Search users"
                  placeholder="Search by name, email, or company..."
                />
                {displayedSearchTerm && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={handleClearSearch}
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 hover:text-gray-600" />
                  </motion.button>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="overflow-x-auto -mx-4 sm:mx-0 pb-16">
                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                  <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Name
                    </th>
                    <th scope="col" className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Email
                    </th>
                    <th scope="col" className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Phone
                    </th>
                    <th scope="col" className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Company
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <AnimatePresence mode="wait">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      No users found matching your search.
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      className="cursor-pointer border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => handleUserClick(user.id)}
                    >
                      <td className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-blue-600">@{user.username}</div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-4 text-gray-700 whitespace-nowrap">{user.email}</td>
                      <td className="px-3 sm:px-4 md:px-6 py-4 text-gray-700 whitespace-nowrap">{user.phone}</td>
                      <td className="px-3 sm:px-4 md:px-6 py-4 text-gray-700 whitespace-nowrap">{user.company.name}</td>
                    </motion.tr>
                  ))
                )}
                  </AnimatePresence>
                </tbody>
                  </table>
                </div>
              </div>

              {totalPages > 1 && (
                <div className="absolute bottom-0 left-0 right-0 px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center bg-transparent sm:bg-white backdrop-blur-0 sm:backdrop-blur-none shadow-none ">
                  <span className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-0">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(startIndex + USERS_PER_PAGE, filteredUsers.length)}
                    </span>{' '}
                    of <span className="font-medium">{filteredUsers.length}</span> {filteredUsers.length === 1 ? 'user' : 'users'}
                  </span>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className={`p-1.5 sm:p-2 rounded-lg text-xs sm:text-sm flex items-center ${
                        currentPage === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="ml-0.5 sm:ml-1 hidden xs:inline">Prev</span>
                    </button>
                    <div className="flex items-center space-x-0.5 sm:space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = currentPage <= 3
                          ? i + 1
                          : currentPage >= totalPages - 2
                            ? totalPages - 4 + i
                            : currentPage - 2 + i;
                        
                        if (page < 1 || page > totalPages) return null;
                        
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm flex items-center justify-center ${
                              currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            aria-label={`Page ${page}`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className={`p-1.5 sm:p-2 rounded-lg text-xs sm:text-sm flex items-center ${
                        currentPage === totalPages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      aria-label="Next page"
                    >
                      <span className="mr-0.5 sm:mr-1 hidden xs:inline">Next</span>
                      <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default UserList;