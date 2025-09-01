import { HiHome } from 'react-icons/hi';
import logo from './../../assets/logo.svg';
import { NavLink } from 'react-router';
import { BsFillGridFill } from 'react-icons/bs';
import { FaChartBar } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaUser } from 'react-icons/fa6';
import { IoSettingsOutline } from 'react-icons/io5';
import { ImExit } from 'react-icons/im';
import { Mobilenav } from './Mobilenav';
import { BadgeUi } from '../../UI/Badge/BadgeUi';
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../../Redux/Slices/userSlice';
import type { User } from '../../utils/Types';
import { setNavigate } from '../../Redux/Slices/navSlice';
import { setCategory } from '../../Redux/Slices/categorySlice';
export default function Nav() {
  const userData = useSelector(user);
  const dispatch = useDispatch();
  const { id } = userData as User;

  const navigationTab = [
    {
      path: '/home',
      Icon: <HiHome className="xl:text-[30px] lg:text-[25px]  text-[19px]" />,
    },
    {
      path: `/category/${id}`,
      Icon: (
        <BsFillGridFill className="xl:text-[30px] lg:text-[25px]  text-[19px]" />
      ),
    },
    {
      path: '/transactions',
      Icon: (
        <FaChartBar className="xl:text-[30px] lg:text-[25px]  text-[19px]" />
      ),
    },
    {
      path: '/chat',
      Icon: (
        <span>
          <BadgeUi>
            <MdEmail className="xl:text-[30px] lg:text-[25px]  text-[19px]" />
          </BadgeUi>
        </span>
      ),
    },
    {
      path: '/profile',
      Icon: <FaUser className="xl:text-[30px] lg:text-[25px]  text-[19px]" />,
    },
  ];

  const footerTab = [
    {
      path: '/setting',
      Icon: (
        <IoSettingsOutline className="xl:text-[30px] lg:text-[25px]  text-[19px]" />
      ),
    },
    {
      path: '/Logout',
      Icon: <ImExit className="xl:text-[30px] lg:text-[25px]  text-[19px]" />,
    },
  ];

  return (
    <>
      <div className="absolute z-[250] top-0 bottom-0 lg:left-5 left-0 flex items-center">
        <div
          style={{
            boxShadow: '0 0 4px 0 rgba(255,255,255,0.1)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)', // pour Safari
          }}
          className=" hidden lg:flex w-[78px] h-[95%] bg-[#FFFFFF0D] rounded-[100px]  flex-col justify-center"
        >
          {/* logo */}
          <div className=" flex flex-col flex-1/12 items-center justify-center gap-[19px]">
            <img src={logo} alt="logo" />
            <div className="w-[60px] h-[1px] bg-[#A2A2A2] " />
          </div>
          {/* nav menu */}
          <div className="flex flex-col flex-8/12 items-center 2xl:gap-[30px] xl:gap-[25px] lg:gap-[20px] ">
            {navigationTab.map((nav, index) => (
              <NavLink
                to={nav.path}
                key={index}
                onClick={() => {
                  dispatch(setCategory([]))
                  dispatch(setNavigate(true))
                }}
                className={({ isActive }) =>
                  `flex items-center cursor-pointer justify-center ${isActive ? 'white bg-[#FCA311] rounded-[10px] lg:w-[45px] lg:h-[45px]   2xl:w-[50px] 2xl:h-[50px] ' : 'text-[#FFFFFFB3]'}`
                }
              >
                {nav.Icon}
              </NavLink>
            ))}
          </div>
          {/* footer */}
          <div className="flex flex-col flex-2/12  2xl:gap-[30px] xl:gap-[25px] lg:gap-[20px]  items-center justify-end pb-10 gap-[37px]">
            {footerTab.map((nav, index) => (
              <NavLink
                to={nav.path}
                key={index}
                className={({ isActive }) =>
                  `flex items-center justify-center ${isActive ? 'white bg-[#FCA311] rounded-[10px] lg:w-[45px] lg:h-[45px]   2xl:w-[50px] 2xl:h-[50px] ' : 'text-[#FFFFFFB3]'}`
                }
              >
                {nav.Icon}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <Mobilenav {...{ footerTab, navigationTab, logo }} />
    </>
  );
}
