/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category, Product } from "../types";
import { LoaderFunction, json } from "@remix-run/node";
import { fetchCategories, saveProduct } from "../utils/api";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
  const response = await fetchCategories();
  return json(response);
};

const ProductForm: React.FC = () => {
  const categories = useLoaderData<Category[]>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<Product, "id" | "categories">>({
    name: "",
    description: "",
    price: 0,
    image: "",
  });
  const [parentCategoryId, setParentCategoryId] = useState<number | "">("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      | any
  ) => {
    const { name, value } = e.target;
    if (name === "parentCategory") {
      setParentCategoryId(value ? parseInt(value, 10) : "");
      setSelectedCategories([]);
    } else if (name === "category") {
      const categoryId = value === "new" ? "new" : value;
      if (categoryId === "new") {
        setSelectedCategories(["new"]);
      } else {
        if (selectedCategories.includes("new")) {
          setSelectedCategories([categoryId]);
        } else {
          setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(categoryId)) {
              return prevSelected.filter((id) => id !== categoryId);
            } else {
              return [...prevSelected, categoryId];
            }
          });
        }
      }
    } else if (name === "newCategory") {
      setNewCategoryName(value);
    } else if (name === "image") {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        setImageFile(files[0]);
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: name === "price" ? parseFloat(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let productData: any = {
      ...formData,
      categories: selectedCategories.includes("new")
        ? [newCategoryName]
        : selectedCategories,
    };

    if (parentCategoryId && categories.length > 0) {
      const parentCategory = categories.find(
        (category) => category.id === parseInt(parentCategoryId.toString())
      );
      if (parentCategory) {
        productData = {
          ...productData,
          parentCategory: parentCategory.name,
        };
      }
    }

    const formDataObj = new FormData();
    formDataObj.append("name", productData.name);
    formDataObj.append("description", productData.description);
    formDataObj.append("price", productData.price.toString());
    if (imageFile) {
      formDataObj.append("image", imageFile);
    }
    formDataObj.append("categories", JSON.stringify(productData.categories));
    if (productData.parentCategory) {
      formDataObj.append("parentCategory", productData.parentCategory);
    }

    await saveProduct(formDataObj);
    navigate("/products");
  };

  const getFilteredCategories = () => {
    return parentCategoryId
      ? categories.find((category) => category.id === parentCategoryId)
          ?.subcategories || []
      : categories;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 my-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl mb-4 text-center">Create Product</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Parent Category (optional)
          </label>
          <select
            name="parentCategory"
            value={parentCategoryId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          >
            <option value="">Select Parent Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Categories</label>
          <div className="flex flex-wrap">
            {getFilteredCategories().map((category) => (
              <div
                key={category.id}
                className={`p-2 m-1 rounded cursor-pointer ${
                  selectedCategories.includes(category.name) &&
                  !selectedCategories.includes("new")
                    ? "bg-blue-500 text-white" // Selected style
                    : "bg-gray-200 text-gray-700 hover:bg-blue-200" // Default style
                }`}
                onClick={() =>
                  handleChange({
                    target: { name: "category", value: category.name },
                  })
                }
              >
                {category.name}
              </div>
            ))}
            <div
              className={`p-2 m-1 rounded cursor-pointer ${
                selectedCategories.includes("new")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-200"
              }`}
              onClick={() =>
                handleChange({ target: { name: "category", value: "new" } })
              }
            >
              New Category
            </div>
          </div>
        </div>
        {selectedCategories.includes("new") && (
          <div className="mb-4">
            <label className="block text-gray-700">New Category Name</label>
            <input
              type="text"
              name="newCategory"
              value={newCategoryName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
