import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { RiMenu3Fill } from 'react-icons/ri';
import { NavLink } from 'react-router';
import { setNavigate } from '../../Redux/Slices/navSlice';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../Redux/Slices/categorySlice';

type tabProps = {
  path: string;
  Icon: React.ReactNode;
};

type MobilenavProps = {
  footerTab: tabProps[];
  navigationTab: tabProps[];
  logo: string;
};

export const Mobilenav = ({
  footerTab,
  navigationTab,
  logo,
}: MobilenavProps) => {
  const [showNav, setShowNav] = useState<boolean>(false);
  const dispatch = useDispatch()
  return (
    <div className="fixed bottom-0 top-0 z-[270] ">
      <div
        className={`lg:hidden fixed z-[200] flex-row-reverse right-2 top-8  durationt-300 ease-in-out ${showNav ? 'opacity-0 ' : 'opacity-100 delay-500'} `}
      >
        <div className="text-white">
          <button
            onClick={() => setShowNav(true)}
            // style={{ boxShadow: '1px 0 5.5px 0 rgba(255,255,255,0.4)' }}
            className=" cursor-pointer bg-none p-3 text-[19px] font-extrabold bg-[#ffffff17] w-[60px] h-[60px] rounded-full flex items-center justify-center "
          >
            <RiMenu3Fill />
          </button>
        </div>
      </div>
      <div
        className={` absolute z-[1] transition-all duration-300 delay-450 ease-in-out bg-[#FFFFFF0D] h-full w-[100vw] overflow-hidden ${!showNav ? '-left-[120vw]' : ' left-0 lg:-left-[100vw] '}`}
        style={{
          // boxShadow: '0 0 4px 0 rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      >
        <div
          className={`bg-[#FFFFFF0D] transition-all duration-300 ease-in-out w-[250px] h-full flex flex-col items-start pl-5 ${showNav ? 'ml-0 ' : '-ml-[253px] '}`}
          style={{ boxShadow: '0 0 4px 0 rgba(255,255,255,0.4)' }}
        >
          {/* logo */}
          <div className=" flex flex-col flex-1/12 items-center justify-center gap-[19px]">
            <img src={logo} alt="logo" className="w-[100px]" />
            <div className="w-[200px] h-[1px] bg-[#A2A2A2] " />
          </div>
          {/* nav menu */}
          <div className="flex flex-col flex-8/12 items-start gap-[20px]">
            {navigationTab.map((nav, index) => (
              <NavLink
                to={nav.path}
                onClick={() => {
                  dispatch(setCategory([]))
                  dispatch(setNavigate(true));
                  setShowNav(false);
                }}
                key={index}
                className={({ isActive }) =>
                  `flex items-center pl-2 py-2 gap-4 ${isActive ? 'white bg-[#FCA311] rounded-[10px] w-[200px]' : 'text-[#FFFFFFB3]'}`
                }
              >
                {nav.Icon}
                <span className="font-semibold text-[19px] capitalize">
                  {nav.path.slice(1) === 'home'
                    ? 'Dashboard'
                    : nav.path.slice(1).includes('category')
                      ? 'category'
                      : nav.path.slice(1)}
                </span>
              </NavLink>
            ))}
          </div>
          {/* footer */}
          <div className="flex flex-col flex-2/12  justify-end pb-10 gap-[15px]">
            {footerTab.map((nav, index) => (
              <NavLink
                to={nav.path}
                key={index}
                onClick={() => {
                  dispatch(setNavigate(true));
                  setShowNav(false);
                }}
                className={({ isActive }) =>
                  `flex items-center pl-2 py-2 gap-4  ${isActive ? 'white bg-[#FCA311] rounded-[10px]  ' : 'text-[#FFFFFFB3]'}`
                }
              >
                {nav.Icon}
                <span className="font-semibold text-[19px] capitalize">
                  {nav.path.slice(1)}
                </span>
              </NavLink>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowNav(false)}
          // style={{ boxShadow: '1px 0 5.5px 0 rgba(255,255,255,0.4)' }}
          className={`absolute cursor-pointer transition-all delay-50 duration-300 ease-in-out bg-[#FFFFFF0D] p-3 top-6.5  text-[19px] font-extrabold ${!showNav ? '-left-6 ' : 'left-[252px]'} `}
        >
          <MdClose />
        </button>
      </div>
    </div>
  );
};
