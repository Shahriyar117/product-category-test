// components/Header.tsx
import { Link } from "@remix-run/react";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white py-4">
      <nav className="max-w-3xl mx-auto flex justify-between items-center">
        <Link to="/products" className="text-lg font-bold">
          Product List
        </Link>
        <Link to="/products/new" className="text-lg font-bold">
          Add New Product
        </Link>
      </nav>
    </header>
  );
};

export default Header;
