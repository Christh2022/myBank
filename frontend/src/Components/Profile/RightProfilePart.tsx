import React from 'react';
import ButtonSave from '../../UI/Profile/ButtonSave';
import { Avatar, Badge, styled } from '@mui/material';
import { IoIosCamera } from 'react-icons/io';
import CountrySelect from '../../UI/Profile/ChooseCountry';
import { isMobile } from '../../Constant/Constant';
import { useDispatch, useSelector } from 'react-redux';
import type { User } from '../../utils/Types';
import { getUser, user } from '../../Redux/Slices/userSlice';
import { UpdateUser } from '../../Api/UserController';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#1B1919',
    color: '#1B1919',
    borderRadius: '50%',
    cursor: 'pointer',

    // Valeur par défaut
    width: 20,
    height: 20,

    // Responsive via breakpoints
    [theme.breakpoints.up('sm')]: {
      width: 25,
      height: 25,
    },
    [theme.breakpoints.up('md')]: {
      width: 30,
      height: 30,
    },
  },
}));

export default function RightProfilePart() {
  const [image, setImage] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const profileData = useSelector(user) as User;
  const [country, setCountry] = React.useState(profileData.country || '');
  const formRef = React.useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const triggerFileSelect = () => {
    inputRef.current?.click();
  };

  const handleClick = async () => {
    if (!formRef.current) return;
    setLoading(true);

    const formData = new FormData(formRef.current);
    const updates: Record<string, string> = {};

    formData.forEach((value, key) => {
      const newValue = value.toString().trim();
      const originalValue = profileData[key as keyof typeof profileData];

      if (newValue && newValue !== originalValue) {
        updates[key] = newValue;
      }
    });

    if (country && country !== profileData.country) {
      updates['country'] = country;
    }

    // Reconstruire l'adresse uniquement si au moins un des champs a été modifié
    if (
      updates.adresse ||
      updates.zip ||
      updates.ville ||
      country !== profileData.country
    ) {
      updates.adresse = `${updates.adresse || profileData.address} ${updates.zip || profileData.zip} ${updates.ville || profileData.city}, ${country ?? profileData.country}`;
    }

    const res = await UpdateUser(profileData, updates);

    if (res && typeof res === 'object') {
      const newRes = res as User;
      console.log('good', newRes);
      dispatch(getUser(newRes));

      // Réinitialise tous les champs du formulaire
      formRef.current.reset();
      setCountry('');
      
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 sm:flex-9/12  md:pl-2 lg:pl-6 overflow-hidden ">
      <div className="flex flex-row w-[100%] px-[24px] items-center justify-between">
        <h2 className=" text-[17px] sm:text-[21px] font-bold text-white ">
          Personal information
        </h2>
        {!isMobile && <ButtonSave {...{ handleClick }} />}
      </div>
      <div className="px-[24px]">
        <div className="border-b border-t mt-5 border-[rgba(255,255,255,0.2)] py-6 w-[100%] ">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            sx={{}}
            badgeContent={
              <span className="text-[13px] sm:text-[17px] md:text-[25px] text-white">
                <IoIosCamera />
              </span>
            }
            onClick={triggerFileSelect}
          >
            <Avatar
              sx={{
                bgcolor: '#fca311',
                width: {
                  xs: 45, // petite taille
                  sm: 60, // small ≥600px
                  md: 80, // medium ≥900px
                  lg: 100, // large ≥1200px
                },
                height: {
                  xs: 45,
                  sm: 60,
                  md: 80,
                  lg: 100,
                },
              }}
              alt="Remy Sharp"
              src={image ?? profileData.profile}
              className=" w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px]"
            />
          </StyledBadge>
        </div>
      </div>

      <form
        ref={formRef}
        className="mt-6 w-[100%] grid px-[24px] sm:grid-cols-2 grid-cols-1 gap-4"
      >
        <div className="flex flex-col">
          <label className="text-[15px] text-white font-medium mb-2">
            First Name
          </label>
          <input
            type="text"
            name="prenom"
            className="bg-transparent border border-[rgba(255,255,255,0.2)] font-medium  py-2 px-3 outline-0 text-white focus:outline-0 focus:ring-1 focus:ring-[#fca311] focus:border-[#fca311] rounded-[18px]"
            placeholder={profileData.firstName || 'Enter your first name'}
            disabled={loading}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[15px] text-white font-medium mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="nom"
            className="bg-transparent border border-[rgba(255,255,255,0.2)] font-medium  py-2 px-3 outline-0 text-white focus:outline-0 focus:ring-1 focus:ring-[#fca311] focus:border-[#fca311] rounded-[18px]"
            placeholder={profileData.lastName || 'Enter your last name'}
            disabled={loading}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[15px] text-[rgba(255,255,255,0.3)] font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="bg-transparent border border-[rgba(255,255,255,0.2)] font-medium  py-2 px-3 outline-0 text-[rgba(255,255,255,0.3)] focus:outline-0 focus:ring-1 focus:ring-[#fca311] focus:border-[#fca311] rounded-[18px]"
            placeholder="Enter your email"
            value={profileData.email}
            disabled
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[15px] text-white font-medium mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="telephone"
            maxLength={10}
            minLength={10}
            className="bg-transparent border border-[rgba(255,255,255,0.2)] font-medium  py-2 px-3 outline-0 text-white focus:outline-0 focus:ring-1 focus:ring-[#fca311] focus:border-[#fca311] rounded-[18px]"
            placeholder={profileData.phone || 'Enter your phone number'}
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[15px] text-white font-medium mb-2">
            Country
          </label>
          <CountrySelect {...{ profileData, loading }} onChange={setCountry} />
        </div>
        <div className="flex flex-col">
          <label className="text-[15px] text-white font-medium mb-2">
            City
          </label>
          <input
            type="text"
            name="ville"
            className="bg-transparent border border-[rgba(255,255,255,0.2)] font-medium  py-2 px-3 outline-0 text-white focus:outline-0 focus:ring-1 focus:ring-[#fca311] focus:border-[#fca311] rounded-[18px]"
            placeholder={profileData?.city || 'Enter your city'}
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[15px] text-white font-medium mb-2">
            Zip Code
          </label>
          <input
            type="number"
            name="zip"
            className="bg-transparent border border-[rgba(255,255,255,0.2)] font-medium  py-2 px-3 outline-0 text-white focus:outline-0 focus:ring-1 focus:ring-[#fca311] focus:border-[#fca311] rounded-[18px]"
            placeholder={profileData.zip || 'Enter your zip code'}
            maxLength={5}
            minLength={5}
            pattern="\d{5}"
            title="Please enter a valid 5-digit zip code"
            disabled={loading}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[15px] text-white font-medium mb-2">
            Address
          </label>
          <input
            type="text"
            name="adresse"
            className="bg-transparent border border-[rgba(255,255,255,0.2)] font-medium  py-2 px-3 outline-0 text-white focus:outline-0 focus:ring-1 focus:ring-[#fca311] focus:border-[#fca311] rounded-[18px]"
            placeholder={
              (profileData.address.length >= 40
                ? profileData.address.slice(0, 40) + '...'
                : profileData.address) || 'Enter your address'
            }
            disabled={loading}
          />
        </div>
        {isMobile && <ButtonSave {...{ handleClick }} />}
      </form>
    </div>
  );
}
