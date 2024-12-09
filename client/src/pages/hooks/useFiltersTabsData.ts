import { useState } from "react";

import { Categories, Locations, defaultValue } from "../../../../shared/types";

type TabFilter = {
  title: string;
  data: { [key: string]: string };
  handler: (value: { [key: string]: string }) => void;
  selected: { [key: string]: string };
};

export type InputField = {
  name: string;
  value: string;
  placeholder: string;
  label: string;
  type: string;
  onChange: (value: string) => void;
};

export interface Filters {
  tabFilters: TabFilter[];
  inputFields: { [key: string]: InputField };
}

export function useProductFilters() {
  const [filterByName, setFilterByName] = useState("");
  const [filterByMinPrice, setFilterByMinPrice] = useState("");
  const [filterByMaxPrice, setFilterByMaxPrice] = useState("");

  const [selectedCategory, setSelectedCategory] = useState<{
    [key: string]: string;
  }>(defaultValue);
  const [selectedLocation, setSelectedLocation] = useState<{
    [key: string]: string;
  }>(defaultValue);

  const tabFilters = [
    {
      title: "Category",
      data: Categories,
      handler: setSelectedCategory,
      selected: selectedCategory,
    },
    {
      title: "Location",
      data: Locations,
      handler: setSelectedLocation,
      selected: selectedLocation,
    },
  ];

  const inputFields = {
    name: {
      name: "name",
      value: filterByName,
      placeholder: "Введіть назву",
      type: "text",
      label: "Пошук за назвою",
      onChange: setFilterByName,
    },
    minPrice: {
      name: "minPrice",
      value: filterByMinPrice,
      placeholder: "-",
      type: "number",
      label: "Мінімільна ціна",
      onChange: setFilterByMinPrice,
    },
    maxPrice: {
      name: "minPrice",
      value: filterByMaxPrice,
      placeholder: "-",
      type: "number",
      label: "Максимальна ціна",
      onChange: setFilterByMaxPrice,
    },
  };

  const filters: Filters = {
    tabFilters,
    inputFields,
  };

  const selectedCategoryValue = Object.values(selectedCategory)[0];
  const selectedLocationValue = Object.values(selectedLocation)[0];

  return { filters, selectedCategoryValue, selectedLocationValue };
}
