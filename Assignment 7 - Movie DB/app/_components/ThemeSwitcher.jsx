"use client";
import changeTheme from "@/utils/changeTheme";
import Image from "next/image";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  useEffect(() => {
    changeTheme(!theme);
  }, [theme]);
  return (
    <button
      className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
      onClick={() => {
        changeTheme(theme), setTheme(!theme);
      }}
    >
      <Image
        className=""
        src={`/assets/icons/${theme ? "sun" : "moon"}.svg`}
        width="24"
        height="24"
        alt=""
      />
    </button>
  );
};

export default ThemeSwitcher;
