# User Management Dashboard

A modern, responsive user management dashboard built with Next.js, TypeScript, and Tailwind CSS. This application allows you to browse, search, and manage users with a clean and intuitive interface.

🌐 **Live Demo:** [View on Vercel](https://dashboard-ten-sigma-34.vercel.app)

## Features

- **User Listing**: View all users in a responsive, sortable table
- **Search & Filter**: Quickly find users by name, email, or company
- **Pagination**: Navigate through user lists with ease
- **User Details**: View detailed information about each user
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with Framer Motion for smooth animations and transitions

## Tech Stack

- **Frontend Framework**: Next.js 15.5.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **3D Rendering**: Three.js (for potential future features)

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RakibHassan11/dashboard.git
   cd user-management-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── components/         # Reusable UI components
│   │   ├── UserList.tsx    # User listing component
│   │   ├── UserDetails.tsx # User detail view component
│   │   └── ...
│   ├── services/           # API services
│   │   └── userService.ts  # User-related API calls
│   ├── types/              # TypeScript type definitions
│   │   └── user.ts         # User type definitions
│   └── ...
└── public/                # Static files
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

## Responsive Design

The application is fully responsive and works on all device sizes:
- **Desktop**: Full-featured view with all columns visible
- **Tablet**: Optimized layout with responsive table
- **Mobile**: Stacked layout with horizontal scrolling for tables

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
