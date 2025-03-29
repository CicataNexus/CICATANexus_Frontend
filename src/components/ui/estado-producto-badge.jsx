export default function EstadoProductoBadge({ estado }) {
    const estilos = {
        "En uso": "bg-in-progress-status text-black",
        "Disponible": "bg-approved-status text-black",
    };

    const clase =
        "inline-block px-3 py-1 rounded-full text-sm font-montserrat font-semibold w-28 " +
        (estilos[estado] || "bg-gray-300 text-black");

    return <span className={clase}>{estado}</span>;
}