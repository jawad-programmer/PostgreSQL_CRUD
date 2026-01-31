import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-center gap-10">
          <a href="#create" className="hover:text-yellow-400">
            Create
          </a>

          <a href="#read" className="hover:text-yellow-400">
            Read
          </a>

          <a href="#update" className="hover:text-yellow-400">
            Update
          </a>

          <a href="#delete" className="hover:text-yellow-400">
            Delete
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
