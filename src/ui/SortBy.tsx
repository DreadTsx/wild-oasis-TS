import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import type { ChangeEvent } from "react";

interface SortByPropsType {
  options: { value: string; label: string }[];
}
export default function SortBy({ options }: SortByPropsType) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <Select options={options} onChange={onChange} value={sortBy} type="white" />
  );
}
