export default function RequestAdminStatusBadge({ status }) {
    const statusMap = {
        pendingDept: {
            label: "Pendiente de\naprobación (Jefe Dpto)",
            class: "bg-in-progress-status border-[1.5px] text-in-progress-status-text font-montserrat font-bold",
            multiLine: true,
        },
        pendingTech: {
            label: "Pendiente de\naprobación (Técnico)",
            class: "bg-pending-approval-technician border-[1.5px] text-pending-approval-technician-text font-montserrat font-bold",
            multiLine: true,
        },
        approvedByTech: {
            label: "Aprobada por Técnico",
            class: "bg-approved-by-technician border-[1.5px] text-approved-by-technician-text font-montserrat font-bold",
        },
        approvedAndNotified: {
            label: "Aprobada y notificada",
            class: "bg-approved-status border-[1.5px] border-approved-status-yext text-approved-status-text font-montserrat font-bold",
        },
        rejectedByTech: {
            label: "Rechazada por Técnico",
            class: "bg-rejected-by-tech border-[1.5px] text-rejected-by-tech-text font-montserrat font-bold",
        },
        rejectedAndNotified: {
            label: "Rechazada y notificada",
            class: "bg-rejected-status border-[1.5px] text-rejected-status-text font-montserrat font-bold",
        },
        cancelled: {
            label: "Cancelada por Usuario",
            class: "bg-gray-300 text-gray-700 border-[1.5px] font-montserrat font-bold",
        },
    };

    const { label, class: styleClass, multiLine } = statusMap[status] || {
        label: "Desconocido",
        class: "bg-gray-300 border-[1.5px] text-black font-montserrat font-bold",
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
