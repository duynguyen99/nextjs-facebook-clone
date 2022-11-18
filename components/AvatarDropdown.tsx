import React, { useState } from "react";
import Image from "next/image";
import { AvatarDropdownProps } from "../types/Props";
import Dropdown from "./Dropdown";

const AvatarDropdown = ({ dropdownData, avatar }: AvatarDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="relative">
      <Image
        src={
          "https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-1/138317164_1579505722244254_2206959289389356615_n.jpg?stp=dst-jpg_p160x160&_nc_cat=102&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=xDD6M5wYHdAAX_UWGgp&_nc_ht=scontent.fhan2-1.fna&oh=00_AfABEsat-q98f66evyS7FGGSv_4k0QO7iylocBLGQC2HvA&oe=63995A22"
        }
        width={500}
        height={500}
        alt="avatar"
        className="rounded-full w-10 h-10 cursor-pointer mb-2"
        onClick={() => setShowDropdown(!showDropdown)}
      />
      {showDropdown && <Dropdown data={dropdownData} setIsShowDropdown={setShowDropdown}/>}
    </div>
  );
};

export default AvatarDropdown;
