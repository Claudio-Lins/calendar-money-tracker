export interface EntryTypes {
  entries: {
    id: string;
    updatedAt: Date;
    createdAt: Date;
    entryDetails: {
      id: string;
      entryId: string;
      description: string | null;
      type: "INCOME" | "EXPENSE";
      locale: string | null;
      amount: number;
      updatedAt: Date;
      createdAt: Date;
    }[];
  }[];
}
