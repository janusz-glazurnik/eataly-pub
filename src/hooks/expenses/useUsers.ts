import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

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

export interface User {
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
}

export interface UsersResponse {
  users: User[];
}

const fetchUsers = async (): Promise<UsersResponse> => {
  const response = await fetch('http://localhost:8080/api/users');
  if (!response.ok) {
    throw new Error('Error! Can not fetch users');
  }

  return response.json();
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};

export const useGetUsers = () => {
  const { data, error, isLoading } = useUsers();

  return { data, error, isLoading };
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
