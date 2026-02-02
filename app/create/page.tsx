import React from "react";
import { addInstitute } from "@/app/actions/institute.actions";
import {} from "@/lib/institute.service";
const page = () => {
  return (
    <form
      action={addInstitute}
      className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-5"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Add New Institute
      </h2>

      {/* Institute Name */}
      <input
        type="text"
        name="name"
        placeholder="Institute Name"
        required
        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
      />

      {/* Location */}
      <input
        type="text"
        name="location"
        placeholder="Location"
        required
        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold rounded-xl py-3 hover:bg-blue-700 shadow-md transition duration-300"
      >
        Add Institute
      </button>
    </form>
  );
};

export default page;
