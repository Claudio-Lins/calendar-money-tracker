import { Entrie } from "@prisma/client";

export interface EntrieTypes {
  id: string;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
}
[];
