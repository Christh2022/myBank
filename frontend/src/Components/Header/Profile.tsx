import { Avatar } from '@mui/material';
import { FaAngleDown } from 'react-icons/fa';
import { DropDownMenu } from './DoprDownMenu';
import type { User } from '../../utils/Types';

export default function Profile({ profileData }: { profileData: User }) {
  function stringAvatar(name: string) {
    if (name) {
      return {
        sx: {
          bgcolor: '#FCA311',
          width: 50,
          height: 50,
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      };
    }
  }

  return (
    <div className="flex flex-row gap-[11px] items-center justify-center ">
      {profileData && profileData.profile && profileData.profile?.length > 0 ? (
        <Avatar
          alt={profileData.firstName + ' ' + profileData.lastName}
          src={profileData.profile}
          sx={{ width: 50, height: 50 }}
        />
      ) : (
        <Avatar
          {...stringAvatar(profileData.lastName + ' ' + profileData.firstName)}
        />
      )}
      <div className="flex flex-col gap-0 ">
        <h6 className="font-semibold text-[15px] text-[#ffffff]">
          {(profileData.lastName + ' ' + profileData.firstName).slice(0, 15)}
        </h6>
        <span className="font-semibold text-[15px] text-[#FFFFFF80]">
          @
          {(profileData.lastName + ' ' + profileData.firstName)
            .slice(0, 15)
            .replace(/\s+/g, '_')
            .toLocaleLowerCase()}
        </span>
      </div>
      <span className="hidden sm:flex ml-3 cursor-pointer text-[20px] items-center justify-center">
        <DropDownMenu {...{ FaAngleDown }} />
      </span>
    </div>
  );
}
