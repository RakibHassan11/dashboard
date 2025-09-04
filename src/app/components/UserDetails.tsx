// 🎯 Animated User Details with 3D Globe Integration!

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, Globe, Building, MapPin, Hash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User as UserType } from '../types/user';
import ThreeGlobe from './ThreeGlobe';

interface UserDetailsProps {
  user: UserType | null;
  loading: boolean;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return <LoadingState />;
  }

  if (!user) {
    return <ErrorState onBack={() => navigate('/')} />;
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
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-background p-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* 🔙 Back Button */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-6 px-4 py-2 bg-card hover:bg-muted/50 border border-border rounded-lg transition-all duration-200 shadow-button"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">Back to Users</span>
        </motion.button>

        {/* 📋 Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">User Details</h1>
          <p className="text-muted-foreground text-lg">Detailed information about {user.name}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* 👤 Personal Information */}
            <motion.div variants={itemVariants} className="dashboard-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoField
                  icon={<User className="h-4 w-4" />}
                  label="Full Name"
                  value={user.name}
                />
                <InfoField
                  icon={<Hash className="h-4 w-4" />}
                  label="Username"
                  value={`@${user.username}`}
                />
                <InfoField
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={user.email}
                />
                <InfoField
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone"
                  value={user.phone}
                />
                <InfoField
                  icon={<Globe className="h-4 w-4" />}
                  label="Website"
                  value={user.website}
                  link={`https://${user.website}`}
                />
              </div>
            </motion.div>

            {/* 📍 Address Information */}
            <motion.div variants={itemVariants} className="dashboard-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Address Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoField
                  label="Street"
                  value={user.address.street}
                />
                <InfoField
                  label="Suite"
                  value={user.address.suite}
                />
                <InfoField
                  label="City"
                  value={user.address.city}
                />
                <InfoField
                  label="ZIP Code"
                  value={user.address.zipcode}
                />
                <InfoField
                  label="Latitude"
                  value={user.address.geo.lat}
                />
                <InfoField
                  label="Longitude"
                  value={user.address.geo.lng}
                />
              </div>
            </motion.div>

            {/* 🏢 Company Information */}
            <motion.div variants={itemVariants} className="dashboard-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Building className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Company Information</h2>
              </div>
              
              <div className="space-y-4">
                <InfoField
                  label="Company Name"
                  value={user.company.name}
                />
                <InfoField
                  label="Catch Phrase"
                  value={user.company.catchPhrase}
                />
                <InfoField
                  label="Business"
                  value={user.company.bs}
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column - 3D Globe */}
          <div className="space-y-6">
            <motion.div variants={itemVariants} className="dashboard-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Location</h2>
              </div>
              
              <ThreeGlobe
                lat={user.address.geo.lat}
                lng={user.address.geo.lng}
                userLocation={`${user.address.city}, ${user.address.zipcode}`}
              />
              
              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Geographic Coordinates</p>
                <div className="font-mono text-sm">
                  <div>Lat: {user.address.geo.lat}°</div>
                  <div>Lng: {user.address.geo.lng}°</div>
                </div>
              </div>
            </motion.div>

            {/* 📊 Quick Stats */}
            <motion.div variants={itemVariants} className="dashboard-card p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">User ID</span>
                  <span className="font-medium">#{user.id}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">Domain</span>
                  <span className="font-medium">{user.website}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <span className="font-medium">{user.address.city}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// 📝 Reusable Info Field Component
const InfoField: React.FC<{
  icon?: React.ReactNode;
  label: string;
  value: string;
  link?: string;
}> = ({ icon, label, value, link }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
      {icon}
      {label}
    </div>
    {link ? (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline font-medium break-all"
      >
        {value}
      </a>
    ) : (
      <p className="font-medium break-all">{value}</p>
    )}
  </div>
);

// 💀 Loading State
const LoadingState = () => (
  <div className="min-h-screen bg-background p-6">
    <div className="max-w-4xl mx-auto">
      <div className="loading-pulse h-10 w-32 mb-6 rounded-lg"></div>
      <div className="loading-pulse h-8 w-64 mb-2 rounded"></div>
      <div className="loading-pulse h-6 w-96 mb-8 rounded"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="dashboard-card p-6">
              <div className="loading-pulse h-6 w-48 mb-6 rounded"></div>
              <div className="grid grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="space-y-2">
                    <div className="loading-pulse h-4 w-20 rounded"></div>
                    <div className="loading-pulse h-6 w-full rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          <div className="dashboard-card p-6">
            <div className="loading-pulse h-6 w-32 mb-6 rounded"></div>
            <div className="loading-pulse h-64 w-full rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ❌ Error State
const ErrorState: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="min-h-screen bg-background p-6 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className="dashboard-card p-8 max-w-md">
        <User className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The user you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors duration-200"
        >
          Back to Users
        </button>
      </div>
    </motion.div>
  </div>
);

export default UserDetails;