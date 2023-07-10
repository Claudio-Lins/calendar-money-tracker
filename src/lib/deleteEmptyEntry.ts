import prisma from "@/lib/prisma";

export async function deleteEmptyEntry() {
  const entries = await prisma.entry.findMany({
    include: {
      entryDetails: true,
    },
  });
  const hasEntryDetails = entries.some((entry) => entry.entryDetails.length);

  console.log(hasEntryDetails);

  if (!hasEntryDetails) {
    await prisma.entry.deleteMany();
  }
}
