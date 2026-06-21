export interface BookingTypes {
  id: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;

  guests: {
    fullName: string;
    email: string;
    country: string;
    countryFlag: string;
    nationalID: number;
  };
  cabins: { name: string };
}

export interface BookingTableTypes {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  hasBreakfast: boolean;
  status: "unconfirmed" | "checked-in" | "checked-out";
  totalPrice: number;
  cabins: { name: string };
  guests: { fullName: string; email: string };
}
