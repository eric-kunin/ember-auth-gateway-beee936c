
import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { users } from "@/data/sampleUsers";

const UserCardsBackground: React.FC = () => {
  const [randomUsers, setRandomUsers] = useState(users);

  useEffect(() => {
    // Shuffle the users array
    const shuffled = [...users].sort(() => 0.5 - Math.random());
    setRandomUsers(shuffled.slice(0, 8)); // Take 8 random users
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* First row - positioned on top */}
      <div className="absolute -top-10 flex gap-6 transform -rotate-3 -translate-x-16">
        {randomUsers.slice(0, 3).map((user) => (
          <UserCard
            key={`top-${user.id}`}
            nickname={user.nickname}
            location={user.location}
            imageUrl={user.imageUrl}
            className="opacity-70 hover:opacity-90 transition-opacity"
          />
        ))}
      </div>

      {/* Second row - positioned on right */}
      <div className="absolute top-1/4 -right-10 flex flex-col gap-5 transform rotate-6">
        {randomUsers.slice(3, 5).map((user) => (
          <UserCard
            key={`right-${user.id}`}
            nickname={user.nickname}
            location={user.location}
            imageUrl={user.imageUrl}
            className="opacity-60 hover:opacity-85 transition-opacity"
          />
        ))}
      </div>

      {/* Third row - positioned on bottom */}
      <div className="absolute -bottom-16 right-32 flex gap-6 transform rotate-2">
        {randomUsers.slice(5, 8).map((user) => (
          <UserCard
            key={`bottom-${user.id}`}
            nickname={user.nickname}
            location={user.location}
            imageUrl={user.imageUrl}
            className="opacity-65 hover:opacity-90 transition-opacity"
          />
        ))}
      </div>

      {/* Fourth row - positioned on left */}
      <div className="absolute top-1/3 -left-10 flex flex-col gap-5 transform -rotate-6">
        {randomUsers.slice(0, 2).map((user) => (
          <UserCard
            key={`left-${user.id}`}
            nickname={user.nickname}
            location={user.location}
            imageUrl={user.imageUrl}
            className="opacity-60 hover:opacity-85 transition-opacity"
          />
        ))}
      </div>
    </div>
  );
};

export default UserCardsBackground;
