import React from 'react';
import type { Category } from '../../utils/Types';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { transactionCategoriesIcon } from '../../utils/IconCategory';
import { deleteCategory, updateCategory } from '../../Api/CategoryController';
import SeeCategoryDetail from './SeeCategoryDetail';
import { useDispatch, useSelector } from 'react-redux';
import { categories, setCategory } from '../../Redux/Slices/categorySlice';

export const CategorieItem = ({
  category,
}: {
  category: Category;
}) => {
  const [icon, setIcon] = React.useState<string>('');
  const [edit, setEdit] = React.useState<boolean>(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();
  const categoryTab = useSelector(categories);

 const matched = transactionCategoriesIcon.find(
   (item) =>  (category.icon_name  === item.label)
 );


  const Icon = matched ? matched.icon : null;

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
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
    console.log(item);

    const res = await updateCategory(
      {
        title: item.title,
        icon_name: item.icon_name,
        description: item.description,
      },
      category.id
    );

    // Réinitialise tous les champs du formulaire
    formRef.current.reset();
    if (categoryTab) {
      const newTab = categoryTab.filter((item) => item.id !== category.id);
      dispatch(setCategory([res, ...newTab]));
    }
    setEdit(false);
    console.log(res);
  };

  const handleDelete = async () => {
    console.log(category.showCategory);
    
    if (category.showCategory && categoryTab) {
      const res = await deleteCategory(category.id);
      const newTab = categoryTab.filter((item) => item.id !== category.id);
      dispatch(setCategory(newTab));
      console.log(res);
      console.log(category.showCategory);
    }
  };
  return (
    <>
      <div className=" flex flex-row items-center justify-start px-3.5 h-[80px] gap-3.5 bg-[rgba(255,255,255,0.1)] rounded-[6px]  ">
        <span className=" w-[65px] h-[65px] bg-[rgba(252,163,17,0.28)] flex justify-center rounded-full text-[30px] items-center ">
          {Icon ? <Icon /> : '❓'}
        </span>
        <div className=" flex flex-col gap-1 ">
          <h6 className="font-medium text-[15px]">
            {category.title.length > 20
              ? `${category.title.slice(0, 20)}...`
              : category.title}
          </h6>
          <div className="text-[#FFFFFF66] text-[23px] flex flex-row gap-1.5 ">
            <MdDelete
              className="cursor-pointer hover:text-[#fca311]  "
              onClick={handleDelete}
            />
            <FaEdit
              className="cursor-pointer hover:text-[#fca311]  "
              onClick={() => setEdit(true)}
            />
          </div>
        </div>
      </div>
      {edit && (
        <div className="absolute inset-0 bg-[#1c1c1cdc]">
          <SeeCategoryDetail
            {...{ setIcon, formRef, category, handleUpdate, setEdit }}
          />
        </div>
      )}
    </>
  );
};
