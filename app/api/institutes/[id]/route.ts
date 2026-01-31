import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const body = await req.json();
    const updated = await prisma.institute.update({
      where: { id },
      data: {
        name: body.name,
        location: body.location,
        establishedYear: Number(body.establishedYear),
        type: body.type,
      },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Unable to update institute: ${message}` }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    await prisma.institute.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Unable to delete institute: ${message}` }, { status: 500 });
  }
}
