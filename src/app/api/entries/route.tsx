import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
// create entry
export async function POST(request: NextRequest) {
  const body = await request.json();
  const entrie = await prisma.entry.create({
    data: {
      details: {
        create: [
          {
            description: body.details.description,
            amount: body.details.amount,
            type: body.details.type,
            locale: body.details.locale,
          },
        ],
      },
    },
  });
  return NextResponse.json({
    entrie,
  });
}

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
  const entries = await prisma.entry.findMany({
    include: {
      details: true,
    },
  });
  return NextResponse.json({
    entries,
  });
}
