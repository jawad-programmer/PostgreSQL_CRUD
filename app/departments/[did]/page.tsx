import prisma from "@/lib/prisma";

interface PageProps {
  params: Promise<{
    did: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { did } = await params;
  const department = await prisma.department.findUnique({
    where: {
      id: parseInt(did),
    },
  });

  return (
    <>
      <div className="max-w-xl mx-auto mt-10">
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Department Details
          </h1>

          <div className="space-y-3">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">
                Department ID:
              </span>{" "}
              {did}
            </p>

            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Name:</span>{" "}
              {department?.name}
            </p>

            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Location:</span>{" "}
              {department?.location}
            </p>

            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Teachers:</span>{" "}
              {department?.location}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
