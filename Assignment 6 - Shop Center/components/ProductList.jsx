import { getProducts } from "@/Data";
import ProductComp from "./ProductComp";

function ProductList({ category = null, count = null }) {
  const products = getProducts({ category, count });

  return products.map((product) => (
    <ProductComp key={product.id} product={product} />
  ));
}

export default ProductList;
