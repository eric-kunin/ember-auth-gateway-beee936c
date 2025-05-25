
import React, { useEffect, useState } from "react";
import UserCard from "@/components/login/UserCard";
import { users } from "@/data/sampleUsers";
import { useIsMobile } from "@/hooks/use-mobile";

const UserCardsBackground: React.FC = () => {
  const [shuffledUsers, setShuffledUsers] = useState(users);
  const isMobile = useIsMobile();

  useEffect(() => {
    const shuffled = [...users].sort(() => 0.5 - Math.random());
    // Show fewer cards on mobile to improve performance and avoid overcrowding
    const cardCount = isMobile ? 12 : 24;
    setShuffledUsers(shuffled.slice(0, cardCount));
  }, [isMobile]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" dir="rtl">
      <div className={`
        grid gap-x-2 gap-y-1 p-2 w-full h-full
        ${isMobile 
          ? 'grid-cols-2 sm:grid-cols-3' 
          : 'grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8'
        }
      `}>
        {shuffledUsers.map((user) => (
          <div key={user.id} className={`
            ${isMobile ? 'min-w-[80px] h-[200px]' : 'min-w-[90px] h-[265px]'}
          `}>
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
