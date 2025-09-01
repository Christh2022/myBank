import type { User } from '../../utils/Types';
import Profile from './Profile';

export const MobileHeader = ({ profileData }: { profileData: User }) => {
  return (
    <div className="">
      <div
        style={{
          boxShadow: '-4px 4px 4px 0px #000000',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        className={`sm:rounded-[100px] px-2 py-1 h-[60px] md:min-w-[253px]  sm:bg-[#ffffff17]`}
      >
        <Profile {...{ profileData }} />
      </div>
    </div>
  );
};
