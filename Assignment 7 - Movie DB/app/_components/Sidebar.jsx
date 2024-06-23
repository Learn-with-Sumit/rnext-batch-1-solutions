import Image from "next/image";
import { getDictionary } from "../[lang]/_dictionaries/dictionaries";
import Link from "next/link";

const Sidebar = async ({ lang }) => {
  const dictionary = await getDictionary(lang);
  return (
    <aside>
      <ul className="space-y-2">
        <li>
          <Link
            className="flex items-center space-x-2 px-5 py-3.5 rounded-lg bg-primary text-black"
            href="#"
          >
            <Image
              src="/assets/icons/trending.svg"
              width="24"
              height="24"
              alt=""
            />
            <span>{dictionary["trending"]}</span>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center space-x-2 px-5 py-3.5 rounded-lg"
            href="#"
          >
            <Image
              src="/assets/icons/newRelease.svg"
              width="24"
              height="24"
              alt=""
            />
            <span>{dictionary["new releases"]}</span>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center space-x-2 px-5 py-3.5 rounded-lg"
            href="#"
          >
            <Image
              src="/assets/icons/commingSoon.svg"
              width="24"
              height="24"
              alt=""
            />
            <span>{dictionary["coming soon"]}</span>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center space-x-2 px-5 py-3.5 rounded-lg"
            href="#"
          >
            <Image
              src="/assets/icons/favourite.svg"
              width="24"
              height="24"
              alt=""
            />
            <span>{dictionary["favorites"]}</span>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center space-x-2 px-5 py-3.5 rounded-lg"
            href="#"
          >
            <Image
              src="/assets/icons/watchLater.svg"
              width="24"
              height="24"
              alt=""
            />
            <span>{dictionary["watch later"]}</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
