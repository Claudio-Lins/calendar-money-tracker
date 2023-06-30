export interface EntryTypes {
  entries: {
    id: string;
    updatedAt: Date;
    details: {
      id: string;
      entryId: string;
      description: string | null;
      type: "INCOME" | "EXPENSE";
      locale: string | null;
      amount: number;
      updatedAt: Date;
    }[];
  }[];
}
