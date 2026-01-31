import { ChevronDown } from "lucide-react";
import type { FilterSelectProps, SelectOption } from "../types";

export const FilterSelect = ({
  label,
  value,
  onChange,
  options,
  className = "",
}: FilterSelectProps) => (
  <div className={`relative min-w-[140px] ${className}`}>
    <select
      value={value}
      onChange={onChange}
      className="w-full appearance-none bg-slate-100 hover:bg-slate-200 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-700 text-xs font-semibold rounded-lg px-3 py-2 pr-8 cursor-pointer transition-all outline-none h-10"
    >
      <option value="All">{label}</option>
      {options.map((opt: string | SelectOption, idx: number) => (
        <option
          key={idx}
          value={
            typeof opt === "string"
              ? opt
              : (opt as SelectOption).value || (opt as SelectOption).name || ""
          }
        >
          {typeof opt === "string"
            ? opt
            : (opt as SelectOption).label || (opt as SelectOption).name || ""}
        </option>
      ))}
    </select>
    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
      <ChevronDown size={14} />
    </div>
  </div>
);
