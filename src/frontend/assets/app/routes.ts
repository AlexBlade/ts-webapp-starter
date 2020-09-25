import React from 'react';

const Page = React.lazy(() => import('./views/Page'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));

const routes = [
    { path: '/', name: 'Dashboard', component: Dashboard, exact: true },
    { path: '/page', name: 'Page', component: Page, exact: true }
];

export default routes;