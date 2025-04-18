
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
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none p-8">
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-4 md:gap-6 max-w-[2100px] mx-auto">
        {randomUsers.map((user, index) => (
          <UserCard
            key={`${user.id}-${index}`}
            nickname={user.nickname}
            age={user.age}
            location={user.location}
            imageUrl={user.imageUrl}
            verified={user.verified}
            className="opacity-70 hover:opacity-90 transition-opacity"
          />
        ))}
      </div>
    </div>
  );
};

export default UserCardsBackground;
