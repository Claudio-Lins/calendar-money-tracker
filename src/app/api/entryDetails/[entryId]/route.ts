import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: {
      entryId: string;
    };
  }
) {
  try {
    const body = await req.json();
    const { entryId } = params;
    const { description, locale, amount, type, createdAt } = body;
    if (!entryId) {
      return new NextResponse("Not found", { status: 404 });
    }
    if (!description || !locale || !amount || !type || !createdAt) {
      return new NextResponse("Bad request", { status: 400 });
    }

    const entryByEntryId = await prisma.entry.findUnique({
      where: {
        id: entryId,
      },
    });

    if (!entryByEntryId) {
      return new NextResponse("EntryId Not found", { status: 404 });
    }

    const entryDetails = await prisma.entryDetails.update({
      where: {
        id: entryId,
      },
      data: {
        description,
        locale,
        amount,
        type,
        createdAt,
      },
    });
    return NextResponse.json(entryDetails);
  } catch (error) {
    console.log("ENTRYDETAILS_PUT", error);
    return new NextResponse("Internal erro", { status: 500 });
  }
}
