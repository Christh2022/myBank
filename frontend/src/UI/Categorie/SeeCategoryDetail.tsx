import React from 'react';
import type { Category } from '../../utils/Types';
import ControlledStates from '../../Components/Inputs/ControlledStates';

type SeeCategoryDetailProps = {
  setIcon: (a: string) => void;
  formRef: React.RefObject<HTMLFormElement | null>;
  category: Category;
  handleUpdate: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setEdit: (a: boolean) => void;
};

export default function SeeCategoryDetail({
  setIcon,
  formRef,
  category,
  handleUpdate,
  setEdit,
}: SeeCategoryDetailProps) {
  console.log(setIcon, formRef, category, handleUpdate, setEdit);
  return (
    <div>
      <div></div>

      <div className=" px-10 py-6 flex flex-col gap-5 bg-[#1B1919] rounded-[20px] min-h-[536px] w-1/3 lg:w-[30%] flex-1/3">
              <h3 className="text-[21px] font-bold">Category Detail {category.id}</h3>
        <form
          method="post"
          onSubmit={handleUpdate}
          ref={formRef}
          className="flex flex-col gap-[20px]"
        >
          <div className="flex flex-col gap-[17px]">
            <label htmlFor="title" className="font-semibold text-[16px]">
              Name<span className="text-[#FCA113]">*</span>
            </label>
            <input
              type="text"
              placeholder={category.title}
              name="title"
              className="px-3 border font-semibold border-[#FFFFFF97] outline-0 focus:border-[#fca311] h-[50px] rounded-[3px] "
            />
          </div>
          <div className="flex flex-col gap-[17px]">
            <label htmlFor="icon" className="font-semibold text-[16px]">
              Icon<span className="text-[#FCA113]">*</span>
            </label>
            <ControlledStates {...{ setIcon, }} />
          </div>
          <div className="flex flex-col gap-[17px]">
            <label htmlFor="description" className="font-semibold text-[16px]">
              Description (optional)
            </label>
            <textarea
              placeholder={category.description ?? "Add a description"}
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
  );
}
