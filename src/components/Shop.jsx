import Item from "../UI/shop/Item";
import Pagination from "../UI/Pagination";
import { useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../utils/http";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  // Get current page from URL
  const page = Math.max(parseInt(searchParams.get('page')) || 1, 1);

  const { data, isPending, isError } = useQuery({
    queryFn: () => fetchProducts({ page }),
    queryKey: ['products', page],
    placeholderData: keepPreviousData
  });

  const handlePageChange = (newPage) => {
    if (newPage > 0) {
      setSearchParams({ page: newPage });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Extract products and pagination from response
  const products = data?.products || [];
  const pagination = data?.pagination || {};

  return (
    <div className="w-full flex flex-col gap-6 px-4 pb-20 pt-4 md:px-6 lg:px-8">
      {/* Loading State */}
      {isPending && !data && (
        <div className="flex justify-center items-center w-full py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="ml-4 text-lg text-gray-600">Fetching products...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="flex justify-center items-center w-full py-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            Error fetching products. Please try again.
          </div>
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 && (
        <div className="flex flex-wrap gap-4 w-full pb-8">
          {products.map(product => (
            <Item key={product._id} data={product} />
          ))}
        </div>
      )}

      {/* Pagination Component */}
      {products.length > 0 && (
        <Pagination
          currentPage={pagination.page || page}
          totalPages={pagination.totalPages || 1}
          hasNextPage={pagination.hasNextPage || false}
          hasPrevPage={pagination.hasPrevPage || false}
          onPageChange={handlePageChange}
        />
      )}

      {/* Empty State */}
      {!isPending && products.length === 0 && (
        <div className="flex justify-center items-center w-full py-16">
          <div className="text-center">
            <p className="text-lg text-gray-600">No products found</p>
          </div>
        </div>
      )}
    </div>
  );
}