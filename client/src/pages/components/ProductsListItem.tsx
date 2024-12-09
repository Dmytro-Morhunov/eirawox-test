import { Product } from "@/api/products";
import { baseUrl } from "@/api/config";

import { ProductImage } from "./common/Image";

interface Props {
  product: Product;
  onDetailsClick: (id: number) => void;
}

export function ProductsListItem({ product, onDetailsClick }: Props) {
  return (
    <li className="group flex flex-col cursor-pointer max-w-sm rounded overflow-hidden shadow-lg p-12 mx-auto">
      <ProductImage src={`${baseUrl}/images/${product.image}`} />
      <div>
        <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
          {product.name}
        </h3>
        <span className="block text-s font-semibold text-gray-900">
          Ціна: {product.price}
        </span>
        <span className="block text-s font-semibold text-gray-900">
          Категорія: {product.category}
        </span>
      </div>
      <button
        onClick={() => onDetailsClick(product.id)}
        type="button"
        className="mt-auto flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Деталі
      </button>
    </li>
  );
}
