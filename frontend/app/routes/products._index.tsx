import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import ProductListItem from "../components/ProductListItem";
import { fetchProducts } from "../utils/api";
import { Product } from "../types";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || "1");
  const orderByField = url.searchParams.get("orderByField") || "name";
  const sortOrder = url.searchParams.get("sortOrder") || "asc";

  const response = await fetchProducts(page, 10, orderByField, sortOrder);
  return json(response);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProductList() {
  const data = useLoaderData<typeof loader>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [orderByField, setOrderByField] = useState<"name" | "price">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (data) {
      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.totalCount || 0);
    }
  }, [data]);

  useEffect(() => {
    setSearchParams({
      page: String(page),
      orderByField,
      sortOrder,
    });
  }, [page, orderByField, sortOrder]);

  const handleSort = (field: "name" | "price") => {
    if (field === orderByField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setOrderByField(field);
      setSortOrder("asc");
    }
    setPage(1); // Reset page when sorting changes
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl mb-4 text-center">Product List</h2>
        {products.length >= 0 && (
          <ProductListItem
            products={products}
            orderByField={orderByField}
            handleSort={handleSort}
          />
        )}
        {totalPages > 1 && (
          <div className="flex justify-between items-center">
            <div>
              Showing {products.length} of {totalCount} products
            </div>
            <div className="flex">
              <button
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="px-4 py-2 mr-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:text-gray-500"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={page >= totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:text-gray-500"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
