// src/pages/Login.jsx
import { Form, useActionData, useNavigation } from 'react-router';
import { IoMdMail } from 'react-icons/io';
import { MdOutlineLock } from 'react-icons/md';
import './Login.css';
import { FcGoogle } from 'react-icons/fc';
import { AuthInfo } from '../../Components/Authentification/AuthInfo';
import { useEffect, useState } from 'react';
import { LoaderBoundary } from '../../App';
import { requireAuth } from '../../utils/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { setNavVisible, visible } from '../../Redux/Slices/navSlice';
import { getUser } from '../../Redux/Slices/userSlice';
import type { User } from '../../utils/Types';

export function Login() {
  const error = useActionData();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navVisible = useSelector(visible);

  useEffect(() => {
    setLoading(true);
    const path = window.location.pathname;

    requireAuth()
      .then((res) => {
        if (res && typeof res === 'object') {
          const newRes = res as User;
          delete newRes.expenses;
          dispatch(getUser(newRes));
          
          dispatch(setNavVisible(true));
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
      })
      .finally(() => {
        if (!navVisible) {
          setLoading(false);
        }
        if (navVisible && path !== '/Login') {
          setLoading(false);
        }
      });
  }, [navigation.state, dispatch, navVisible]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {loading && <LoaderBoundary />}
      <div className="authentication">
        <div className="flex flex-row w-[100%] items-center justify-center overflow-hidden ">
          {/* Left Side - Auth Info */}
          <AuthInfo />

          <div className="flex flex-col items-center justify-center gap-2.5 w-[50%]">
            <div className="w-sm[90%] flex flex-col items-center justify-center w-[438px] pl-15">
              {/* Form */}
              <Form
                method="post"
                className="flex flex-col  gap-[35px] w-[430px]"
              >
                {/* Header */}
                <div className="flex flex-col gap-[5px] ">
                  <h1 className="text-[#FFFFFF] font-semibold text-[32px]">
                    Welcome Back
                  </h1>
                  <p className="text-[#FFFFFF9E] text-[23px] font-medium">
                    Sign in to your account
                  </p>
                </div>

                <div>
                  {/* Input Fields */}
                  <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-col gap-[10px] relative">
                      <label className="text-[#FFFFFFCC] text-[18px] font-semibold">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        className=" h-[54px] text-[18px] font-medium outline-0 border-[#FFFFFF80] border-1 focus:border-[#FCA311] focus:outline-[#FCA311] focus:outline-2 focus:invalid:border-[#EC0B43] focus:invalid:outline-[#EC0B43] rounded-[30px] pl-13 pr-7 peer invalid:border-[#EC0B43] peer-invalid:outline-[#EC0B43] peer"
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
                        placeholder="Enter your Password"
                        className=" h-[54px] outline-0 border-[#FFFFFF80] border-1 focus:border-[#FCA311] focus:outline-[#FCA311] focus:outline-2 focus:invalid:border-[#EC0B43] focus:invalid:outline-[#EC0B43] rounded-[30px] pl-13 pr-7 peer"
                      />
                      <div className="absolute bottom-[18px] left-5 text-[#FFFFFF80] peer-focus:text-[#FCA311] peer-invalid:text-[#EC0B43]">
                        <MdOutlineLock size={24} />
                      </div>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex justify-between items-center mt-[18px]">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        className="w-4 h-4 accent-[#FCA311] border-[#FFFFFF80] rounded checked:text-red-500"
                      />
                      <label
                        htmlFor="remember"
                        className="text-[#FFFFFFCC] text-[16px] font-semibold"
                      >
                        Remember me
                      </label>
                    </div>
                    <a
                      href="/forgot-password"
                      style={{ color: '#FCA311' }}
                      className="text-[16px] font-semibold"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={navigation.state === 'submitting'}
                  className="no-hover border-0 text-[#FFFFFF] font-semibold text-[18px] h-[54px] rounded-[33px] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#FCA311', borderRadius: '30px' }}
                >
                  {navigation.state === 'submitting'
                    ? 'Connecting...'
                    : 'Sign In'}
                </button>
              </Form>

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
                <a href="/register" style={{ color: '#FCA311' }}>
                  Sign Up
                </a>
              </p>
              {/* Error Message */}
              {error && (
                <p style={{ color: '#EC0B43' }} className="text-center mt-5">
                  {error.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
