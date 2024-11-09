import React from "react";
import { Link } from "react-router-dom";
import SocialHandles from "./SocialHandles";

function Footer() {
  return (
    <div className="flex h-[25rem] fixed bottom-0 z-5 px-4 py-10 w-full bg-[#0C0713] text-[#fff]">
      <div id="label" className="w-[40%]">
        <h2 className='text-5xl font-["Oddval"] tracking-tighter'>PUREM</h2>
        <h2 className='text-5xl font-["Oddval"] tracking-tighter mt-[-11px]'>
          ODA
        </h2>
        <h4 className="text-['SourceSans']">FOR EVERYONE BUT NOT ANYONE</h4>
      </div>

      <div id="social-handles w-[40%]">
        <h2 className="text-3xl uppercase text-['SourceSans'] font-[900] mb-10">
          Socials
        </h2>
        <SocialHandles />
      </div>

      <div id="setup-shop" className="ml-[30%]">
        <h2 className="text-2xl ml-8 text-['SourceSans'] font-[200]">
          SET
          <br />
          UP
          <br />
          YOUR
        </h2>
        <Link className="border-white border-[0.5px] text-3xl mt-1 w-[14rem] h-[4rem] rounded-full inline-block flex items-center justify-center hover:bg-white hover:text-black transition-all duration-[0.3s] ease-in-out text-['SourceSans'] font-[900]">
          OWN SHOP
        </Link>
      </div>
    </div>
  );
}

export default Footer;
