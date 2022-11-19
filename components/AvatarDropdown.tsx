import React, { useState } from "react";
import Image from "next/image";
import { AvatarDropdownProps } from "../types/Props";
import Dropdown from "./Dropdown";

const AvatarDropdown = ({ dropdownData, avatar }: AvatarDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="relative">
      <Image
        src={avatar}
        width={500}
        height={500}
        alt="avatar"
        className="rounded-full w-10 h-10 cursor-pointer mb-2 border"
        onClick={() => setShowDropdown(!showDropdown)}
      />
      {showDropdown && <Dropdown data={dropdownData} setIsShowDropdown={setShowDropdown}/>}
    </div>
  );
};

export default AvatarDropdown;
