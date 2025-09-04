import React from 'react';
import { motion } from 'framer-motion';
import { User } from '@/types/user';

interface UserDetailsProps {
  user: User;
  onBack: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, onBack }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

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
  };

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
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
      >
        {/* Header */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white"
        >
          <motion.button 
            variants={itemVariants}
            onClick={onBack}
            whileHover={{ x: -3 }}
            className="flex items-center text-white hover:text-gray-200 mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Users
          </motion.button>
          <motion.div 
            variants={itemVariants}
            className="flex items-center"
          >
            <div>
              <motion.h1 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold"
              >
                User Details
              </motion.h1>
              <motion.p 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-blue-100"
              >
                 Find user info
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* User Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6"
        >
          <motion.h2 
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-semibold text-gray-800 mb-4"
          >
            Personal Information
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            {[
              { label: 'Name', value: user.name },
              { label: 'Username', value: user.username },
              { label: 'Email', value: user.email },
              { label: 'Phone', value: user.phone },
              { 
                label: 'Website', 
                value: user.website,
                isLink: true,
                href: `https://${user.website}`
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 5 }}
                className="bg-gray-50 p-4 rounded-lg transition-all duration-200"
              >
                <h3 className="text-sm font-medium text-gray-500">{item.label}</h3>
                {item.isLink ? (
                  <a 
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-block mt-1"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-900 mt-1">{item.value}</p>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.h2 
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl font-semibold text-gray-800 mb-4"
          >
            Address
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            {[
              { label: 'Street', value: user.address.street },
              { label: 'Suite', value: user.address.suite },
              { label: 'City', value: user.address.city },
              { label: 'Zipcode', value: user.address.zipcode },
              { 
                label: 'Coordinates', 
                value: `${user.address.geo.lat}, ${user.address.geo.lng}`,
                fullWidth: true
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`bg-gray-50 p-4 rounded-lg transition-all duration-200 ${item.fullWidth ? 'md:col-span-2' : ''}`}
              >
                <h3 className="text-sm font-medium text-gray-500">{item.label}</h3>
                <p className="text-gray-900 mt-1">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.h2 
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl font-semibold text-gray-800 mb-4"
          >
            Company
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { label: 'Name', value: user.company.name, className: 'font-medium' },
              { label: 'Catch Phrase', value: user.company.catchPhrase, className: 'italic' },
              { label: 'Business', value: user.company.bs }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  y: -5,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
                className="bg-gray-50 p-4 rounded-lg transition-all duration-200 hover:bg-white"
              >
                <h3 className="text-sm font-medium text-gray-500">{item.label}</h3>
                <p className={`text-gray-900 mt-1 ${item.className || ''}`}>
                  {item.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default UserDetails;