import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary } from "../../_dictionaries/dictionaries";
const movies = () =>
  import("@/data/data.json")
    .then((res) => res.default)
    .catch((err) => console.log(err));

const Movie = async ({ params: { movieId, lang } }) => {
  const movie = await movies();
  const {
    id,
    title,
    overview,
    poster_path,
    backdrop_path,
    vote_average,
    release_date,
    vote_count,
    popularity,
  } = movie.results.find((movie) => movie.id == parseInt(movieId)) || {};
  const dictionary = await getDictionary(lang);
  if (!id) {
    return notFound();
  }
  return (
    <section>
      <div>
        <Image
          width={700}
          height={300}
          className="w-full object-cover max-h-[300px] lg:max-h-[500px]"
          src={backdrop_path}
          alt=""
        />
      </div>

      <div className="grid grid-cols-12 py-12 gap-8">
        <div className="col-span-2">
          <Image width={200} height={200} src={poster_path} alt="" />
        </div>
        <div className="col-span-8">
          <h2 className="font-bold text-slate-300 text-2xl">{title}</h2>
          <p className="my-2 text-slate-400 italic">{overview}</p>
          <ul className="text-slate-300 space-y-2 my-8">
              <li>
                {dictionary["release date"]} :
                {new Date(release_date).toLocaleString("en-US", {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                })}
              </li>
              <li>
                {dictionary["average vote"]} : {vote_average}
              </li>
              <li>
                {dictionary["vote count"]} : {vote_count}
              </li>
              <li>
                {dictionary["popularity"]} : {popularity}
              </li>
            </ul>
        </div>
        <div className="col-span-2 space-y-4">
          <button className="py-2 w-full bg-primary font-medium text-slate-800 rounded-md">
            {dictionary["stream in hd"]}
          </button>
          <button className="py-2 w-full bg-primary font-medium text-slate-800 rounded-md">
            {dictionary["download in hd"]}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Movie;
