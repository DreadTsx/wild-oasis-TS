import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { PostgrestError } from "@supabase/supabase-js";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  //? Editing user
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    //
    onSuccess: () => {
      toast.success("User Account Successfully Updated");
      queryClient.invalidateQueries(["user"]);
    },
    //
    onError: (err: PostgrestError) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
