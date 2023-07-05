export interface EntryTypes {
  entries: EntryElement[];
}

export interface EntryElement {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  entryDetails: EntryDetail[];
}

export interface EntryDetail {
  id: string;
  entryId: string;
  description: string;
  locale: string;
  amount: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

// export interface EntryTypes {
//   entries: {
//     id: string;
//     updatedAt: Date;
//     createdAt: Date;
//     entryDetails: {
//       id: string;
//       entryId: string;
//       description: string | null;
//       type: "INCOME" | "EXPENSE";
//       locale: string | null;
//       amount: number;
//       updatedAt: Date;
//       createdAt: Date;
//     }[];
//   }[];
// }
// [];
