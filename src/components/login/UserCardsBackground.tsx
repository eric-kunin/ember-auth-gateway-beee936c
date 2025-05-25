
import React, { useEffect, useState } from "react";
// import UserCard from "./UserCard";
// import { users } from "@/data/sampleUsers";

const UserCardsBackground: React.FC = () => {
  return (
  <div className="absolute inset-0 z-10 pointer-events-none">
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-4 w-full h-full">
      {Array.from({ length: 24 }).map((_, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-sm rounded-xl h-80 min-w-[100px] shadow-md border border-white/20"
        />
      ))}
      </div>
    </div>
  );
};

export default UserCardsBackground;
