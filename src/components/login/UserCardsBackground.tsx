import React, { useEffect, useState } from "react";
import UserCard from "@/components/login/UserCard";
import { users } from "@/data/sampleUsers";

const UserCardsBackground: React.FC = () => {
  const [shuffledUsers, setShuffledUsers] = useState(users);

  useEffect(() => {
    const shuffled = [...users].sort(() => 0.5 - Math.random());
    setShuffledUsers(shuffled.slice(0, 24)); // Limit to 48 cards
  }, []);

  return (
    <div className="absolute  z-10 pointer-events-none overflow-hidden" dir="rtl">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-1 p-4 w-full h-full">

        {shuffledUsers.map((user) => (
          <div key={user.id} className="min-w-[90px] h-[265px]">
            <UserCard
              nickname={user.nickname}
              age={user.age}
              location={user.area}
              imageUrl={user.imageUrl}
              rating={0}
              photoCount={0}
              verified={user.verified}
              interests={[]}
              simplified
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCardsBackground;
