import { useEffect, useState } from "react";
import ProductListItem from "../components/ProductListItem";
import { fetchProducts, fetchCategories } from "../utils/api"; // Assuming you have an API utility function
import { Product } from "../types";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { LoaderFunction, json } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || "1");
  const orderByField = url.searchParams.get("orderByField") || "name";
  const sortOrder = url.searchParams.get("sortOrder") || "asc";
  const categoryId = url.searchParams.get("categoryId") || undefined;

  const response = await fetchProducts(
    page,
    10,
    orderByField,
    sortOrder,
    categoryId
  );
  return json(response);
};

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
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [categoryId, setCategoryId] = useState<number>();

  useEffect(() => {
    // Fetch categories from backend on component mount
    fetchCategories()
      .then((response) => setCategories(response))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

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
      categoryId: String(categoryId),
    });
  }, [page, orderByField, sortOrder, categoryId]);

  const handleSort = (field: "name" | "price") => {
    if (field === orderByField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setOrderByField(field);
      setSortOrder("asc");
    }
    setPage(1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleCategoryChange = (categoryId: number | undefined) => {
    setCategoryId(categoryId);
    setPage(1);
  };

  if (!data || categories.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl mb-4 text-center">Product List</h2>
        <div className="flex items-center justify-between mb-4">
          <div>
            <label htmlFor="category" className="mr-2">
              Filter by Category:
            </label>
            <select
              id="category"
              className="p-2 border border-gray-300 rounded"
              onChange={(e) => handleCategoryChange(Number(e.target.value))}
              value={categoryId || ""}
            >
              <option value="">All Categories</option>
              {/* Map over categories to populate options */}
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span className="mr-2">Sort by:</span>
            <button
              className={`mr-2 ${
                orderByField === "name" ? "font-bold" : "font-normal"
              }`}
              onClick={() => handleSort("name")}
            >
              Name{" "}
              {orderByField === "name" &&
                `(${sortOrder === "asc" ? "▲" : "▼"})`}
            </button>
            <button
              className={`mr-2 ${
                orderByField === "price" ? "font-bold" : "font-normal"
              }`}
              onClick={() => handleSort("price")}
            >
              Price{" "}
              {orderByField === "price" &&
                `(${sortOrder === "asc" ? "▲" : "▼"})`}
            </button>
          </div>
        </div>
        {products.length > 0 && (
          <ProductListItem
            products={products}
            orderByField={orderByField}
            handleSort={handleSort}
          />
        )}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
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
