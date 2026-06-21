import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewCabin } from "../../types/cabinTypes";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import type { PostgrestError } from "@supabase/supabase-js";

export function useEditCabin() {
  const queryClient = useQueryClient();

  //? Creating / Editing Cabin
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({
      newCabinData,
      id,
    }: {
      newCabinData: NewCabin;
      id?: number;
    }) => createEditCabin(newCabinData, id),
    //
    onSuccess: () => {
      toast.success("Cabin Successfully Updated");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    //
    onError: (err: PostgrestError) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
