import prisma from "@/lib/prisma";
import { Entry } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
// create entry
export async function POST(request: NextRequest) {
  const body = await request.json();

  const entry = await prisma.entry.findFirst({
    where: {
      entryDetails: {
        some: {
          createdAt: body.entryDetails.createdAt,
        },
      },
    },
  });

  if (entry) {
    console.log("Entrada existente encontrada");

    const entryDetails = await prisma.entryDetails.create({
      data: {
        entryId: entry.id,
        description: body.entryDetails.description,
        amount: body.entryDetails.amount,
        type: body.entryDetails.type,
        locale: body.entryDetails.locale,
        createdAt: body.entryDetails.createdAt,
      },
    });

    return NextResponse.json({
      entry: {
        ...entry,
        entryDetails: [entryDetails],
      },
    });
  } else {
    console.log("Nenhuma entrada existente encontrada");

    const newEntry = await prisma.entry.create({
      data: {
        entryDetails: {
          create: {
            description: body.entryDetails.description,
            amount: body.entryDetails.amount,
            type: body.entryDetails.type,
            locale: body.entryDetails.locale,
            createdAt: body.entryDetails.createdAt,
          },
        },
      },
    });

    return NextResponse.json({
      entry: newEntry,
    });
  }
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
