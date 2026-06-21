export interface CabinTypes {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string | File;
  created_at: string;
}

export type NewCabin = Omit<CabinTypes, "id" | "created_at">;

export interface CabinFormData {
  name: string;
  maxCapacity: string;
  regularPrice: string;
  discount: string;
  description: string;
  image: FileList;
}
