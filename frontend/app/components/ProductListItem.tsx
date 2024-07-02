import { Product } from "../types";

interface IProductListItem {
  products: Product[];
  orderByField: "name" | "price";
  handleSort: (field: "name" | "price") => void;
}

const ProductListItem = ({
  products,
  orderByField,
  handleSort,
}: IProductListItem) => {
  return (
    <>
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead className="bg-gray-200">
          <tr>
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name {orderByField === "name" && <span>&uarr;&darr;</span>}
            </th>
            <th>Description</th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort("price")}
            >
              Price {orderByField === "price" && <span>&uarr;&darr;</span>}
            </th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <tr key={product.id}>
              <td className="p-2">{product.name}</td>
              <td className="p-2">{product.description}</td>
              <td className="p-2">{product.price}</td>
              <td className="p-2">
                {product.categories.map((category) => category.name).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductListItem;
