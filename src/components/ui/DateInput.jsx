export default function DateInput({
    name,
    value,
    onChange,
    placeholder = "Seleccione una fecha",
    className = "",
}) {
    // Make sure that the value is in the format YYYY-MM-DD
    const formattedValue = value
        ? new Date(value).toISOString().split("T")[0]
        : "";
    // Handle the change event
    const handleChange = (e) => {
        const isoDate = new Date(e.target.value).toISOString();

        onChange({
            ...e,
            target: {
                ...e.target,
                name,
                value: isoDate,
            },
        });
    };

    return (
        <input
            type="date"
            name={name}
            value={formattedValue}
            onChange={handleChange}
            placeholder={placeholder}
            className={`w-full h-8 px-3 py-1 mt-1 truncate rounded-md border border-input border-gray-500 placeholder:text-xs placeholder:font-montserrat placeholder:text-placeholder-text text-sm font-montserrat shadow-xs focus-visible:border-input-focus focus:bg-input-background focus-visible:ring-0 outline-none ${className}`}
        />
    );
}
