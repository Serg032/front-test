import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './components/login';
import MyTasks from './components/my-tasks'

const router = createBrowserRouter([
  {path: '/', element: <Navigate to={'/login'}/>},
  {path: '/login', element: <LoginPage/>},
  {path: 'my-tasks', element: <MyTasks/>}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);