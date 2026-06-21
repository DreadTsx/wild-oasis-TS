import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { format, isToday } from "date-fns";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import type { BookingTableTypes } from "../../types/bookingTypes";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }

  & span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  white-space: nowrap;
`;

// Below 600px, Table.Row's default behavior is to stack every field in
// source order. That's a safe fallback, but for bookings we want a tidier
// card: cabin name + status on one line, then guest info, then dates, then
// the price and menu button sharing a final line. CSS grid-template-areas
// lets us re-arrange the SAME six children (Cabin, Stacked, Stacked, Tag,
// Amount, the menu) into that shape purely with CSS, via :nth-child, with
// no changes to the JSX/DOM order below.
const StyledBookingRow = styled(Table.Row)`
  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "cabin status"
      "guest guest"
      "dates dates"
      "amount menu";
    row-gap: 0.6rem;
    column-gap: 1rem;

    & > *:nth-child(1) {
      grid-area: cabin;
      font-size: 1.5rem;
      align-self: center;
    }
    & > *:nth-child(2) {
      grid-area: guest;
    }
    & > *:nth-child(3) {
      grid-area: dates;
    }
    & > *:nth-child(4) {
      grid-area: status;
      justify-self: end;
      align-self: center;
    }
    & > *:nth-child(5) {
      grid-area: amount;
      align-self: center;
      font-size: 1.6rem;
    }
    & > *:nth-child(6) {
      grid-area: menu;
      justify-self: end;
      align-self: center;
    }
  }
`;

interface BookingRowProp {
  booking: BookingTableTypes;
}
type StatusType = "unconfirmed" | "checked-in" | "checked-out";

function BookingRow({
  booking: {
    id: bookingId,
    // created_at,
    startDate,
    endDate,
    numNights,
    // numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}: BookingRowProp) {
  const navigate = useNavigate();

  const statusToTagName: Record<StatusType, string> = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { checkout } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  return (
    <StyledBookingRow>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag $type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See Details
            </Menus.Button>{" "}
            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check In
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => {
                  checkout({ bookingId });
                }}
              >
                Check Out
              </Menus.Button>
            )}
            <Modal.Open opens="delete">
              {(open) => (
                <Menus.Button icon={<HiTrash />} onClick={open}>
                  Delete Booking
                </Menus.Button>
              )}
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() => deleteBooking(bookingId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </StyledBookingRow>
  );
}

export default BookingRow;
