import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const entrie = await prisma.entrie.create({
    data: {
      title: body.title,
      amount: body.amount,
      type: body.type,
    },
  });
  return NextResponse.json({
    entrie,
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const entrie = await prisma.entrie.update({
    where: { id: body.id },
    data: {
      title: body.title,
      amount: body.amount,
      type: body.type,
    },
  });
  return NextResponse.json({
    entrie,
  });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const entrie = await prisma.entrie.delete({
    where: { id: body.id },
  });
  return NextResponse.json({
    entrie,
  });
}

export async function GET(request: NextRequest) {
  const entries = await prisma.entrie.findMany();
  return NextResponse.json({
    entries,
  });
}
