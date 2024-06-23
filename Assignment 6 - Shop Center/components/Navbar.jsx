import Image from "next/image";
import Link from "next/link";

import cartIcon from "@/assets/svg/shopping-Cart.svg";
import menuIcon from "@/assets/svg/menu.svg";
import lwsLogo from "@/assets/lws-logo-black.svg";
import avatarIcon from "@/assets/svg/avatar.svg";

function Navbar() {
  return (
    <nav className="flex items-center justify-between w-11/12 py-5 mx-auto lg:w-10/12 max-w-7xl lg:py-6">
      <div className="flex gap-5 items-center justify-between lg:w-8/12 text-[#1A1A1A]">
        <div className="flex items-center gap-2">
          <Image
            height={100}
            width={100}
            src={menuIcon}
            className="w-5 h-5 lg:hidden"
            alt=""
          />
          <Link href="/">
            <Image
              height={lwsLogo.height}
              width={118}
              src={lwsLogo}
              className="h-10"
              alt=""
            />
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 lg:gap-5 lg:w-4/12">
        <Image
          height={100}
          width={100}
          src={avatarIcon}
          className="hidden lg:block w-[18px] h-[18px]"
          alt="login account avatar"
        />
        <Image
          height={100}
          width={100}
          src={cartIcon}
          className="block w-5 h-5"
          alt="shopping cart icon"
        />
      </div>
    </nav>
  );
}

export default Navbar;
