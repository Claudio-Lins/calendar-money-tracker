import prisma from "@/lib/prisma";
import { Entry } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

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
