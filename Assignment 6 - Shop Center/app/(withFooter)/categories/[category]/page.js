import ProductList from "@/components/ProductList";
import { categories } from "@/Data/database";
import React from "react";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c }));
}

export function generateMetadata({ params: { category } }) {
  return {
    title: `${category} | Shop Center`,
    description: `page with all ${category} product`,
  };
}

function page({ params: { category } }) {
  return <ProductList category={category} />;
}

export default page;
