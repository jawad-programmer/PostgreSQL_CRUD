import  prisma  from "@/lib/prisma";
type Institute = {
    id: number;
    name: string;
    location: string;
};

export async  function getAllInstitutes(): Promise<Institute[]> {
    return await prisma.institute.findMany();
}

export async function addInstitute(name: string, location: string)   {
    const institute = await prisma.institute.create({
        data: {
            name,
            location
        },
    });
    return institute;
}

export async function deleteInstitute(id: number) {
    await prisma.institute.delete({
        where: { id },
    });
}

export async function getInstituteById(id: number): Promise<Institute | null> {
    return await prisma.institute.findUnique({
        where: { id },
    });
}

export async function updateInstitute(id: number, name: string, location: string) {
    const institute = await prisma.institute.update({
        where: { id },
        data: {
            name,
            location
        },
    });
    return institute;
}
