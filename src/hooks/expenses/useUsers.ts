import { useQuery } from '@tanstack/react-query';
import { mockUsers } from '../../mockData';

type Address = {
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

type Notification = {
  email: boolean;
  sms: boolean;
};

export type UserType = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: Address;
  dateOfBirth?: string;
  gender?: string;
  registrationDate?: string;
  lastLogin?: string;
  status?: string;
  preferences: {
    language: string;
    notifications: Notification;
  };
  groups: Array<string>;
};

export interface UsersResponse {
  users: UserType[];
}

const fetchUsers = async (): Promise<UsersResponse> => {
  // Try to fetch from API, fallback to mock if it fails or doesn't exist
  try {
    const response = await fetch('http://localhost:8080/api/users');
    if (response.ok) {
      return response.json();
    }
  } catch (e) {
    console.warn('Backend not available, using mock users');
  }

  // Fallback to local storage or mock data
  const storedUsers = localStorage.getItem('eataly_users');
  if (storedUsers) {
    return { users: JSON.parse(storedUsers) };
  }

  return { users: mockUsers };
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};

export const useGetUsers = () => {
  const { data, error, isLoading, isFetching } = useUsers();

  return { users: data?.users, error, isLoading, isFetching };
};

export const useGetUsersGroups = () => {
  const { data } = useUsers();

  const usersWithGroups = data?.users.filter((user) => user.groups);
  return (
    usersWithGroups && [
      ...new Set(usersWithGroups.flatMap((user) => user.groups)),
    ]
  );
};
