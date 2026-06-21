import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useChecking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: number;
      breakfast: Record<string, unknown>;
    }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data: { id: number }) => {
      toast.success(`Booking ${data.id} successfully checked`);
      queryClient.invalidateQueries({ queryKey: ["checkin"] });
      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkin, isCheckingIn };
}
