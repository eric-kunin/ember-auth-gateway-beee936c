import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DatingProfileCard from "./DatingProfileCard";
import { users } from '../data/users';

export const DatingProfilesGrid = () => {
  const [shuffledUsers, setShuffledUsers] = useState(users);

  useEffect(() => {
    const shuffled = [...users].sort(() => Math.random() - 0.5);
    setShuffledUsers(shuffled);
  }, []);

  return (
    <div className="w-full p-8" dir="rtl">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-[1100px] mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {shuffledUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.1 }
              }}
              className="w-full"
            >
              <div className="w-full max-w-[300px] mx-auto">
                <DatingProfileCard
                  nickname={user.nickname}
                  age={user.age}
                  rating={user.rating}
                  location={user.location}
                  imageUrl={user.imageUrl}
                  verified={user.verified}
                  photoCount={user.photoCount}
                  interests={user.interests}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DatingProfilesGrid;