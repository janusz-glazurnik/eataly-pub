import { UserType } from './hooks/expenses/useUsers';
import { ExpenseType } from './hooks/expenses/useExpenses';

export const mockUsers: UserType[] = [
  {
    id: 'p1',
    name: 'Janusz Glazurnik',
    email: 'janusz@gmail.com',
    phone: '+48 600 123 456',
    address: {
      street: 'ul. Kafelkowa 12',
      city: 'Warszawa',
      postalCode: '00-001',
      country: 'Polska',
    },
    dateOfBirth: '1980-05-15',
    gender: 'male',
    registrationDate: '2024-03-01T12:00:00Z',
    lastLogin: '2025-03-16T18:30:00Z',
    status: 'active',
    preferences: {
      language: 'pl',
      notifications: {
        email: true,
        sms: false,
      },
    },
    groups: ['Italy', 'Home'],
  },
  {
    id: 'p2',
    name: 'Dominika Glazurnik',
    email: 'dominika@gmail.com',
    phone: '+48 601 987 654',
    address: {
      street: 'ul. Kafelkowa 12',
      city: 'Warszawa',
      postalCode: '00-001',
      country: 'Polska',
    },
    dateOfBirth: '1985-09-22',
    gender: 'female',
    registrationDate: '2024-03-02T10:15:00Z',
    lastLogin: '2025-03-15T17:45:00Z',
    status: 'active',
    preferences: {
      language: 'pl',
      notifications: {
        email: true,
        sms: true,
      },
    },
    groups: ['Italy', 'Home'],
  },
  {
    id: 'p3',
    name: 'Łukasz Kowalski',
    email: 'lukasz@gmail.com',
    phone: '+48 502 654 321',
    address: {
      street: 'ul. Szeroka 7',
      city: 'Kraków',
      postalCode: '31-001',
      country: 'Polska',
    },
    dateOfBirth: '1992-07-08',
    gender: 'male',
    registrationDate: '2024-02-25T14:20:00Z',
    lastLogin: '2025-03-10T08:50:00Z',
    status: 'active',
    preferences: {
      language: 'en',
      notifications: {
        email: false,
        sms: false,
      },
    },
    groups: ['Italy'],
  },
  {
    id: 'p4',
    name: 'Karmelek Kowalski',
    email: 'karmelek@gmail.com',
    phone: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: '',
    },
    dateOfBirth: '2020-01-01',
    gender: 'male',
    registrationDate: '2024-03-05T09:30:00Z',
    lastLogin: '',
    status: 'active',
    preferences: {
      language: 'pl',
      notifications: {
        email: false,
        sms: false,
      },
    },
    groups: ['Italy'],
  },
];

export const mockExpenses: ExpenseType[] = [
  {
    id: '1',
    timestamp: new Date('2025-03-10T12:00:00Z'),
    payer: 'p1',
    currency: 'EUR',
    amount: 120.5,
    description: 'Kolacja w Rzymie',
    evenSplit: true,
    participants: ['p1', 'p2', 'p3'],
  },
  {
    id: '2',
    timestamp: new Date('2025-03-11T15:30:00Z'),
    payer: 'p2',
    currency: 'EUR',
    amount: 45.0,
    description: 'Bilety do muzeum',
    evenSplit: true,
    participants: ['p1', 'p2', 'p3', 'p4'],
  },
  {
    id: '3',
    timestamp: new Date('2025-03-12T09:00:00Z'),
    payer: 'p3',
    currency: 'EUR',
    amount: 32.8,
    description: 'Kawa i croissanty',
    evenSplit: true,
    participants: ['p1', 'p3'],
  },
];
