import { useDispatch, useSelector } from 'react-redux';
import { navigate, setNavigate, visible } from '../../Redux/Slices/navSlice';
import { LoaderBoundary } from '../../App';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

type PageWithLoaderProps = {
  children: React.ReactNode;
};

export default function PageWithLoader({ children }: PageWithLoaderProps) {
  const dispatch = useDispatch()
  const navVisible = useSelector(visible);
  const navigation = useSelector(navigate);
  const route = useLocation()

  useEffect(() => {
    dispatch(setNavigate(false));
  }, [route, dispatch])

  return (
    <>
      <div className="ml-30 absolute ">{navVisible && children}</div>
      {!navVisible && <LoaderBoundary />}
      {navigation && <LoaderBoundary />}
    </>
  );
}
