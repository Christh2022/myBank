import { useNavigate } from 'react-router';
import PageWithLoader from '../../Components/PageWithLoader/PageWithLoader';

export default function Home() {
  const navigate = useNavigate();

  return (
    <PageWithLoader>
      <div className="fixed top-28 left-6 lg:left-[110px] right-5 bottom-0 sm:bottom-8 gap-6 overflow-y-scroll">
        <div className="flex items-center w-full h-full justify-center">
          <div className=" flex  flex-col gap-1.5 items-center justify-center flex-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#ffffffef]">
              Page not found
            </h2>
            <p className="text-sm md:text-sm lg:text-md xl:text-lg text-[#ffffffc0]">
              the page you're searching for isn't available
            </p>

            <button
              style={{
                boxShadow: '0px 4px 15px rgba(252, 163, 17, 0.4)',
              }}
              className="w-[200px]  hover:bg-[#FCA311]/30 bg-[#FCA311] text-white py-3 px-0 rounded-[40px] font-bold mt-3 cursor-pointer"
              onClick={() => {
                navigate('/transactions');
              }}
            >
              Go to Transaction
            </button>
          </div>
        </div>
      </div>
    </PageWithLoader>
  );
}
