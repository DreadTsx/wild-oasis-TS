import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";
import type { PostgrestError } from "@supabase/supabase-js";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  //
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    //? function for mutating the state(deleting a cabin using the id)
    mutationFn: (id: number) => deleteCabinApi(id),
    // ?
    onSuccess: () => {
      toast.success("Cabin Successfully Deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    //?
    onError: (err: PostgrestError) => toast.error(err.message),
  });
  return { isDeleting, deleteCabin };
}
