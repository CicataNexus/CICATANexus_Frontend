import PanelAgregarEquipo from "./formularios/PanelAgregarEquipo";
import PanelAgregarReactivo from "./formularios/PanelAgregarReactivo";
import PanelAgregarMaterial from "./formularios/PanelAgregarMaterial";

export default function PanelAgregarProducto({ tipo, onClose }) {
    const renderFormulario = () => {
        switch (tipo) {
            case "equipos":
                return <PanelAgregarEquipo onClose={onClose} />;
            case "reactivos":
                return <PanelAgregarReactivo onClose={onClose} />;
            case "materiales":
                return <PanelAgregarMaterial onClose={onClose} />;
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-gray backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white max-h-[90vh] overflow-y-auto rounded-xl shadow-lg w-[95%] max-w-6xl border border-primary-blue animate-fade-in">
                {renderFormulario()}
            </div>
        </div>
    )
}
