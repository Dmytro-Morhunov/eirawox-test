import { useState } from "react";

import { Filters } from "@/pages/hooks/useFiltersTabsData";
import { Input } from "./Input";

interface Props {
  filters: Filters;
}

export function Header({ filters }: Props) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <header className="bg-white shadow">
      <div className="flex flex-row justify-center">
        {filters.tabFilters.map((tab, index) => {
          const isSelected = selectedTabIndex === index;
          return (
            <h2
              className={
                isSelected
                  ? "text-2xl mx-4 mt-4 cursor-pointer text-gray-900 font-bold"
                  : "text-2xl mx-4 mt-4 cursor-pointer text-gray-600 hover:text-gray-900"
              }
              key={tab.title}
              onClick={() => setSelectedTabIndex(index)}
            >
              {tab.title}
            </h2>
          );
        })}
      </div>

      <div className="flex flex-row mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {Object.keys(filters.tabFilters[selectedTabIndex].data).map(
          (tabDataKey) => {
            const isSelected = Object.keys(
              filters.tabFilters[selectedTabIndex].selected
            ).includes(tabDataKey);
            return (
              <h3
                onClick={() =>
                  filters.tabFilters[selectedTabIndex].handler({
                    [tabDataKey]:
                      filters.tabFilters[selectedTabIndex].data[tabDataKey],
                  })
                }
                key={tabDataKey}
                className={
                  isSelected
                    ? "m-4 cursor-pointer text-gray-900 border-b-2 border-transparent font-bold"
                    : "m-4 cursor-pointer text-gray-600 border-b-2 hover:border-gray-900 hover:text-gray-900 border-transparent"
                }
              >
                {filters.tabFilters[selectedTabIndex].data[tabDataKey] || ""}
              </h3>
            );
          }
        )}
      </div>

      <div className="flex flex-col mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Input field={filters.inputFields.name} />
        </div>

        <div className="flex flex-row">
          <div>
            <Input
              field={filters.inputFields.minPrice}
              min={0}
              max={+filters.inputFields.maxPrice.value || undefined}
            />
          </div>

          <div className="ml-4">
            <Input
              field={filters.inputFields.maxPrice}
              min={+filters.inputFields.minPrice.value || undefined}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
