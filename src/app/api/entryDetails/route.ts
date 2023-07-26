import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// GET entryDetails
export async function GET(request: NextRequest) {
  const entryDetails = await prisma.entryDetails.findMany();
  return NextResponse.json({
    entryDetails,
  });
}

// delete entryDetails
export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const entryDetails = await prisma.entryDetails.delete({
    where: {
      id: body.id,
    },
  });
  return NextResponse.json({
    entryDetails,
  });
}

// PUT entryDetails
export async function PUT(request: Request) {
  const body = await request.json();
  const entryDetails = await prisma.entryDetails.update({
    where: {
      id: body.id,
    },
    data: {
      ...body,
    },
  });
  return NextResponse.json({
    entryDetails,
  });
}
