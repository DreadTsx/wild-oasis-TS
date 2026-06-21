import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import type { SettingTypes } from "../../types/settingTypes";

export function useSetting() {
  const {
    data: setting,
    isLoading,
    error,
  } = useQuery<SettingTypes>({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  //
  return { setting, isLoading, error };
}
