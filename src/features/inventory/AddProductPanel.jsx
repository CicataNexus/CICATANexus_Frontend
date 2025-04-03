import AddEquipmentPanel from "./forms/AddEquipmentPanel";
import AddReagentPanel from "./forms/AddReagentPanel";
import AddMaterialPanel from "./forms/AddMaterialPanel";

export default function AddProductPanel({ type, onClose }) {
    const formRender = () => {
        switch (type) {
            case "equipos":
                return <AddEquipmentPanel onClose={onClose} />;
            case "reactivos":
                return <AddReagentPanel onClose={onClose} />;
            case "materiales":
                return <AddMaterialPanel onClose={onClose} />;
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-gray backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white max-h-[90vh] overflow-y-auto rounded-xl shadow-lg w-[95%] max-w-6xl border border-primary-blue animate-fade-in">
                {formRender()}
            </div>
        </div>
    )
}
