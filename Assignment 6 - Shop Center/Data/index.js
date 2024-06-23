import { categories, products } from "./database";

export function getProducts(
  { category, count } = { category: null, count: null }
) {
  const sliceCount = count && count > 0 ? count : products.length;

  if (category && categories.includes(category)) {
    return products
      .filter((product) => product.category === category)
      .slice(0, sliceCount);
  }

  return products.slice(0, sliceCount);
}

export function getProduct({ id }) {
  const product = products.find((product) => {
    return product.id.toString() === id.toString();
  });
  return product;
}
