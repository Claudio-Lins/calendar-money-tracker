import prisma from "@/lib/prisma";
import { Entry } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
// create entry

export async function POST(request: NextRequest) {
  const body = await request.json();

  const entryDate = new Date(body.entryDetails.createdAt); // Converte a string da data para um objeto Date
  const entryYear = entryDate.getFullYear(); // Obtém o ano da data
  const entryMonth = entryDate.getMonth(); // Obtém o mês da data
  const entryDay = entryDate.getDate(); // Obtém o dia da data

  const entry = await prisma.entry.findFirst({
    where: {
      entryDetails: {
        some: {
          createdAt: {
            gte: new Date(entryYear, entryMonth, entryDay), // Compara apenas o dia, mês e ano
            lt: new Date(entryYear, entryMonth, entryDay + 1), // Adiciona 1 dia para a comparação de "menor que"
          },
        },
      },
    },
  });

  if (entry) {
    console.log("Entrada existente encontrada", entryDate);

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
    where: {
      id: body.id,
    },
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

  if (!entries) throw new Error("Problemas com a rota GET");
  console.log({ entries });
  return NextResponse.json({
    entries,
  });
}
