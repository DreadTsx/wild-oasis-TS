import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import type { PostgrestError } from "@supabase/supabase-js";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("Account Created! Check your email to verify your account");
    },
    onError: (err: PostgrestError) => {
      toast.error(err.message);
    },
  });

  return { signup, isLoading };
}
