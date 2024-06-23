import heroBg from "@/assets/header.webp";
import NavLink from "@/components/NavLink";
import { categories } from "@/Data/database";

function layout({ children }) {
  return (
    <>
      <header
        className="h-[500px] bg-center flex flex-col-reverse bg-cover w-full"
        style={{ backgroundImage: `url(${heroBg.src})` }}
      ></header>
      <main>
        {" "}
        <section className="items-start justify-between w-11/12 py-0 mx-auto lg:w-10/12 max-w-7xl lg:py-10 lg:flex">
          <div className="flex items-center justify-between w-full my-10 lg:block lg:w-2/12 lg:my-0 lg:mt-4">
            <NavLink
              href="/categories"
              className="box-border block h-6 mt-4 capitalize border-black hover:border-b w-min"
            >
              All
            </NavLink>{" "}
            {categories.map((category, i) => (
              <NavLink
                href={`/categories/${category}`}
                className="box-border block h-6 mt-4 capitalize border-black hover:border-b w-min whitespace-nowrap"
                key={i}
              >
                {category}
              </NavLink>
            ))}
          </div>
          <div className="sticky top-0 right-0 grid w-full grid-cols-2 gap-4 my-4 lg:w-10/12 lg:grid-cols-3 lg:my-10">
            {children}
          </div>
        </section>
      </main>
    </>
  );
}

export default layout;
