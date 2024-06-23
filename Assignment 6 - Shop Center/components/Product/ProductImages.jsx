"use client";
import Image from "next/image";
import { useState } from "react";

import { AnimatePresence, motion as m } from "framer-motion";

function ProductImages({ images }) {
  const [coverImageIndex, setCoverImageIndex] = useState(0);

  function handleSecondaryImageClick(index) {
    if (coverImageIndex !== index) setCoverImageIndex(index);
  }

  return (
    <div className="w-full p-4 border lg:w-7/12 border-slate-500/20">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={coverImageIndex}
            initial={{ y: 150, x: 0, opacity: 0 }}
            animate={{ y: 0, x: 0, opacity: 1 }}
            exit={{ y: -150, x: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "anticipate" }}
          >
            <Image
              src={images[coverImageIndex]}
              width={1000}
              height={1000}
              className="w-[400px] h-[500px] mx-auto object-cover"
              alt=""
            />
          </m.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4 mt-4">
        {images.map((img, i) => (
          <div
            key={i}
            role="button"
            className={`border-4 border-spacing-2 ${
              i === coverImageIndex ? "border-gray-400" : "border-transparent"
            }`}
            onClick={() => handleSecondaryImageClick(i)}
          >
            <Image
              width={200}
              height={200}
              src={img}
              className="w-[100px] h-[100px] mx-auto border object-cover"
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
