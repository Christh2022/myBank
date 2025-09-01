import React from 'react';
import { IoMoon, IoNotifications } from 'react-icons/io5';
import { SlReload } from 'react-icons/sl';
import { BadgeUi } from '../../UI/Badge/BadgeUi';
import { TbSunFilled } from 'react-icons/tb';

export const Icons = () => {
  const [dark, setDark] = React.useState<boolean>(true);
  const IconTab = [
    { icon: dark ? <IoMoon /> : <TbSunFilled /> },
    {
      icon: (
        <BadgeUi>
          <IoNotifications />
        </BadgeUi>
      ),
    },
    { icon: <SlReload /> },
  ];

  const handleClick = (index: number) => {
      if (index === 2) {
          setDark(!dark)
        } else {
          alert('sac');
          
      }
  };
  return (
    <div className="sm:opacity-100 opacity-0 flex flex-row gap-2.5   ">
      {IconTab.reverse().map(({ icon }, index) => (
        <div
          key={index}
          className={` bg-[#ffffff17] cursor-pointer w-[60px] h-[60px] rounded-full text-[23px] items-center justify-center flex `}
          style={{
            boxShadow: '-4px 4px 4px 0px #000000',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
          onClick={() => handleClick(index)}
        >
          {icon}
        </div>
      ))}
    </div>
  );
};
