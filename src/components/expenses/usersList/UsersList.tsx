import React from 'react';
import { UserType } from '../../../hooks/expenses/useUsers';
import { ExpenseType } from '../../../hooks/expenses/useExpenses';
import './UsersList.scss';
import SingleUser from './SingleUser';

const UsersList = ({
  users,
  expenses,
}: {
  users: UserType[];
  expenses: ExpenseType[];
}) => {
  // TODO TG maybe filter/map can be a separate component
  return (
    <div className="users-list bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Participants</h2>

      {/* TODO TG maybe prepare util/query for active users */}
      {users
        ?.filter((user) => user.status === 'active')
        .map((user) => (
          <SingleUser key={user.id} user={user} expenses={expenses} />
        ))}
    </div>
  );
};

export default UsersList;
