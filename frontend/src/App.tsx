import { RouterProvider } from 'react-router/dom';
import router from './Router/Routes';
import { requireAuth } from './utils/Auth';
import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setNavVisible, visible } from './Redux/Slices/navSlice';
import { getUser } from './Redux/Slices/userSlice';
import type { User } from './utils/Types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function LoaderBoundary() {
  return (
    <div
      style={{ padding: '2rem', textAlign: 'center' }}
      className="absolute top-0 z-50 w-[100%] h-full bg flex flex-col justify-center items-center"
    >
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(false);
  const navVisible = useSelector(visible);
  const dispatch = useDispatch();

  useEffect(() => {
    const path = window.location.pathname;
    const token = localStorage.getItem('token');

    if ((!token && path === '/Login') || path === '/register') {
      setLoading(false);
    } else {
      // Vérifier le token à chaque chargement de l'application
      setLoading(true);
      requireAuth()
        .then((res) => {
          // console.log(res);
          if (res && typeof res === 'object' ) {
            const newRes = res as User
            console.log(newRes);
            
            delete newRes.expenses;
            dispatch(getUser(newRes));
            dispatch(setNavVisible(true));
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [navVisible, dispatch]);

  return (
    <>
      {loading && !navVisible && <LoaderBoundary />}
      <RouterProvider router={router} />
      <ToastContainer theme='dark' />
    </>
  );
}

export default App;
