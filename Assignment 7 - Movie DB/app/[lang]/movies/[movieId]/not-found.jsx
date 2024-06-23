"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathName = usePathname();
  const movieId = pathName.split("/").pop();
  return (
    <div>
      <h2 className="text-2xl mb-4">
        {" "}
        This movie with {movieId} id was not found!
      </h2>
      <Link href="/" className="px-5 py-3.5 rounded-lg bg-primary text-black">
        Return Home
      </Link>
    </div>
  );
}
