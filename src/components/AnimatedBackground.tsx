import React from 'react';
import { motion } from 'framer-motion';
import { PawPrint, Star, Heart, HeartPulse, CircleDollarSign } from 'lucide-react';

const generateIcons = (count) => {
  const icons = [];
  for (let i = 0; i < count; i++) {
    icons.push({
      id: i,
      Icon: [HeartPulse, Star, Heart, PawPrint, CircleDollarSign][Math.floor(Math.random() * 5)],
      delay: Math.random() * 5, 
      duration: Math.random() * 8 + 4,
      left: Math.random() * 100, 
      top: Math.random() * 100, 
      size: Math.random() * 40 + 40, 
      rotateSpeed: Math.random() * 50 + 20, 
      rotateDirection: Math.random() > 0.5 ? 1 : -1 
    });
  }
  return icons;
};

const icons = generateIcons(200);

const AnimatedBackground = () => {
  return (
    <div className="animated-bg absolute inset-0 -z-10">
      {icons.map(({ id, Icon, delay, duration, left, top, size, rotateSpeed, rotateDirection }) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.9, 1, 0.9],
            rotate: [0, rotateSpeed * rotateDirection, 0]
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay
          }}
          className="absolute text-white"
          style={{
            left: `${left}vw`,
            top: `${top}vh`,
            fontSize: `${size}px`
          }}
        >
          <Icon />
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
