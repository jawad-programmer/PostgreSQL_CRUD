import { getAllInstitutes } from "@/lib/institute.service";
import Link from "next/link";

export default async function Home() {
  // const institutes = await prisma.institute.findMany();
  // get  institutes where name starts with 'A'
  const institutes = await getAllInstitutes();
  console.log(institutes)
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6 text-center">
          Testing Page
        </h1>

        {/* Subtext */}
        <p className="text-center text-gray-600 mb-8 max-w-md">
          This is a placeholder page for testing purposes. You can navigate to
          the creation page below.
        </p>

        {/* Navigation Link */}
        <Link
          href="/create"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md
               hover:bg-blue-700 transition duration-300"
        >
          Go To Create Institute Page
        </Link>
      </div>
    </>
  );
}
