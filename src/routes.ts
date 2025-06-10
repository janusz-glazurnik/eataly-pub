import { createBrowserRouter } from 'react-router';
import App from './App';
import ExpensesContainer from './containers/expenses/ExpensesContainer';
import UsersContainer from './containers/expenses/UsersContainer';
import StatsContainer from './containers/expenses/StatsContainer';
import GroupsContainer from './containers/expenses/GroupsContainer';
import SettingsContainer from './containers/expenses/SettingsContainer';

// TODO TG check if can use react query with routing (loader)
const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '/',
        Component: UsersContainer,
        // loader: ({ request, params }) =>
        //   fetch(`/api/show/${params.id}.json`, {
        //     signal: request.signal,
        //   }),
      },
      {
        path: '/expenses',
        Component: ExpensesContainer,
        // loader: ({ request, params }) =>
        //   fetch(`/api/show/${params.id}.json`, {
        //     signal: request.signal,
        //   }),
      },
      {
        path: '/groups',
        Component: GroupsContainer,
        // loader: ({ request, params }) =>
        //   fetch(`/api/show/${params.id}.json`, {
        //     signal: request.signal,
        //   }),
      },
      {
        path: '/stats',
        Component: StatsContainer,
        // loader: ({ request, params }) =>
        //   fetch(`/api/show/${params.id}.json`, {
        //     signal: request.signal,
        //   }),
      },
      {
        path: '/settings',
        Component: SettingsContainer,
        // loader: ({ request, params }) =>
        //   fetch(`/api/show/${params.id}.json`, {
        //     signal: request.signal,
        //   }),
      },
    ],
  },
]);

export default router;
