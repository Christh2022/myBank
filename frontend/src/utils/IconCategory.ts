import {
  FaUtensils, FaShoppingBasket, FaBus, FaGasPump, FaMobileAlt,
  FaGamepad, FaRegCreditCard, FaShoppingBag, FaHeartbeat, FaDumbbell,
  FaPlane, FaGift, FaBook, FaPaw, FaHandsHelping, FaHome,
  FaFileInvoiceDollar, FaExchangeAlt, FaMoneyBillWave, FaPiggyBank,
  FaLaptopCode
} from 'react-icons/fa';

export const transactionCategoriesIcon = [
  { key: 'food', icon: FaUtensils, label: 'Alimentation / Restaurants' },
  { key: 'groceries', icon: FaShoppingBasket, label: 'Courses / Supermarché' },
  { key: 'transport', icon: FaBus, label: 'Transport' },
  { key: 'fuel', icon: FaGasPump, label: 'Carburant' },
  { key: 'mobile', icon: FaMobileAlt, label: 'Téléphone / Internet' },
  { key: 'entertainment', icon: FaGamepad, label: 'Loisirs / Divertissement' },
  { key: 'subscriptions', icon: FaRegCreditCard, label: 'Abonnements' },
  { key: 'shopping', icon: FaShoppingBag, label: 'Shopping' },
  { key: 'health', icon: FaHeartbeat, label: 'Santé / Pharmacie' },
  { key: 'sports', icon: FaDumbbell, label: 'Sport / Fitness' },
  { key: 'travel', icon: FaPlane, label: 'Voyage / Hôtel' },
  { key: 'gifts', icon: FaGift, label: 'Cadeaux' },
  { key: 'education', icon: FaBook, label: 'Éducation / Scolarité' },
  { key: 'pets', icon: FaPaw, label: 'Animaux' },
  { key: 'charity', icon: FaHandsHelping, label: 'Dons / Charité' },
  { key: 'housing', icon: FaHome, label: 'Logement / Loyer' },
  { key: 'taxes', icon: FaFileInvoiceDollar, label: 'Impôts / Taxes' },
  { key: 'transfers', icon: FaExchangeAlt, label: 'Transferts' },
  { key: 'atm', icon: FaMoneyBillWave, label: 'Retraits DAB' },
  { key: 'savings', icon: FaPiggyBank, label: 'Épargne' },
  {key: 'Dev', icon: FaLaptopCode, label: "FaLaptopCode"}
];
