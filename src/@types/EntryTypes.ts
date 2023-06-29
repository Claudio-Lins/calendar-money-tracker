export interface EntryTypes {
  entries: {
    id: string;
    type: "EXPENSE" | "INCOME";
    details: {
      id: string;
      entryId: string;
      description: string;
      locale: string;
      amount: number;
    }[];
  }[];
}
