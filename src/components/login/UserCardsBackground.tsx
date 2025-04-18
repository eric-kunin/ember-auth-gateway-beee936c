
import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { users } from "@/data/sampleUsers";

const UserCardsBackground: React.FC = () => {
  const [randomUsers, setRandomUsers] = useState(users);

  useEffect(() => {
    // Shuffle the users array
    const shuffled = [...users].sort(() => 0.5 - Math.random());
    setRandomUsers(shuffled.slice(0, 21)); // Take 21 users for 3x7 grid
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-[#10002B]/50 via-[#240046]/50 to-[#3C096C]/50 backdrop-blur-sm"></div>
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2 sm:gap-3 md:gap-4 p-4 sm:p-6 md:p-8 max-w-[2100px] mx-auto">
        {randomUsers.map((user, index) => (
          <UserCard
            key={`${user.id}-${index}`}
            nickname={user.nickname}
            age={user.age}
            location={user.location}
            imageUrl={user.imageUrl}
            verified={user.verified}
            className="opacity-80 hover:opacity-100 transition-opacity"
          />
        ))}
      </div>
    </div>
  );
};

export default UserCardsBackground;
