import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { RiArrowDownLine, RiMailLine, RiStore2Line } from "@remixicon/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productsAction";
import Carousel from "../components/Carousel";
import axios from "../utils/axios";

function HomePage() {
  const [isHovering, setIsHovering] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [isLinkHovering, setIsLinkHovering] = useState(false);
  const [saleProducts, setSaleProducts] = useState([]);

  const fetchSaleProducts = async () => {
    const response = await axios.get("/products/sale");
    setSaleProducts(response.data.products);
  };

  useEffect(() => {
    fetchSaleProducts();
  }, []);
  // Create motion values for x and y coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Use spring for smoother transitions
  const smoothX = useSpring(x, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseEnter = () => {
    setIsHovering(true);
    setIsCursorVisible(true); // Show cursor when entering
  };

  // Update the cursor position on mouse move
  const handleMouseMove = (event) => {
    const { clientX, clientY, currentTarget } = event;
    const rect = currentTarget.getBoundingClientRect();

    // Update x and y with the mouse position relative to the #right-page div
    x.set(clientX - rect.left - 56); // Subtract half the width of the cursor (28px radius * 2)
    y.set(clientY - rect.top - 56); // Subtract half the height of the cursor
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Delay hiding the cursor to allow for exit animation
    setTimeout(() => {
      setIsCursorVisible(false);
    }, 300); // Match this duration with your exit animation duration
  };

  const handleLinkMouseEnter = () => {
    setIsLinkHovering(true);
    setIsHovering(false); // Hide custom cursor
  };

  const handleLinkMouseLeave = () => {
    setIsLinkHovering(false);
    setIsHovering(true); // Show custom cursor
  };

  return (
    <main
      className="mx-auto w-full h-full"
      style={{ backgroundColor: "#FFFEFE" }}
    >
      <div id="landing-page" className="flex gap-2">
        <div id="left-page" className="w-[48%]">
          <div className="px-[3rem] h-[70%] py-[3rem] rounded-[30px] bg-[#DBDAD7]">
            <h2 className='font-["Oddval"] flex items-center text-[5vw] uppercase tracking-tighter leading-[5vw]'>
              for
              <span className="ml-10">
                <svg
                  width="250"
                  height="30"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="black"
                  stroke-width="3"
                >
                  {/* Stratight line */}
                  <line x1="0" y1="15" x2="200" y2="15" />
                  {/* The arrow head */}
                  <line x1="200" y1="15" x2="185" y2="5" />
                  <line x1="200" y1="15" x2="185" y2="25" />
                </svg>
              </span>
            </h2>
            <h2 className='font-["Oddval"] text-[5vw] uppercase tracking-tighter leading-[5vw]'>
              everyone but
            </h2>
            <h2 className='font-["Oddval"] text-[5vw] uppercase tracking-tighter leading-[5vw]'>
              notanyone
            </h2>

            <p className='font-["SourceSans"] text-lg mt-[3rem]'>
              We establist personal relationships with our boutiques, to make
              sure each is vetted for a stress-free shopping experience.
            </p>
          </div>
          <div className="flex h-[28.5%] gap-[.5vw] items-center justify-between mt-2">
            <div
              className="relative h-full bg-red-200 w-full h-[15.5vw] rounded-[30px] "
              style={{
                backgroundImage: "",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h3 className='font-["Oddval"] text-[2vw] text-[#FFFEFE] absolute bottom-[7.5%] left-[7.5%]'>
                #RIP STOP
              </h3>
            </div>
            <div
              className="relative h-full bg-red-200 w-full h-[15.5vw] rounded-[30px]"
              style={{
                backgroundImage: "",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h3 className='font-["Oddval"] text-[2vw] text-[#FFFEFE] absolute bottom-[7.5%] left-[7.5%]'>
                #INSULATED
              </h3>
            </div>
          </div>
        </div>
        <div
          id="right-page"
          className="w-[52%] rounded-[30px] bg-red-600 h-[85vh] relative overflow-hidden"
          style={{
            backgroundImage: "",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            className="bg-[#FFFEFE] absolute w-[14rem] h-[3rem] rounded-full px-1 py-3 flex items-center justify-between bottom-[3%] left-[46%] -translate-x-1/2 -translate-y-1/2 group"
            onMouseEnter={handleLinkMouseEnter}
            onMouseLeave={handleLinkMouseLeave}
          >
            <h4 className="tracking-tighter text-lg text-[#000] ml-3">
              LEARN MORE
            </h4>
            <div className="bg-[#000] rounded-full w-10 h-10 aspect-square flex items-center justify-center overflow-hidden">
              <div className="flex flex-col gap-4 translate-y-[-31%] group-hover:translate-y-[33%] transition-all ease-in-out duration-[0.3s]">
                <span className="">
                  <RiArrowDownLine size={20} color="#FFFEFE" />
                </span>
                <span>
                  <RiArrowDownLine size={20} color="#FFFEFE" />
                </span>
              </div>
            </div>
          </Link>
          <Link
            className="border-[#FFFEFE] border-[1px] absolute w-[14rem] h-[3rem] rounded-full px-1 py-3 flex items-center justify-between bottom-[3%] left-[80%] -translate-x-1/2 -translate-y-1/2 group"
            onMouseEnter={handleLinkMouseEnter}
            onMouseLeave={handleLinkMouseLeave}
          >
            <h4 className="tracking-tighter text-lg text-[#FFFEFE] ml-3">
              CONTACT US
            </h4>
            <div className="bg-[#FFFEFE] rounded-full w-10 h-10 aspect-square flex items-center justify-center overflow-hidden">
              <div className="flex flex-col gap-4 translate-y-[-31%] group-hover:translate-y-[33%] transition-all ease-in-out duration-[0.3s]">
                <span className="">
                  <RiMailLine size={20} color="#000" />
                </span>
                <span>
                  <RiMailLine size={20} color="#000" />
                </span>
              </div>
            </div>
          </Link>

          {/* Cursor element */}
          {isCursorVisible && (
            <motion.div
              id="cursor"
              className="flex justify-center items-center w-28 h-28 rounded-full bg-white/20 border border-white text-white font-bold absolute pointer-events-none"
              style={{ x: smoothX, y: smoothY }} // Use spring values for smooth movement
              animate={{
                scale: isHovering ? 1 : 0,
                opacity: isHovering ? 1 : 0,
              }} // Scale based on hover state
              initial={{ scale: 0 }} // Start scaled down
              exit={{ scale: 0, opacity: 0 }} // Scale down and fade out on exit
              transition={{ duration: 0.3 }} // Transition duration
            >
              <span className='text-["SourceSans"] text-center text-[1.5rem] font-[900] leading-[1.25rem]'>
                SHOP
                <br />
                NOW
              </span>
            </motion.div>
          )}
        </div>
      </div>
      <div className="my-5">
        <h2 className="text-5xl">Sale</h2>
        <Carousel data={saleProducts} />
      </div>

      <div id="mission-div" className="flex w-full gap-2">
        <div
          id="left-panel"
          className="w-[30%] h-[88vh] bg-blue-400 rounded-[30px] relative"
        >
          {/* <div
            className="w-48 h-10 bg-red-200 absolute -translate-x-1/2 -translate-y-1/2 bottom-0 left-[50%]"
            style={{
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              borderBottomLeftRadius: "-20px",
            }}
          ></div> */}
        </div>
        <div
          id="right-panel"
          className="w-[69%] bg-[#6C8451] rounded-[30px] p-10"
        >
          <h1 className="text-[5vw] text-[#101115] uppercase tracking-tighter leading-[4.5vw] font-['Oddval']">
            We're changing
            <br />
            the way things
            <br />
            get made.
          </h1>
          <div className="w-full mt-44 flex items-center justify-between border-[.75px] border-[#000] rounded-[30px] px-12 py-6">
            <div className="w-[40%]">
              <div className="flex items-center">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#101115]">
                  <RiStore2Line size={18} color="white" />
                </span>
                <h2 className="font-['Oddval'] text-3xl ml-4 tracking-tighter">
                  Indie-fied
                </h2>
              </div>
              <p className="text-[#101115] text-[1.2vw] font-['SourceSans'] mt-5">
                We're flipping retail on its head! Now, indie stores can reach
                the masses, and customers can finally snag those one-of-a-kind,
                niche outfits without having to dig through every thrift shop in
                town.
              </p>
            </div>
            <div className="w-[40%]">
              <div className="flex items-center">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#101115]">
                  <RiStore2Line size={18} color="white" />
                </span>
                <h2 className="font-['Oddval'] text-3xl ml-4 tracking-tighter">
                  Indie-fied
                </h2>
              </div>
              <p className="text-[#101115] text-[1.2vw] font-['SourceSans'] mt-5">
                We're flipping retail on its head! Now, indie stores can reach
                the masses, and customers can finally snag those one-of-a-kind,
                niche outfits without having to dig through every thrift shop in
                town.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
