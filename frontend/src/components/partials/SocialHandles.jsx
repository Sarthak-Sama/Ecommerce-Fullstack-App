import React from "react";
import { motion } from "framer-motion";

const SocialHandles = () => {
  // Define animation variants for hover effects
  const hoverVariant = {
    hover: {
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    rest: {
      opacity: 0.3,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const linkStyle = "text-white font-thin text-[1.4vw] pb-[1vw] relative";

  return (
    <div id="handles" className="text-sm space-y-2 flex flex-col">
      {["LinkedIn", "Instagram", "YouTube", "Awwwards", "Behance"].map(
        (name, index) => (
          <motion.a
            key={index}
            href="#"
            className={linkStyle}
            variants={hoverVariant}
            initial="rest"
            whileHover="hover"
            animate="rest"
            style={{
              display: "inline-block",
              position: "relative",
            }}
          >
            {name}
            <span
              className="absolute bottom-[10px] left-0 w-0 h-[1px] bg-white transition-all duration-300 ease-out"
              style={{
                content: '""',
                transition: "width 0.3s ease-out",
              }}
            />
          </motion.a>
        )
      )}
    </div>
  );
};

export default SocialHandles;
