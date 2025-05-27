import { Card, CardHeader, CardContent, CardTitle } from "../cards/Card";

const lowAvailability = [
    "Sacarosa",
    "Acetato de sodio anhidro.",
    "Ácido sulfúrico",
    "Agua biología molecular",
    "Azul de bromo de sodio",
    "Citrato de sodio",
    "Cloruro de calcio",
    "Cloruro de sodio",
];

const expiringSoon = [
    "Cloruro de potasio",
    "Dimetil sulforico biología molecular",
    "Fosfato de potasio monobásico",
    "Glicerina",
    "Glicina",
    "Hidróxido de sodio len",
    "Tris cloruro de sodio",
    "Tris cloruro de calcio",
];

export default function ReagentsState() {
    return (
        <Card className="p-6 shadow flex flex-col justify-between">
            <CardHeader className="items-start pb-0">
                <CardTitle className="text-base font-semibold font-poppins leading-tight">
                    Estado de los reactivos
                </CardTitle>
            </CardHeader>

            <CardContent className="flex gap-4 h-[175px] overflow-hidden">
                <div className="flex-1 overflow-y-auto pr-1 font-montserrat h-full">
                    <div className="text-xs font-semibold text-red-600 mb-2 flex items-center gap-0.5 leading-none">
                        Baja disponibilidad
                    </div>
                    <ul className="space-y-1 text-xs font-medium mb-0">
                        {lowAvailability.map((item, idx) => (
                            <li
                                key={idx}
                                className="bg-red-50 px-2 py-0.5 rounded-md truncate"
                                title={item}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-1 overflow-y-auto pr-1 font-montserrat h-full">
                    <div className="text-xs font-semibold text-expiring-soon mb-2 flex items-center gap-0.5 leading-none">
                        Pronto a caducar
                    </div>
                    <ul className="space-y-1 text-xs font-medium mb-0">
                        {expiringSoon.map((item, idx) => (
                            <li
                                key={idx}
                                className="bg-blue-50 px-2 py-0.5 rounded-md truncate"
                                title={item}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
