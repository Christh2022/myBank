import React from 'react';
import { FaAngleDown, FaPlus } from 'react-icons/fa';
import { IoCard } from 'react-icons/io5';
import { TbCalendarMonthFilled, TbCoinEuroFilled } from 'react-icons/tb';
import card from '../../assets/Card.svg';
import { RiCloseLine } from 'react-icons/ri';
import { createTransaction } from '../../Api/ExpenseController';
import { getBankCardByNumber } from '../../Api/CardsController';
import { toast } from 'react-toastify';
import { getCategoryByName } from '../../Api/CategoryController';
import { useDispatch } from 'react-redux';
import { setTransactions } from '../../Redux/Slices/ExpenseSlice';

export const AddTransaction = ({
  addTransaction,
}: {
  addTransaction: () => void;
  }) => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const dispatch = useDispatch();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const transactionData = {
      amount: parseFloat(formData.get('amount') as string),
      status: 'pending',
      label: formData.get('payement_name') as string,
      bankCards: Number(formData.get('card') as string),
      category: formData.get('category') as string,
    };
    console.log(transactionData);
    
    if (
      transactionData.amount.toString().length < 1 ||
      transactionData.label?.length <= 3 ||
      transactionData.bankCards.toString().length < 16 ||
      transactionData.category?.length <= 3
    ) {
      toast.error('veuillez entrer des informations valides');
      return;
    }

    try {
      const card = await getBankCardByNumber(
        transactionData.bankCards.toString()
      );

      const category = await getCategoryByName(transactionData.category);


      if (card && category) {
        const data ={
          amount: transactionData.amount,
          status: 'pending',
          label: transactionData.label,
          bankCards: card.id,
          category: category.id,
          date: new Date(),
        }
        const res = await createTransaction(data);
        const table = []
        table.push(res)
        dispatch(setTransactions(table));
        toast.success("Vous venez d'ajouter une nouvelle transaction.");
        // fermer le modal et rafraîchir la liste
        addTransaction();
      } else {
        toast.error('Information Incorrect');
      }
      form.reset();
    } catch (error) {
      console.error('Erreur création transaction :', error);
    }
    setLoading(false);
    setTimeout(() => {}, 1000);
  };

  return (
    <div className="w-[773px] sm:h-[464px] bg-[#1B1919] py-4 px-6 rounded-[20px]  ">
      <div className="flex items-center justify-between mb-7">
        <h2 className="text-[rgba(255,255,255,1)] text-[20px] font-bold">
          Add New Transaction
        </h2>
        <button
          type="button"
          onClick={addTransaction}
          className="cursor-pointer outline-none text-[30px]"
        >
          <RiCloseLine />
        </button>
      </div>
      {/* Form fields for adding a transaction */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label
            className="font-medium text-[rgba(255,255,255,0.25)] text-[17px]"
            htmlFor="asset"
          >
            Asset
          </label>
          <div className="relative border border-[rgba(255,255,255,0.25)] rounded-[4px] h-[42px] ">
            <IoCard className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[rgba(255,255,255,0.25)] text-[25px]" />
            <FaAngleDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[rgba(255,255,255,0.25)] text-[25px]" />
            <input
              type="text"
              id="asset"
              name="asset"
              className="outline-none w-[100%] h-[100%] font-medium text-[rgba(255,255,255,0.25)] pl-13.5 pr-5"
              placeholder="EUR"
              disabled
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label
            className="font-medium text-[rgba(255,255,255,1)] text-[17px]"
            htmlFor="amount"
          >
            Amount <span className="text-[#fca311]">*</span>
          </label>
          <div className="relative border border-[rgba(255,255,255,0.25)] rounded-[4px] h-[42px] ">
            <TbCoinEuroFilled className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[rgba(255,255,255,1)] text-[25px]" />
            <input
              type="text"
              id="amount"
              name="amount"
              className="outline-none w-[100%] h-[100%] font-medium text-[rgba(255,255,255,1)] pl-13.5 pr-5"
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label
            className="font-medium text-[rgba(255,255,255,1)] text-[17px]"
            htmlFor="category"
          >
            Category <span className="text-[#fca311]">*</span>
          </label>
          <div className="relative border border-[rgba(255,255,255,0.25)] rounded-[4px] h-[42px] ">
            <input
              type="text"
              id="category"
              name="category"
              className="outline-none w-[100%] h-[100%] font-medium text-[rgba(255,255,255,1)] pl-3 pr-5"
              placeholder="Chose a category"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label
            className="font-medium text-[rgba(255,255,255,1)] text-[17px]"
            htmlFor="payement_name"
          >
            Payment Name <span className="text-[#fca311]">*</span>
          </label>
          <div className="relative border border-[rgba(255,255,255,0.25)] rounded-[4px] h-[42px] ">
            <input
              type="text"
              id="payement_name"
              name="payement_name"
              className="outline-none w-[100%] h-[100%] font-medium text-[rgba(255,255,255,1)] px-3"
              placeholder="Enter payment name"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="font-medium text-[rgba(255,255,255,0.25)] text-[17px]"
            htmlFor="date"
          >
            Date
          </label>
          <div className="relative border border-[rgba(255,255,255,0.25)] rounded-[4px] h-[42px] ">
            <TbCalendarMonthFilled className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[rgba(255,255,255,0.25)] text-[25px]" />
            <FaAngleDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[rgba(255,255,255,0.25)] text-[25px]" />
            <input
              type="date"
              id="date"
              name="date"
              className="outline-none w-[100%] h-[100%] font-medium text-[rgba(255,255,255,0.25)] pl-13.5 pr-5"
              placeholder="EUR"
              defaultValue={new Date().toISOString().split('T')[0]}
              disabled
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label
            className="font-medium text-[rgba(255,255,255,1)] text-[17px]"
            htmlFor="card"
          >
            Card <span className="text-[#fca311]">*</span>
          </label>
          <div className="relative border border-[rgba(255,255,255,0.25)] rounded-[4px] h-[42px] ">
            <img
              src={card}
              className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[rgba(255,255,255,0.25)] text-[25px]"
            />
            <FaAngleDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[rgba(255,255,255,0.25)] text-[25px]" />
            <input
              type="text"
              id="card"
              name="card"
              className="outline-none w-[100%] h-[100%] font-medium text-[rgba(255,255,255,1)] pl-13.5 pr-5"
              placeholder="0000 **** **** 0000"
              maxLength={16}
            />
          </div>
        </div>

        <div className="cols-span-2">
          <span className="border border-[rgba(255,255,255,0.25)] rounded-[4px] flex items-center justify-center text-[rgba(255,255,255,1)] text-[17px] font-medium cursor-pointer h-[42px] w-[42px] ">
            <FaPlus className="" />
          </span>
        </div>
        <div></div>

        <button
          type="reset"
          className="outline-none border border-[rgba(255,255,255,0.25)] font-medium text-white py-2 px-4 rounded cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`outline-none bg-[#fca311] font-medium  text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-loading ' : 'cursor-pointer'}`}
          disabled={loading}
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};
