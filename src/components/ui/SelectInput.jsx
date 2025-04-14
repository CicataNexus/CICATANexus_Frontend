import { cn } from "@/lib/utils";

export default function SelectInput({
  name,
  value,
  onChange,
  options = [],
  placeholder = "Seleccione una opción",
  showError = false,
  errorMessage = "Este campo es obligatorio",
  className = "",
}) {
  return (
    <div className="w-full">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full h-8 mt-1 rounded-md border px-2 font-montserrat font-normal text-xs focus-visible:border-input-focus focus:bg-input-background focus-visible:ring-0 outline-none",
          value === "" ? "text-placeholder-text" : "text-black",
          showError ? "border-red-500" : "border-gray-500",
          className
        )}
      >
        <option value="">{placeholder}</option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {showError && (
        <span className="text-red-500 text-xs mt-1 font-montserrat font-semibold">
          {errorMessage}
        </span>
      )}
    </div>
  );
}