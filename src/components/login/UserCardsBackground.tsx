
import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { users } from "@/data/sampleUsers";

const UserCardsBackground: React.FC = () => {
  const [randomUsers, setRandomUsers] = useState(users);

  useEffect(() => {
    const shuffled = [...users].sort(() => 0.5 - Math.random());
    setRandomUsers(shuffled.slice(0, 21)); // Take 21 users for 3x7 grid
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none px-4 py-8">
      <div className="absolute inset-0 bg-[#1E0B36]/80 backdrop-blur-sm"></div>
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-6 md:gap-8 max-w-[2400px] mx-auto">
        {randomUsers.map((user, index) => (
          <UserCard
            key={`${user.id}-${index}`}
            nickname={user.nickname}
            age={user.age}
            location={user.location}
            imageUrl={user.imageUrl}
            verified={user.verified}
            className="opacity-90 hover:opacity-100 transition-opacity transform hover:scale-105"
          />
        ))}
      </div>
    </div>
  );
};

export default UserCardsBackground;
