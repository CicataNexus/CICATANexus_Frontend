import { useCallback } from "react";

export default function InputFecha({
    name,
    value,
    onChange,
    placeholder = "Ingrese la fecha dd-mm-aaaa",
    className = "",
}) {
    // Función para formatear mientras se escribe
    const formatearFecha = useCallback((input) => {
        let soloNumeros = input.replace(/\D/g, "").slice(0, 8);
        let resultado = soloNumeros;
        if (soloNumeros.length >= 3 && soloNumeros.length <= 4) {
            resultado = soloNumeros.slice(0, 2) + "-" + soloNumeros.slice(2);
        } else if (soloNumeros.length >= 5) {
            resultado =
                soloNumeros.slice(0, 2) +
                "-" +
                soloNumeros.slice(2, 4) +
                "-" +
                soloNumeros.slice(4, 8);
        }
        return resultado;
    }, []);

    // Función para validar la fecha
    const esFechaValida = (valor) => {
        const partes = valor.split("-");
        if (partes.length !== 3) return false;

        const [dd, mm, yyyy] = partes;
        const dia = parseInt(dd, 10);
        const mes = parseInt(mm, 10) - 1; // Meses en JS son 0-indexed
        const anio = parseInt(yyyy, 10);

        const fecha = new Date(anio, mes, dia);
        return (
            fecha.getFullYear() === anio &&
            fecha.getMonth() === mes &&
            fecha.getDate() === dia
        );
    };

    const handleInputChange = (e) => {
        const formateado = formatearFecha(e.target.value);

        if (formateado.length === 10 && !esFechaValida(formateado)) {
            alert("La fecha ingresada no es válida.");
            return;
        }

        onChange({
            ...e,
            target: {
                ...e.target,
                name,
                value: formateado,
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
            className={`w-full h-8 px-3 py-1 truncate rounded-md border border-input border-gray-500 placeholder:text-xs placeholder:font-montserrat text-sm font-montserrat shadow-xs focus-visible:border-input-focus focus:bg-input-background focus-visible:ring-0 outline-none ${className}`}
        />
    );
}