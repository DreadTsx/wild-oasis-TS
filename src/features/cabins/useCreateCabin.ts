import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import type { PostgrestError } from "@supabase/supabase-js";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  //? Creating Cabin
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    //
    onSuccess: () => {
      toast.success("Cabin Successfully Created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    //
    onError: (err: PostgrestError) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
