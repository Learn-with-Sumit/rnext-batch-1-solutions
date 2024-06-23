import { getDictionary } from "@/app/[lang]/_dictionaries/dictionaries";
import Image from "next/image";
import Link from "next/link";
const genresLists = () =>
  import("@/data/genres.json").then((res) => res.default);
const MovieCard = async ({ movie, lang }) => {
  const { id, title, poster_path, genre_ids } = movie || {};
  const dictionary = await getDictionary(lang);
  const genres = await genresLists();
  return (
    <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
      <Image
        width={355}
        height={428}
        className="w-full object-cover "
        src={poster_path}
        alt={title}
      />
      <figcaption className="pt-4">
        <h3 className="text-xl mb-1">{title}</h3>
        <p className="text-[#575A6E] text-sm mb-2">
          {genre_ids?.map((id) => genres[id]).join("/")}
        </p>
        <div className="flex items-center space-x-1 mb-5">
          <Image src="/assets/star.svg" width="14" height="14" alt="" />
          <Image src="/assets/star.svg" width="14" height="14" alt="" />
          <Image src="/assets/star.svg" width="14" height="14" alt="" />
          <Image src="/assets/star.svg" width="14" height="14" alt="" />
          <Image src="/assets/star.svg" width="14" height="14" alt="" />
        </div>
        <Link
          className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
          href={`/${lang}/movies/${id}`}
          scroll={false}
        >
          <Image src="/assets/tag.svg" width={20} height={20} alt="" />
          <span>{dictionary["details"]}</span>
        </Link>
      </figcaption>
    </figure>
  );
};

export default MovieCard;
