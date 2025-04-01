import { useCallback } from "react";

export default function DateInput({
    name,
    value,
    onChange,
    placeholder = "Enter the date dd-mm-yyyy",
    className = "",
}) {
    // Format while typing
    const formatDate = useCallback((input) => {
        let digitsOnly = input.replace(/\D/g, "").slice(0, 8);
        let result = digitsOnly;
        if (digitsOnly.length >= 3 && digitsOnly.length <= 4) {
            result = digitsOnly.slice(0, 2) + "-" + digitsOnly.slice(2);
        } else if (digitsOnly.length >= 5) {
            result =
                digitsOnly.slice(0, 2) +
                "-" +
                digitsOnly.slice(2, 4) +
                "-" +
                digitsOnly.slice(4, 8);
        }
        return result;
    }, []);

    // Validate date format
    const isDateValid = (value) => {
        const parts = value.split("-");
        if (parts.length !== 3) return false;

        const [dd, mm, yyyy] = parts;
        const day = parseInt(dd, 10);
        const month = parseInt(mm, 10) - 1; // Months in JavaScript are 0-based
        const year = parseInt(yyyy, 10);

        const date = new Date(year, month, day);
        return (
            date.getFullYear() === year &&
            date.getMonth() === month &&
            date.getDate() === day
        );
    };

    const handleInputChange = (e) => {
        const formatted = formatDate(e.target.value);

        if (formatted.length === 10 && !isDateValid(formatted)) {
            alert("The entered date is not valid.");
            return;
        }

        onChange({
            ...e,
            target: {
                ...e.target,
                name,
                value: formatted,
            },
        });
    };

    return (
        <input
            type="text"
            name={name}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={`w-full h-8 px-3 py-1 truncate rounded-md border border-input border-gray-500 placeholder:text-xs placeholder:font-montserrat placeholder:text-placeholder-text text-sm font-montserrat shadow-xs focus-visible:border-input-focus focus:bg-input-background focus-visible:ring-0 outline-none ${className}`}
        />
    );
}