"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

/* ✅ Define Form Data Types */
type InstituteFormData = {
  name: string;
  location: string;
  establishedYear: number;
  type: string;
};

export default function Form() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InstituteFormData>();

  /* ✅ Submit Function */
  const onSubmit: SubmitHandler<InstituteFormData> = (data) => {
    // send to API to save in database
    fetch("/api/institutes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to create institute");
        // success
        setSuccess(true);
        reset();
        setTimeout(() => setSuccess(false), 3000);
        // notify other components to refresh
        window.dispatchEvent(new CustomEvent("institutes:changed"));
      })
      .catch((err) => {
        console.error(err);
        alert("Error saving institute. See console for details.");
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-xl rounded-2xl border">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Create Institute
      </h2>

      {/* ✅ Success Alert */}
      {success && (
        <div className="mb-5 p-4 rounded-xl bg-green-100 border border-green-400 text-green-700 font-medium text-center">
          🎉 Institute Form Submitted Successfully!
        </div>
      )}

      {/* Form Start */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Institute Name */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Institute Name
          </label>
          <input
            type="text"
            placeholder="Enter institute name"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            {...register("name", {
              required: "Institute name is required",
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="Enter location"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            {...register("location", {
              required: "Location is required",
            })}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Established Year */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Established Year
          </label>
          <input
            type="number"
            placeholder="Enter established year"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            {...register("establishedYear", {
              required: "Established year is required",
              valueAsNumber: true,
            })}
          />
          {errors.establishedYear && (
            <p className="text-red-500 text-sm mt-1">
              {errors.establishedYear.message}
            </p>
          )}
        </div>

        {/* Institute Type */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Institute Type
          </label>
          <select
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            {...register("type", {
              required: "Institute type is required",
            })}
          >
            <option value="">Select Type</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>

          {errors.type && (
            <p className="text-red-500 text-sm mt-1">
              {errors.type.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-200"
        >
          Submit Institute
        </button>
      </form>
    </div>
  );
}