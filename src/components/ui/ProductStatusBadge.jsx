export default function ProductStatusBadge({ status }) {
    const statusMap = {
        inUse: {
            label: "En uso",
            class: "bg-in-progress-status text-in-progress-status-text font-montserrat font-bold",
        },
        available: {
            label: "Disponible",
            class: "bg-approved-status text-approved-status-text font-montserrat font-bold",
        },
    };

    const { label, class: styleClass } = statusMap[status] || {
        label: "Desconocido",
        class: "bg-gray-300 text-black font-montserrat font-bold",
    };

    return (
        <span
            className={`inline-block px-3 py-1 rounded-full text-sm text-center font-montserrat font-semibold w-28 ${styleClass}`}
        >
            {label}
        </span>
    );
}
