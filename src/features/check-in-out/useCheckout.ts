import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: ({ bookingId }: { bookingId: number }) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data: { id: number }) => {
      toast.success(`Booking ${data.id} successfully checked out`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => toast.error("There was an error while checking out"),
  });

  return { checkout, isCheckingOut };
}
