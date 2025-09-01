import { List, ListItemButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import type { IconType } from 'react-icons';
import { FaUser } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import { RiMailSettingsFill, RiSettings3Fill } from 'react-icons/ri';
import { TbHelpHexagonFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router';

export const DropDownMenu = ({ FaAngleDown }: { FaAngleDown: IconType }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigation = useNavigate()
  
    const dropDownItem = [
      {
        title: 'View Profile',
        Icon: <FaUser className="text-[23px]" />,
        func: () => navigation('/profile'),
      },
      {
        title: 'Help Center',
        Icon: <TbHelpHexagonFilled className="text-[23px]" />,
        func: () => alert('hello'),
      },
      {
        title: 'Email Setting',
        Icon: <RiMailSettingsFill className="text-[23px]" />,
        func: () => navigation('/chat/setting'),
      },
      {
        title: 'Setting',
        Icon: <RiSettings3Fill className="text-[23px]" />,
        func: () => navigation('/setting'),
      },
      {
        title: 'Log Out',
        Icon: <HiOutlineLogout className="text-[23px]" />,
        func: () => navigation("/logout"),
      },
    ];

  const handleClose = () => setOpen(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  return (
    <div>
      <List component="nav" aria-label="Menu DropDown">
        <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="Menu DropDown"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <FaAngleDown />
        </ListItemButton>
      </List>

      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'lock-button',
            role: 'listbox',
          },
          paper: {
            sx: {
              bgcolor: '#222',
              borderRadius: 5,
              marginTop: 2,
            },
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {dropDownItem.map((item, index) => (
          <MenuItem
            key={index}
            onClick={item.func}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            {index === 4 && <hr className="w-[100%] border-[#ffffff32]" />}
            <div
              className={`text-[#ffffffd7] py-3 px-4 hover:bg-[#fca21141] hover:text-white flex flex-row gap-4 items-center justify-start min-w-[150px] w-[100%]  ${index === 4 ? 'py-2  ' : 'rounded-xl'} `}
            >
              {item.Icon}
              <p className="font-semibold text-[17px]">{item.title}</p>
            </div>
            {index === 4 && <hr className="w-[100%] border-[#ffffff32]" />}
          </MenuItem>
        ))}
        <MenuItem sx={{padding: "0 0"}}>
          <p className="text-[#ffffff4d] text-[14px] px-5 py-1.5 font-semibold">
            Privacy Policy <span className='text-[25px] px-1 py-0'>.</span> Terms ofService
          </p>
        </MenuItem>
      </Menu>
    </div>
  );
};
