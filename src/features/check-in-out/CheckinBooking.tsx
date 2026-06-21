import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "./useChecking";
import { useBooking } from "../bookings/useBooking";
import type { BookingTableTypes } from "../../types/bookingTypes";
import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";
import { useSetting } from "../settings/useSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;

  @media (max-width: 600px) {
    padding: 1.6rem 2.4rem;
  }
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { setting, isLoading: isLoadingSetting } = useSetting();
  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);
  //
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useChecking();
  //
  if (isLoading || isLoadingSetting) return <Spinner />;
  //
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  }: BookingTableTypes = booking;
  const optionalBreakfast = (setting?.breakfastPrice ?? 0) * numGuests * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfast,
          totalPrice: totalPrice + optionalBreakfast,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} as Record<string, unknown> });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((breakfast) => !breakfast);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfast)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((paid) => !paid)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          {" "}
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {addBreakfast
            ? `${formatCurrency(totalPrice + optionalBreakfast)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfast)})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
