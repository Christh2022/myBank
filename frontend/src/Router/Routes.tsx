// src/router.tsx
import { createBrowserRouter, Navigate } from 'react-router';
import { ErrorBoundary } from '../utils/ErrorBoundary';
import Home from '../Pages/Home/Home';
import Category from '../Pages/Category/Category';
import Expenses from '../Pages/Expenses/Expenses';
import NotFound from '../Pages/NotFound/NotFound';
import { requireAuth } from '../utils/Auth';
import { loginAction } from '../Pages/Login/LoginAction';
import { Login } from '../Pages/Login/Login';
import { registerAction } from '../Pages/Register/RegisterAction';
import { Register } from '../Pages/Register/Register';
import AppLayout from '../Layout/AppLayout';
import Profile from '../Pages/Profile/Profile';
import { categoryAction } from '../Pages/Category/categoryAction';
import { categoryLoader } from '../Pages/Category/categoryLoader';
import { expenseLoader } from '../Pages/Expenses/expenseLoader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    loader: requireAuth,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Navigate to={'home'} /> },
      { path: 'home', element: <Home /> },
      {
        path: 'category/:id',
        element: <Category />,
        loader: categoryLoader,
        action: categoryAction,
      },
      { path: 'transactions', element: <Expenses />, loader: expenseLoader },
      // { path: 'transactions/:category', element: <Expenses /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    action: loginAction,
  },
  {
    path: '/register',
    element: <Register />,
    action: registerAction,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/nav',
    // element: <NotFound />,
    element: (
      <div className="flex items-center flex-1 justify-center">
        <div className=" flex  flex-col gap-1.5 items-center justify-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#ffffffef]">
            Page not found
          </h2>
          <p className="text-sm md:text-sm lg:text-md xl:text-lg text-[#ffffffc0]">
            the page you're searching for isn't available
          </p>

          <button
            style={{
              boxShadow: '0px 4px 15px rgba(252, 163, 17, 0.4)',
            }}
            className="w-[200px]  hover:bg-[#FCA311]/30 bg-[#FCA311] text-white py-3 px-0 rounded-[40px] font-bold mt-3"
            onClick={() => {
              // navigation.navigate('/transactions')
            }}
          >
            Go to Transaction
          </button>
        </div>
      </div>
    ),
  },
]);

export default router;
