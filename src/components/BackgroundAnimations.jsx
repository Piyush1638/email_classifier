import React from "react";

const BackgroundAnimations = () => {
  return (
    <div className="area absolute inset-0 w-full h-full z-[-1]">
      <ul className="circles relative w-full h-[96%] overflow-hidden">
        <li className="absolute list-none w-20 h-20 bg-[rgba(255,255,255,0.2)] animate-animate bottom-[-150px] left-[25%]"></li>
        <li className="absolute list-none w-5 h-5 bg-[rgba(255,255,255,0.2)] animate-animate bottom-[-150px] left-[10%] animation-delay-[2s] duration-[12s]"></li>
        <li className="absolute list-none w-5 h-5 bg-[rgba(255,255,255,0.2)] animate-animate bottom-[-150px] left-[70%] animation-delay-[4s]"></li>
        <li className="absolute list-none w-15 h-15 bg-[rgba(255,255,255,0.2)] animate-animate bottom-[-150px] left-[40%] duration-[18s]"></li>
        <li className="absolute list-none w-5 h-5 bg-[rgba(255,255,255,0.2)] animate-animate bottom-[-150px] left-[65%]"></li>
        <li className="absolute list-none w-[110px] h-[110px] bg-[rgba(255,255,255,0.2)] animate-animate bottom-[-150px] left-[75%] animation-delay-[3s]"></li>
        <li className="absolute list-none w-[150px] h-[150px] bg-[rgba(255,255,255,0.2)] animate-animate bottom-[-150px] left-[35%] animation-delay-[7s]"></li>
        <li className="absolute list-none w-6 h-6 bg-[rgba(255,255,255,0.2)] animate-animate bottom-[-150px] left-[50%] animation-delay-[15s] duration-[45s]"></li>
        <li className="absolute list-none w-4 h-4 bg-[rgba(255,255,255,0.2)] animate-animate bottom-[-150px] left-[20%] animation-delay-[2s] duration-[35s]"></li>
        <li className="absolute list-none w-[150px] h-[150px] bg-[rgba(255,255,255,0.2)] animate-animate bottom-[-150px] left-[85%] animation-delay-[0s] duration-[11s]"></li>
      </ul>
    </div>
  );
};

export default BackgroundAnimations;
