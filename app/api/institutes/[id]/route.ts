import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// ✅ PUT Update Institute
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Await params in Next.js 15+
    const { id } = await params;
    const instituteId = Number(id);

    const body = await req.json();

    const updated = await prisma.institute.update({
      where: { id: instituteId },
      data: {
        name: body.name,
        location: body.location,
        establishedYear: body.establishedYear
          ? Number(body.establishedYear)
          : null,
        type: body.type,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : String(err);

    return NextResponse.json(
      { error: `Unable to update institute: ${message}` },
      { status: 500 }
    );
  }
}

// ✅ DELETE Institute
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Await params in Next.js 15+
    const { id } = await params;
    const instituteId = Number(id);

    await prisma.institute.delete({
      where: { id: instituteId },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : String(err);

    return NextResponse.json(
      { error: `Unable to delete institute: ${message}` },
      { status: 500 }
    );
  }
}