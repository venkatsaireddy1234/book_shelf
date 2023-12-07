import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-blue-500 p-4 text-white">
      <div className="flex justify-between items-center justify-center">
        <h1 className="text-2xl font-bold">BookShelf</h1>

        <nav>
          <div className="flex space-x-4">
            <Link
              to="/admin"
              className="text-white hover:underline transition duration-300"
            >
              Home 
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
