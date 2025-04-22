export default function RequestAdminStatusBadge({ status }) {
    const statusMap = {
        pendingDept: {
            label: "Pendiente de\naprobación (Jefe Dpto)",
            class: "bg-in-progress-status text-in-progress-status-text font-montserrat font-bold",
            multiLine: true,
        },
        pendingTech: {
            label: "Pendiente de\naprobación (Técnico)",
            class: "bg-pending-approval-technician text-pending-approval-technician-text font-montserrat font-bold",
            multiLine: true,
        },
        approvedByTech: {
            label: "Aprobada por Técnico",
            class: "bg-approved-by-technician text-approved-by-technician-text font-montserrat font-bold",
        },
        approvedAndNotified: {
            label: "Aprobada y notificada",
            class: "bg-approved-status text-approved-status-text font-montserrat font-bold",
        },
        rejectedByTech: {
            label: "Rechazada por Técnico",
            class: "bg-rejected-by-tech text-rejected-by-tech-text font-montserrat font-bold",
        },
        rejectedAndNotified: {
            label: "Rechazada y notificada",
            class: "bg-rejected-status text-rejected-status-text font-montserrat font-bold",
        },
        cancelled: {
            label: "Cancelada por Usuario",
            class: "bg-gray-300 text-gray-700 font-montserrat font-bold",
        },
    };

    const { label, class: styleClass, multiLine } = statusMap[status] || {
        label: "Desconocido",
        class: "bg-gray-300 text-black font-montserrat font-bold",
        multiLine: false,
    };

    return (
        <span
            className={`inline-block px-3 py-1 rounded-full text-sm text-center font-montserrat font-semibold w-[195px] ${
                multiLine ? "whitespace-pre-line" : ""
            } ${styleClass}`}
        >
            {label}
        </span>
    );
}
