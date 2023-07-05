import prisma from "@/lib/prisma";
import { Entry } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

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
