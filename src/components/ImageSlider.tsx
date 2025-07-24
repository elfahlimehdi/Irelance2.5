import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/image1.png",
  "/image2.png",
  "/image3.png",
  "/image4.png"
];

const ImageSlider: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: "relative", width: "140%", height: "600px" }}>
      <AnimatePresence>
        <motion.img
          key={index}
          src={images[index]}
          alt={`slide-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "20px",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </AnimatePresence>
    </div>
  );
};

export default ImageSlider; 