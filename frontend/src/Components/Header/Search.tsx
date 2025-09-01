import React from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import search from '../../assets/search.svg';
import { FaPlus } from 'react-icons/fa6';

export default function Search() {
  const [focus, setFocus] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>('');

  return (
    <div>
      <div
        style={{
          boxShadow: '-4px 4px 4px 0px #000000',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        className="rounded-[100px] pl-3 pr-1  h-[60px] lg:min-w-[442px] bg-[#ffffff17] hidden xl:flex flex-row items-centter justify-center"
      >
        <div className="flex items-center  justify-between w-[100%]">
          <div className="flex flex-row gap-[14px] items-center ">
            <IoSearchSharp className="text-[23px]" />
            {!focus && searchText.length === 0 && (
              <span className="text-[15px] font-semibold">Search</span>
            )}
          </div>
          <input
            type="text"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={(e) => setSearchText(e.target.value)}
            className="h-[60px] outline-0 text-[17px] font-semibold px-2 "
          />

          <div
            className="cursor-pointer flex flex-row gap-2.5 h-[55px] items-center justify-center rounded-[100px] px-[11px] lg:w-[112px] "
            style={{ boxShadow: 'inset 0 0 10px 4px rgba(255, 255, 255, 0.5)' }}
          >
            <img
              src={search}
              alt="search"
              className="lg:w-[13px] lg:h-[15px]"
            />
            <FaPlus className="text-[15px] font-semibold" />
            <span className="text-[15px] font-semibold">Space</span>
          </div>
        </div>
      </div>
    </div>
  );
}
