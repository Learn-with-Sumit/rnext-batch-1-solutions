import Image from "next/image";

import starIcon from "@/assets/svg/star.svg";
import ProductImages from "@/components/Product/ProductImages";
import { getProduct, getProducts } from "@/Data";
import { minusPercentage } from "@/utils/minusPercentage";

export function generateStaticParams() {
  return getProducts().map((product) => ({
    id: product.id.toString(),
  }));
}

export function generateMetadata({ params: { id } }) {
  const product = getProduct({ id });
  return {
    title: `${product.title} | Shop Center`,
    description: product.description,
  };
}

function page({ params: { id } }) {
  const product = getProduct({ id });

  if (!product) return <main>Product not found</main>;

  const discountPrice = minusPercentage(
    product.price,
    product.discountPercentage
  ).toFixed(2);

  return (
    <main className="h-screen">
      <section className="bg-[#fafaf2] h-full py-20">
        <div className="flex flex-col items-center justify-between w-11/12 gap-12 mx-auto lg:w-8/12 max-w-7xl lg:flex-row">
          {<ProductImages images={product.images} />}
          <div className="w-full lg:w-5/12">
            <h1 className="font-serif text-xl italic font-semibold lg:text-3xl">
              {product.title}
            </h1>
            <span className="text-[#919090] my-3">Smartphone</span>
            <div className="flex items-center justify-start gap-1 mt-3">
              {Array(Math.round(product.rating))
                .fill(0)
                .map((_, i) => (
                  <Image key={i} src={starIcon} width={20} height={20} alt="" />
                ))}
            </div>
            <hr className="my-5 bg-black" />

            <div>
              <p className="my-3">
                <span className="line-through text-rose-600 opacity-60">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-2xl font-bold">${discountPrice}</span>
              </p>
            </div>
            <div>
              <p className="leading-7">{product.description}</p>

              <button className="w-full bg-[#1a1a1a] hover:bg-[#3a3a3a] text-center py-3 mt-5 text-white rounded-full">
                Add To Cart - ${discountPrice}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;
