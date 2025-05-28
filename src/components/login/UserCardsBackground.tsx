import React, { useEffect, useState } from "react";
import UserCard from "@/components/login/UserCard";
import { users } from "@/data/sampleUsers";

const UserCardsBackground: React.FC = () => {
  const [shuffledUsers, setShuffledUsers] = useState(users);

  useEffect(() => {
    const shuffled = [...users].sort(() => 0.5 - Math.random());
    setShuffledUsers(shuffled.slice(0, 24)); // Limit for performance
  }, []);

  return (
    <div className="absolute inset-2 -z-5 pointer-events-none overflow-hidden" dir="rtl">
      <div
        className={`
          grid w-full h-full p-2
          gap-x-2 gap-y-2
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          [@media(min-width:1300px)]:grid-cols-5
          [@media(min-width:1600px)]:grid-cols-6
          [@media(min-width:1800px)]:grid-cols-8
        `}
      >
        {shuffledUsers.map((user) => (
          <div
  key={user.id}
  className="w-full h-full pointer-events-auto"
  style={{ aspectRatio: "2 / 2", padding: "5px" }}
>

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
              isOnline={Math.random() > 0.3}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCardsBackground;
