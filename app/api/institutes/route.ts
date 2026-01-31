import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    const institutes = await prisma.institute.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json(institutes);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const created = await prisma.institute.create({
      data: {
        name: body.name,
        location: body.location,
        establishedYear: Number(body.establishedYear),
        type: body.type,
      },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Unable to create institute: ${message}` }, { status: 500 });
  }
}
