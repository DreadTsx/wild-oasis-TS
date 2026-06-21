import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";
import type { PostgrestError } from "@supabase/supabase-js";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  //
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    //? function for mutating the state(deleting a booking using the id)
    mutationFn: (id: number) => deleteBookingApi(id),
    // ?
    onSuccess: () => {
      toast.success("Booking Successfully Deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    //?
    onError: (err: PostgrestError) => toast.error(err.message),
  });
  return { isDeleting, deleteBooking };
}
