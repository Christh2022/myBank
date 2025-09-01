import PageWithLoader from '../../Components/PageWithLoader/PageWithLoader';
import LeftProfilePart from '../../Components/Profile/LeftProfilePart';
import RightProfilePart from '../../Components/Profile/RightProfilePart';

export default function Profile() {
  return (
    <PageWithLoader>
      <div className="flex flex-wrap lg:flex-nowrap justify-between fixed top-28 left-6 lg:left-[110px] right-5 bottom-0 sm:bottom-8 gap-6 overflow-y-scroll">
        <div className="flex flex-1 pt-10 pb-10 bg-[#1B1919] rounded-[20px] sm:mb-0 mb-4 ">
          <div className=" flex flex-col md:flex-row  gap-4 w-full">
            <LeftProfilePart />
            <RightProfilePart />
          </div>
        </div>
      </div>
    </PageWithLoader>
  );
}
