import { useQuery } from "@tanstack/react-query";

import { useProductFilters } from "./hooks/useFiltersTabsData";
import { ProductList } from "./components/ProductsList";
import { useState } from "react";
import { ProductModal } from "./components/ProductModal";
import { Header } from "./components/Header";
import { getProducts } from "@/api/products";

export default function Home() {
  const [selectedProductId, setSelectProductId] = useState<number | null>(null);
  const { filters, selectedCategoryValue, selectedLocationValue } =
    useProductFilters();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "products",
      selectedCategoryValue,
      selectedLocationValue,
      filters,
    ],
    queryFn: async () => {
      return await getProducts({
        category: selectedCategoryValue,
        location: selectedLocationValue,
        name: filters.inputFields.name.value,
        minPrice: filters.inputFields.minPrice.value,
        maxPrice: filters.inputFields.maxPrice.value,
      });
    },
    initialData: null,
  });

  return (
    <>
      <Header filters={filters} />
      <ProductList
        onDetailsClick={setSelectProductId}
        products={products}
        isLoading={isLoading}
        errorMessage={error?.message}
      />
      <ProductModal
        productId={selectedProductId}
        onCloseModal={() => setSelectProductId(null)}
      />
    </>
  );
}
