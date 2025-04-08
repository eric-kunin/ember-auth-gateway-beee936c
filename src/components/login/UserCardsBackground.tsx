
import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { users } from "@/data/sampleUsers";

const UserCardsBackground: React.FC = () => {
  const [randomUsers, setRandomUsers] = useState(users);

  useEffect(() => {
    // Shuffle the users array
    const shuffled = [...users].sort(() => 0.5 - Math.random());
    setRandomUsers(shuffled.slice(0, 12)); // Take 12 random users
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* First row - positioned on top */}
      <div className="absolute -top-10 left-0 flex gap-4 transform -rotate-3">
        {randomUsers.slice(0, 3).map((user) => (
          <UserCard
            key={`top-${user.id}`}
            nickname={user.nickname}
            age={user.age}
            location={user.location}
            imageUrl={user.imageUrl}
            rating={user.rating}
            verified={user.verified}
            photoCount={user.photoCount}
            interests={user.interests}
            className="w-40 opacity-70 hover:opacity-90 transition-opacity"
          />
        ))}
      </div>

      {/* Second row - positioned on top right */}
      <div className="absolute top-20 -right-10 flex gap-6 transform rotate-6">
        {randomUsers.slice(3, 5).map((user) => (
          <UserCard
            key={`topright-${user.id}`}
            nickname={user.nickname}
            age={user.age}
            location={user.location}
            imageUrl={user.imageUrl}
            rating={user.rating}
            verified={user.verified}
            photoCount={user.photoCount}
            interests={user.interests}
            className="w-40 opacity-60 hover:opacity-85 transition-opacity"
          />
        ))}
      </div>

      {/* Third row - positioned on bottom left */}
      <div className="absolute -bottom-16 left-20 flex gap-6 transform -rotate-6">
        {randomUsers.slice(5, 8).map((user) => (
          <UserCard
            key={`bottomleft-${user.id}`}
            nickname={user.nickname}
            age={user.age}
            location={user.location}
            imageUrl={user.imageUrl}
            rating={user.rating}
            verified={user.verified}
            photoCount={user.photoCount}
            interests={user.interests}
            className="w-40 opacity-65 hover:opacity-90 transition-opacity"
          />
        ))}
      </div>

      {/* Fourth row - positioned on bottom right */}
      <div className="absolute -bottom-10 -right-10 flex flex-col gap-5 transform rotate-6">
        {randomUsers.slice(8, 10).map((user) => (
          <UserCard
            key={`bottomright-${user.id}`}
            nickname={user.nickname}
            age={user.age}
            location={user.location}
            imageUrl={user.imageUrl}
            rating={user.rating}
            verified={user.verified}
            photoCount={user.photoCount}
            interests={user.interests}
            className="w-40 opacity-60 hover:opacity-85 transition-opacity"
          />
        ))}
      </div>

      {/* Fifth row - positioned on left */}
      <div className="absolute top-1/3 -left-10 flex flex-col gap-5 transform -rotate-6">
        {randomUsers.slice(10, 12).map((user) => (
          <UserCard
            key={`left-${user.id}`}
            nickname={user.nickname}
            age={user.age}
            location={user.location}
            imageUrl={user.imageUrl}
            rating={user.rating}
            verified={user.verified}
            photoCount={user.photoCount}
            interests={user.interests}
            className="w-40 opacity-60 hover:opacity-85 transition-opacity"
          />
        ))}
      </div>
    </div>
  );
};

export default UserCardsBackground;
