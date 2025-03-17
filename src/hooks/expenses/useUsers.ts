import { useQuery } from '@tanstack/react-query';

interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface ResponseData {
  users: User[];
}

const fetchUsers = async (): Promise<ResponseData> => {
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
