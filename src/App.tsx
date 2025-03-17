import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from './components/header/Header';
import ExpenseModal from './components/expenses/addExpenseModal/AddExpenseModal';

import './App.scss';
import './Tailwind.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Outlet } from 'react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AddExpenseButton from './components/expenses/addExpenseModal/AddExpenseButton';
import SnackbarContainer from './components/Snackbar';

const queryClient = new QueryClient();

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 3000);
  }, [isSnackbarOpen]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <Header />

        <AddExpenseButton setModalOpen={() => setModalOpen(true)} />

        <Outlet />

        <ExpenseModal
          isOpen={isModalOpen}
          closeModal={() => setModalOpen(false)}
          setSnackbar={setSnackbarOpen}
          snackbarMessage={setSnackbarMessage}
        />

        <SnackbarContainer isOpen={isSnackbarOpen} message={snackbarMessage} />
      </div>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
