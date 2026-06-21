export interface SettingTypes {
  id: number;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export type NewSetting = Omit<SettingTypes, "id" | "created_at">;
