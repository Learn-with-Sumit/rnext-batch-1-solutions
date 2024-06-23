import MovieCard from "@/app/_components/home/MovieCard";
const movies = () => import("@/data/data.json").then((res) => res.default);
export default async function Home({ params: { lang } }) {
  const data = await movies();

  return (
    <main>
      <div className="content">
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-7">
          {data?.results?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} lang={lang} />
          ))}
        </div>
      </div>
    </main>
  );
}
