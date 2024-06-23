import { getDictionary } from "@/app/[lang]/_dictionaries/dictionaries";
import Modal from "@/app/_components/Modal";
import Image from "next/image";
import { notFound } from "next/navigation";
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
    <Modal>
      <section className="bg-slate-800 p-6 rounded ">
        <div className="grid grid-cols-12  gap-8">
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
        </div>
      </section>
    </Modal>
  );
};

export default Movie;
