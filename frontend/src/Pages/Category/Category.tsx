import { IoMdSearch } from 'react-icons/io';
import ControlledStates from '../../Components/Inputs/ControlledStates';
import PageWithLoader from '../../Components/PageWithLoader/PageWithLoader';
import { CategorieItem } from '../../UI/Categorie/caregorieItem';
import CustomIcon from '../../UI/Icon/CustomIcon';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useLoaderData } from 'react-router';
import { PiMaskSadFill } from 'react-icons/pi';
import React from 'react';
import type { User } from '../../utils/Types';
import { user } from '../../Redux/Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../Api/CategoryController';
import { categories, setCategory } from '../../Redux/Slices/categorySlice';

export default function Category() {
  // const inputRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();
  const category = useSelector(categories);
  const [icon, setIcon] = React.useState<string>('');
  const profileData = useSelector(user) as User;
  const { data, pagination } = useLoaderData() as {
    data: {
      id: number;
      title: string;
      icon_name: string;
      showCategory: boolean;
    }[];
    pagination: {
      current_page: number;
      total_pages: number;
      total_items: number;
      items_per_page: number;
    };
  };

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const item: Record<string, string> = {};

    formData.forEach((value, key) => {
      item[key] = value.toString().trim();
    });

    if (icon) {
      item['icon_name'] = icon;
    }
    console.log(item.icon_name);

    const res = await addCategory(item.icon_name, item.title, item.description);

    if (category) {
      dispatch(setCategory([...category, res]));
    } else {
      dispatch(setCategory([res]));
    }

    // Réinitialise tous les champs du formulaire
    formRef.current.reset();
    console.log(category);
  };

  React.useEffect(() => {
    dispatch(setCategory(data));
  }, [data, dispatch]);

  const merged = (Array.isArray(category) ? category : []);
  const unique = merged.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  return (
    <PageWithLoader>
      <div className="flex flex-wrap lg:flex-nowrap justify-between fixed top-28 left-6 lg:left-[110px] right-5 bottom-8 gap-6 overflow-y-scroll">
        <div className="md:relative bg-[#1B1919] rounded-[20px] lg:h-[100%]  flex-2/3 w-2/3 lg:w-[68%]">
          <div className="flex flex-row items-center justify-between px-6 py-4 ">
            <h3 className="text-[21px] font-bold">My Categories</h3>
            <div className="flex flex-row gap-[12px] ">
              <div className="h-[34px] border px-3 border-[#FFFFFF97] hidden sm:flex items-center justify-between  w-[180px] rounded-[20px]">
                <input
                  type="text"
                  placeholder="Search..."
                  className="font-semibold w-[80%] text-[15px] outline-0 "
                />
                <IoMdSearch size={15} className="text-white cursor-pointer" />
              </div>
              <div className="bg-[#fca311] rounded-[5px] h-[34px] w-[103px] flex flex-row items-center justify-center gap-1 cursor-pointer">
                <CustomIcon />
                <p className="font-semibold text-[13px]">Filter</p>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3  gap-4 py-4 px-6 mb-5.5">
            {data.length > 0 &&
              profileData &&
              unique
                .filter((item) => item.showCategory)
                .map(
                  ({
                    id,
                    title,
                    icon_name,
                    showCategory,
                  }: {
                    id: number;
                    title: string;
                    icon_name: string;
                    showCategory: boolean;
                  }) => (
                    <CategorieItem
                      key={id}
                      category={{ id, title, icon_name, showCategory }}
                    />
                  )
                )}
          </div>

          {data.length === 0 && (
            <div className="flex flex-1 py-10 flex-col gap-2.5 items-center justify-center w-full">
              <PiMaskSadFill className=" text-xl sm:text-3xl md:text-6xl text-[rgba(255,255,255,0.2)] " />
              <span className="font-semibold text-1xl text-[rgba(255,255,255,0.2)]">
                No Category Found
              </span>
            </div>
          )}

          <div className=" lg:absolute bottom-3 flex items-center justify-between px-6 py-2.5 w-[100%] ">
            <div className="flex flex-row gap-2.5 ">
              <button className="hover:bg-[#fca311] outline-0 w-[44px] h-[44px] rounded-full cursor-pointer flex items-center justify-center hover:shadow-[0_0_8px_0_rgba(252,163,17,0.8)] ">
                <FaAngleLeft className="lg:text-[30px] text-[26px]" />
              </button>
              <button className="bg-[#fca311] w-[44px] h-[44px] rounded-full cursor-pointer flex items-center justify-center  shadow-[0_0_8px_0_rgba(252,163,17,0.8)]  outline-0">
                <FaAngleRight className="lg:text-[30px] text-[26px]" />
              </button>
            </div>

            <p className=" text-[rgba(255,255,255,0.7)] text-[15px] font-medium ">
              Showing{' '}
              {(pagination.total_items > 0 ? pagination.current_page : 0) +
                ' of ' +
                (pagination.total_items > 0 ? pagination.total_pages : 0) +
                ' result' +
                (pagination.total_pages > 1 ? 's' : '')}
            </p>
          </div>
        </div>
        <div className=" px-10 py-6 flex flex-col gap-5 bg-[#1B1919] rounded-[20px] min-h-[536px] w-1/3 lg:w-[30%] flex-1/3">
          <h3 className="text-[21px] font-bold">Add Category</h3>
          <form
            method="post"
            onSubmit={handleClick}
            ref={formRef}
            className="flex flex-col gap-[20px]"
          >
            <div className="flex flex-col gap-[17px]">
              <label htmlFor="title" className="font-semibold text-[16px]">
                Name<span className="text-[#FCA113]">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Category's Name"
                name="title"
                className="px-3 border font-semibold border-[#FFFFFF97] outline-0 focus:border-[#fca311] h-[50px] rounded-[3px] "
              />
            </div>
            <div className="flex flex-col gap-[17px]">
              <label htmlFor="icon" className="font-semibold text-[16px]">
                Icon<span className="text-[#FCA113]">*</span>
              </label>
              <ControlledStates {...{ setIcon }} />
            </div>
            <div className="flex flex-col gap-[17px]">
              <label
                htmlFor="description"
                className="font-semibold text-[16px]"
              >
                Description (optional)
              </label>
              <textarea
                placeholder="Add a description"
                name="description"
                className="text-[#FFFFFF97] font-semibold px-3 border border-[#FFFFFF97] pt-2  h-[152px] rounded-[3px] resize-none outline-0 focus:border-[#fca311]  "
              />
            </div>
            <button
              type="submit"
              className="text-[20px] font-bold rounded-[3px] bg-[#fca311] w-full text-center h-[50px] mt-5 cursor-pointer "
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </PageWithLoader>
  );
}
