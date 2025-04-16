/**
 * Function that transforms backend statuses into user-friendly statuses for the frontend.
 * This ensures that only relevant statuses are displayed to the user.
 */

export function mapRequestStatusForUser(rawStatus) {
    if (
        [
            "Pendiente de aprobación (Jefe de departamento)",
            "Pendiente de aprobación (Técnico)",
            "Aprobada por técnico",
        ].includes(rawStatus)
    )
        return "inProgress";

    if (rawStatus === "Aprobada y notificada") return "approved";

    if (
        rawStatus === "Rechazada por técnico" ||
        rawStatus === "Rechazada y notificada"
    )
        return "rejected";

    if (rawStatus === "Cancelada") return "cancelled";

    return "unknown";
}