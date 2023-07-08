export interface EntryDetailTypes {
  id: string;
  entryId: string;
  description: string | null;
  locale: string;
  amount: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
