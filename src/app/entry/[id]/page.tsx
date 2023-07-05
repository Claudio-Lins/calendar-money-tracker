import { Modal } from "@/components/Modal";
import prisma from "@/lib/prisma";

type EntryProps = {
  params: {
    id: string;
  };
};

export default async function Entry({ params: { id } }: EntryProps) {
  const entry = await prisma.entry.findUnique({
    where: {
      id: String(id),
    },
    include: {
      entryDetails: true,
    },
  });

  return (
    <div className="text-white flex items-center justify-center w-full h-screen">
      <div className="">
        <h1>
          {new Intl.DateTimeFormat("pt", {
            dateStyle: "full",
          }).format(entry?.createdAt)}
        </h1>
        {entry?.entryDetails.map((entryDetail) => {
          return (
            <div key={entryDetail.id}>
              <h2>{entryDetail.type}</h2>
              <p>{entryDetail.description}</p>
              <p>{entryDetail.amount}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
