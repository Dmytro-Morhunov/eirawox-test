import React from "react";

import { ProductsListItem } from "./ProductsListItem";
import { Product } from "@/api/products";
import { Spinner } from "./common/Spinner";
import { ErrorMessage } from "./common/ErrorMessage";
import { NoContent } from "./common/NoContent";

interface Props {
  products: Product[] | null;
  isLoading: boolean;
  errorMessage?: string;

  onDetailsClick: (id: number) => void;
}

export function ProductList({
  products,
  isLoading,
  errorMessage,
  onDetailsClick,
}: Props) {
  const _renderList = () => {
    if (isLoading) return <Spinner />;

    if (errorMessage) return <ErrorMessage />;

    if (products === null || products.length === 0) return <NoContent />;

    return (
      <ul
        role="list"
        className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
      >
        {products.map((product) => (
          <ProductsListItem
            key={product.id}
            product={product}
            onDetailsClick={onDetailsClick}
          />
        ))}
      </ul>
    );
  };
  return (
    <main>
      <div className="mx-auto max-w-7xl px-12 py-8 sm:px-6 lg:px-8">
        {_renderList()}
      </div>
    </main>
  );
}
