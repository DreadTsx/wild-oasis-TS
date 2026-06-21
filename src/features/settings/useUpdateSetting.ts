import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import type { PostgrestError } from "@supabase/supabase-js";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  //? Creating Cabin
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    //
    onSuccess: () => {
      toast.success("Cabin Successfully Created");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    //
    onError: (err: PostgrestError) => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
}
