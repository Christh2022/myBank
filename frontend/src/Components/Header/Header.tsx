import { MobileHeader } from './MobileHeader';
import { Icons } from './Icons';
import Search from './Search';
import { useSelector } from 'react-redux';
import { user } from '../../Redux/Slices/userSlice';
import type { User } from '../../utils/Types';
export const Header = () => {
  const profileData = useSelector(user) as User
  return (
    <div className="flex flex-row fixed top-8 left-6 lg:left-[110px] right-5 z-[250]">
      <div className='flex flex-1 xl:justify-between items-center w-[100%]'>
        <div>
          <Search/>
        </div>
        <div className='flex xl:flex-row flex-row-reverse flex-1 items-center xl:justify-end mr-14 lg:mr-0 justify-between gap-2.5 '>
          <Icons/>
          <MobileHeader {...{ profileData }} />
        </div>
      </div>
    </div>
  );
};
