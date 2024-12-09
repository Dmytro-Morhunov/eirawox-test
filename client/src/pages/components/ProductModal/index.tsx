import { useQuery } from "@tanstack/react-query";

import { getProductById } from "@/api/products";
import { Content } from "./Content";

interface Props {
  productId: number | null;
  onCloseModal: () => void;
}

export function ProductModal({ productId, onCloseModal }: Props) {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["productById", productId],
    queryFn: async () => {
      if (productId) {
        return await getProductById(productId);
      }
      return null;
    },
    initialData: null,
  });

  if (typeof productId !== "number") return null;

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex h-full items-center justify-center p-4 text-center">
          <div className="h-full w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all lg:w-1/2">
            <div className="text-right bg-gray-50 px-4 py-3">
              <button
                onClick={onCloseModal}
                type="button"
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Закрити
              </button>
            </div>

            <Content product={product} isLoading={isLoading} error={error} />
          </div>
        </div>
      </div>
    </div>
  );
}
