import Link from "next/link";
import React from "react";

const Logo = ({className}:{className?:string}) => {
  return (
    <Link href="/">
      <div className={`text-lg md:text-2xl text-wrap font-bold text-main-color ${className}`}>
        Parking Reservation System
      </div>
    </Link>
  );
};

export default Logo;
