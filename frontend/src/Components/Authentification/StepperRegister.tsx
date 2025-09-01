import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, {  useState,  } from 'react';
import { BsFillPhoneFill } from 'react-icons/bs';
import { FaLocationDot, FaUserLarge } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { IoMdMail } from 'react-icons/io';
import { MdOutlineLock } from 'react-icons/md';
import { useNavigation } from 'react-router';

const steps = [
  'step 1',
  'step 2',
];

type StepperRegisterProps = {
    form: { email: string; password: string; confirmPassword: string };
    setForm: React.Dispatch<
        React.SetStateAction<{
        email: string;
        password: string;
        confirmPassword: string;
        }>
    >;
};

export const StepperRegister = ({ form, setForm } : StepperRegisterProps) => {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());
    const navigation = useNavigation();
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {

        if (activeStep === 0) {
            const newErrors: { [key: string]: boolean } = {};
            if (!form.email) newErrors.email = true;
            if (!form.password) newErrors.password = true;
            if (!form.confirmPassword) newErrors.confirmPassword = true;

            setErrors(newErrors);

            if (form.password !== form.confirmPassword) return;    

            // Si au moins un champ est vide, on ne passe pas au step suivant
            if (Object.keys(newErrors).length > 0) return;
        }
        // ...step suivant...
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setForm({...form, password: '', confirmPassword: '' })
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
        });
    };

    // Gère la saisie des champs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (e.target.value) {
            setErrors(prev => ({ ...prev, [e.target.name]: false }));
        }
    };
    


    return (
      <Box>
        {activeStep === 0 ? (
          <>
            {/* Header */}
            <div className="flex flex-col gap-[5px] ">
              <h1 className="text-[#FFFFFF] font-semibold text-[32px]">
                Welcome
              </h1>
              <p className="text-[#FFFFFF9E] text-[23px] font-medium">
                Create an account
              </p>
            </div>

            <div className="mt-5">
              {/* Input Fields */}
              <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col gap-[10px] relative">
                  <label className="text-[#FFFFFFCC] text-[18px] font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter your Email"
                    className={`border h-[54px] text-[18px] font-medium  outline-0  focus:border-[#FCA311] focus:outline-[#FCA311] focus:outline-2 focus:invalid:border-[#EC0B43] focus:invalid:outline-[#EC0B43] rounded-[30px] pl-13 pr-7 peer invalid:border-[#EC0B43] peer-invalid:outline-[#EC0B43] peer ${errors.email ? 'border-[#EC0B43]' : 'border-[#FFFFFF80]'}`}
                  />
                  <div className="absolute bottom-[18px] left-5 text-[#FFFFFF80] peer-focus:text-[#FCA311] peer-invalid:text-[#EC0B43]">
                    <IoMdMail size={20} />
                  </div>
                </div>
                <div className="flex flex-col gap-[10px] relative">
                  <label className="text-[#FFFFFFCC] text-[18px] font-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Enter your Password"
                    className={`border h-[54px] text-[18px] font-medium  outline-0  focus:border-[#FCA311] focus:outline-[#FCA311] focus:outline-2 focus:invalid:border-[#EC0B43] focus:invalid:outline-[#EC0B43] rounded-[30px] pl-13 pr-7 peer invalid:border-[#EC0B43] peer-invalid:outline-[#EC0B43] peer ${errors.password ? 'border-[#EC0B43]' : 'border-[#FFFFFF80]'}`}
                  />
                  <div className="absolute bottom-[18px] left-5 text-[#FFFFFF80] peer-focus:text-[#FCA311] peer-invalid:text-[#EC0B43]">
                    <MdOutlineLock size={24} />
                  </div>
                </div>
                <div className="flex flex-col gap-[10px] relative">
                  <label className="text-[#FFFFFFCC] text-[18px] font-semibold">
                    Comfirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    placeholder="Comfirm your Password"
                    className={`border h-[54px] text-[18px] font-medium  outline-0  focus:border-[#FCA311] focus:outline-[#FCA311] focus:outline-2 focus:invalid:border-[#EC0B43] focus:invalid:outline-[#EC0B43] rounded-[30px] pl-13 pr-7 peer invalid:border-[#EC0B43] peer-invalid:outline-[#EC0B43] peer ${errors.password ? 'border-[#EC0B43]' : 'border-[#FFFFFF80]'}`}
                  />
                  <div className="absolute bottom-[18px] left-5 text-[#FFFFFF80] peer-focus:text-[#FCA311] peer-invalid:text-[#EC0B43]">
                    <MdOutlineLock size={24} />
                  </div>
                </div>
              </div>
            </div>
            {form.password && form.password !== form.confirmPassword && (
              <p style={{ color: '#EC0B43' }} className="text-center mt-5">
                Passwords do not match
              </p>
            )}
          </>
        ) : (
          <>
            <div>
              <input type="hidden" name="email" value={form.email} />
              <input type="hidden" name="password" value={form.password} />
              <input type="hidden" name="confirmPassword" value={form.confirmPassword} />
              {/* Input Fields */}
              <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col gap-[10px] relative">
                  <label className="text-[#FFFFFFCC] text-[18px] font-semibold">
                    LastName
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Enter your LastName"
                    className="h-[54px] text-[18px] font-medium outline-0 border-[#FFFFFF80] border-1 focus:border-[#FCA311] focus:outline-[#FCA311] focus:outline-2 focus:invalid:border-[#EC0B43] focus:invalid:outline-[#EC0B43] rounded-[30px] pl-13 pr-7 peer invalid:border-[#EC0B43] peer-invalid:outline-[#EC0B43] peer"
                  />
                  <div className="absolute bottom-[18px] left-5 text-[#FFFFFF80] peer-focus:text-[#FCA311] peer-invalid:text-[#EC0B43]">
                    <FaUserLarge size={20} />
                  </div>
                </div>
                <div className="flex flex-col gap-[10px] relative">
                  <label className="text-[#FFFFFFCC] text-[18px] font-semibold">
                    Surname
                  </label>
                  <input
                    type="text"
                    name="surname"
                    placeholder="Enter your SurName"
                    className="h-[54px]  outline-0 border-[#FFFFFF80] border-1 focus:border-[#FCA311] focus:outline-[#FCA311] focus:outline-2 focus:invalid:border-[#EC0B43] focus:invalid:outline-[#EC0B43] rounded-[30px] pl-13 pr-7 peer"
                  />
                  <div className="absolute bottom-[18px] left-5 text-[#FFFFFF80] peer-focus:text-[#FCA311] peer-invalid:text-[#EC0B43]">
                    <FaUserLarge size={20} />
                  </div>
                </div>
                <div className="flex flex-col gap-[10px] relative">
                  <label className="text-[#FFFFFFCC] text-[18px] font-semibold">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your Address"
                    className="h-[54px] outline-0 border-[#FFFFFF80] border-1 focus:border-[#FCA311] focus:outline-[#FCA311] focus:outline-2 focus:invalid:border-[#EC0B43] focus:invalid:outline-[#EC0B43] rounded-[30px] pl-13 pr-7 peer"
                  />
                  <div className="absolute bottom-[18px] left-5 text-[#FFFFFF80] peer-focus:text-[#FCA311] peer-invalid:text-[#EC0B43]">
                    <FaLocationDot size={20} />
                  </div>
                </div>
                <div className="flex flex-col gap-[10px] relative">
                  <label className="text-[#FFFFFFCC] text-[18px] font-semibold">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter your Phone Number"
                    className="h-[54px] outline-0 border-[#FFFFFF80] border-1 focus:border-[#FCA311] focus:outline-[#FCA311] focus:outline-2 focus:invalid:border-[#EC0B43] focus:invalid:outline-[#EC0B43] rounded-[30px] pl-13 pr-7 peer"
                  />
                  <div className="absolute bottom-[18px] left-5 text-[#FFFFFF80] peer-focus:text-[#FCA311] peer-invalid:text-[#EC0B43]">
                    <BsFillPhoneFill size={20} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="mt-8 flex flex-row items-center justify-between">
          {isStepOptional(activeStep) && (
            <Button
              color="inherit"
              onClick={handleSkip}
              sx={{ mr: 1 }}
              style={{
                color: 'white',
                border: '1px solid ',
                padding: '0 20px',
                height: 54,
                borderRadius: 30
              }}
            >
              Previous
            </Button>
          )}

          {activeStep === steps.length - 1 && (
            <button
              type="submit"
              disabled={navigation.state === 'submitting'}
              className="no-hover px-5  border-0 text-[#FFFFFF] font-semibold text-[18px] h-[54px] rounded-[33px] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#FCA311', borderRadius: '30px' }}
            >
              {navigation.state === 'submitting'
                ? 'Registration...'
                : 'Sign Up'}
            </button>
          )}
        </div>

        {activeStep === 0 && (
          <>
            <Button
              onClick={handleNext}
              className=" text-[18px] h-[54px] rounded-[33px]"
              style={{
                marginTop: 30,
                backgroundColor: '#FCA311',
                borderRadius: '30px',
                color: 'white',
                width: '100%',
                fontWeight: 600,
              }}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>

            {/* Google sign in Link */}
            <div className="w-[430px]">
              <div className="relative">
                <hr className="my-5 border-[#FFFFFF4D]" />
                <p className="absolute bg-black px-2 py-.5 -top-4 left-1/2 transform -translate-x-1/2 text-[#ffffff] text-[18px] font-semibold">
                  Or
                </p>
              </div>

              <button className="cursor-pointer w-full flex justify-center items-center mt-1 h-[54px] border border-[#FFFFFF80] rounded-[30px]">
                <FcGoogle size={20} />
                <p className=" text-[#FFFFFF99] font-semibold text-[16px] rounded-[30px] px-4 text-center w-[80%]">
                  Sign in with Google
                </p>
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-[#FFFFFF80] mt-5 text-center text-[16px] font-semibold">
              Don't have an account?{' '}
              <a href="/Login" style={{ color: '#FCA311' }}>
                Sign In
              </a>
            </p>
          </>
        )}
      </Box>
    );
};
