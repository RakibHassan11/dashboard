// 🔥 TypeScript interfaces for our awesome dashboard!

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UserListProps {
  users: User[];
  loading: boolean;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface UserDetailsProps {
  user: User | null;
  loading: boolean;
}