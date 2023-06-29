import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const entrie = await prisma.entry.delete({
    where: { id: body.id },
  });
  return NextResponse.json({
    entrie,
  });
}

export async function GET(request: NextRequest) {
  const entries = await prisma.entry.findMany();
  return NextResponse.json({
    entries,
  });
}
