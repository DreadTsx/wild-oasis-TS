import styled from "styled-components";
import { useRecentStays } from "./useRecentStays";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabin } from "../cabins/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.4rem;

  @media (max-width: 1099px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export default function DashboardLayout() {
  const { isLoading: loadingStays, confirmedStays, numDays } = useRecentStays();
  const { isLoading: loadingBookings, bookings } = useRecentBookings();
  const { cabins, isLoading: loadingCabins } = useCabin();

  if (loadingStays || loadingBookings || loadingCabins) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings || []}
        confirmedStays={confirmedStays || []}
        cabinCount={cabins?.length ?? 0}
        numDays={numDays}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays || []} />
      <SalesChart bookings={bookings || []} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
