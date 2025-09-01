import Group160 from '../../assets/Group 160.svg';

export const AuthInfo = () => {
    return (
      <div className="w-[50%] flex flex-col items-center justify-center">
        <div className="relative w-[100%]">
          <img
            src={Group160}
            alt="Auth Illustration"
            className="mb-6 w-[581px] h-[700px]"
          />
          <div className="absolute top-13 left-15">
            <h2 className="text-[#FFFFFF] text-[50px]  font-semibold h2-color">
              Start Your <br />
              Journey <br />
              with Us
            </h2>
          </div>
          <div className="absolute bottom-15 left-36 w-[386px]">
            <span className="text-[#FFFFFF] text-[15px]  font-semibold h2-color">
              L’authentification sécurise l’accès à l’espace personnel de chaque
              utilisateur.  
            </span>
          </div>
        </div>
      </div>
    );
};
