import { RouterProvider } from 'react-router/dom';
import router from './Router/Routes';
import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setNavVisible, visible } from './Redux/Slices/navSlice';
import { getUser } from './Redux/Slices/userSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { requireAuth } from './utils/Auth';

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
    setLoading(true);
    (async () => {
      // const path = window.location.pathname;
      try {
        const user = await requireAuth();
        console.log('Utilisateur authentifié :', user);
        dispatch(getUser(user));
        dispatch(setNavVisible(true));
        setLoading(false);
      } catch (err) {
        console.error('Accès non autorisé', err);
        // redirection vers la page de login si nécessaire
        dispatch(setNavVisible(false));
        setLoading(false);
        // if (path !== '/login' && path !== '/register') {
        //   window.location.href = '/login';
        // }
      }
    })();

    return () => {};
  }, [dispatch]);

  return (
    <>
      {loading && !navVisible && <LoaderBoundary />}
      <RouterProvider router={router} />
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
