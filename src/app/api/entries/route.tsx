import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
// create entry
export async function POST(request: NextRequest) {
  const body = await request.json();

  let entry = await prisma.entry.findFirst({
    where: {
      createdAt: body.createdAt,
    },
  });

  if (!entry) {
    entry = await prisma.entry.create({
      data: {
        entryDetails: {
          create: [
            {
              description: body.entryDetails.description,
              amount: body.entryDetails.amount,
              type: body.entryDetails.type,
              locale: body.entryDetails.locale,
              createdAt: body.entryDetails.createdAt,
            },
          ],
        },
      },
    });
  } else {
    await prisma.entryDetails.create({
      data: {
        entryId: entry.id,
        description: body.entryDetails.description,
        amount: body.entryDetails.amount,
        type: body.entryDetails.type,
        locale: body.entryDetails.locale,
        createdAt: body.entryDetails.createdAt,
      },
    });
  }

  return NextResponse.json({
    entry,
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
      entryDetails: true,
    },
  });
  return NextResponse.json({
    entries,
  });
}
