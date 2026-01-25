import prisma from "@/lib/prisma";
import Link from "next/link";

const page = async () => {
  const departments = await prisma.department.findMany();

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Departments</h1>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((department) => (
          <li
            key={department.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="mb-3">
              <h2 className="text-xl font-semibold text-gray-900">
                {department.name}
              </h2>
              <p className="text-sm text-gray-500">📍 {department.location}</p>
            </div>

            <Link
              href={`/departments/${department.id}`}
              className="inline-block mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              View Details →
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default page;
