import React from "react";

import { Spinner } from "../common/Spinner";
import { ProductImage } from "../common/Image";

import { Product } from "@/api/products";
import { ErrorMessage } from "../common/ErrorMessage";
import { NoContent } from "../common/NoContent";
import { baseUrl } from "@/api/config";

interface Props {
  isLoading: boolean;
  error: Error | null;
  product: Product | null;
}

export function Content({ isLoading, error, product }: Props) {
  if (isLoading) return <Spinner />;

  if (error) return <ErrorMessage />;

  if (product === null) return <NoContent />;

  return (
    <div className="p-4">
      <ProductImage src={`${baseUrl}/images/${product.image}`} />
      <div>
        <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
          {product.name}
        </h3>
        <p className="text-s font-semibold text-gray-600">
          <span className="text-gray-900">Категорія:</span> {product.category}
        </p>
        <p className="text-s font-semibold text-gray-600">
          <span className="text-gray-900">Локація:</span> {product.location}
        </p>
        <p className="text-s font-semibold text-gray-600">
          <span className="text-gray-900">Ціна:</span> {product.price}
        </p>
        <p className="text-s font-semibold text-gray-600">
          <span className="text-gray-900">Опис:</span> {product.description}
        </p>
      </div>
    </div>
  );
}
