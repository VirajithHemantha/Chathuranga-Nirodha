import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroVideoProps {
  onOpen: () => void;
}

export default function IntroVideo({ onOpen }: IntroVideoProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.section
          key="intro-video-section"
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.8, ease: 'easeInOut' },
          }}
          onClick={handleEnter}
          className="fixed inset-0 z-50 overflow-hidden bg-black flex items-center justify-center cursor-pointer"
        >
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <video
              src="/Video Project 15.mp4"
              autoPlay
              muted
              playsInline
              onEnded={handleEnter}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
