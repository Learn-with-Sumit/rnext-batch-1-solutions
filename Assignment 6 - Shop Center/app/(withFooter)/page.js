import Image from "next/image";
import Hero from "@/components/Home/Hero";
import ProductList from "@/components/ProductList";

export const metadata = {
  title: "Shop Center | Home",
  description: "home for project shop center",
};

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <section className="w-11/12 lg:w-10/12 max-w-7xl mx-auto py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4 my-4 lg:my-10">
            <ProductList count={12} />
          </div>
        </section>
      </main>
    </>
  );
}
