import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './components/login';
import MyTasks from './components/my-tasks'
import maddyness from './assets/maddyness.jpeg'
import bfm from './assets/bfm.jpeg'
import echos from './assets/echos.jpeg'
import tech from './assets/tech.jpeg'
import threePilars from './assets/3-pillar.png'

const router = createBrowserRouter([
  {path: '/', element: <Navigate to={'/login'}/>},
  {path: '/login', element: <LoginPage 
    maddynessImg={maddyness} 
    bfmImg={bfm} 
    echosImg={echos}
    techImg={tech}
    pilars={threePilars}/>},
  {path: 'todo', element: <MyTasks/>}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);