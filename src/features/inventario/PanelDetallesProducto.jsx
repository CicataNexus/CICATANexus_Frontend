// import { Icon } from '@iconify/react';

// const camposPorTipo = {
//   equipos: [
//     { key: "no_inventario", label: "Número de inventario" },
//     { key: "nombre", label: "Nombre" },
//     { key: "marca", label: "Marca" },
//     { key: "modelo", label: "Modelo" },
//     { key: "numero_serie", label: "Número de serie" },
//     { key: "proveedor", label: "Proveedor" },
//     { key: "numero_factura", label: "Número de factura" },
//     { key: "fecha_llegada", label: "Fecha de llegada" },
//     { key: "registro_sicpat", label: "Registro en SICPat" },
//     { key: "proyecto_vinculado", label: "Proyecto estratégico vinculado" },
//     { key: "ubicacion", label: "Ubicación" },
//     { key: "estado", label: "Estado" },
//     { key: "observaciones", label: "Observaciones" },
//   ],
// };

// export default function PanelDetallesProducto({ tipo, producto, onClose }) {
//   const campos = camposPorTipo[tipo] || [];

//   return (
//     <tr className="bg-background border border-sidebar-border">
//       <td colSpan={6} className="p-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-[Poppins] text-sm">
//           {/* Grupo 1: Información general */}
//           <div className="space-y-2">
//             <h3 className="text-base font-bold">Información general</h3>
//             {campos.slice(0, 5).map((campo) => (
//               <div key={campo.key}>
//                 <label className="block text-xs font-semibold text-gray-700">{campo.label}</label>
//                 <input
//                   type="text"
//                   defaultValue={producto[campo.key] || ""}
//                   className="w-full mt-1 p-2 border rounded bg-white"
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Grupo 2: Trazabilidad */}
//           <div className="space-y-2">
//             <h3 className="text-base font-bold">Trazabilidad</h3>
//             {campos.slice(5, 10).map((campo) => (
//               <div key={campo.key}>
//                 <label className="block text-xs font-semibold text-gray-700">{campo.label}</label>
//                 <input
//                   type="text"
//                   defaultValue={producto[campo.key] || ""}
//                   className="w-full mt-1 p-2 border rounded bg-white"
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Grupo 3: Estado y uso */}
//           <div className="space-y-2">
//             <h3 className="text-base font-bold">Estado y uso</h3>
//             {campos.slice(10).map((campo) => (
//               <div key={campo.key}>
//                 <label className="block text-xs font-semibold text-gray-700">{campo.label}</label>
//                 <input
//                   type="text"
//                   defaultValue={producto[campo.key] || ""}
//                   className="w-full mt-1 p-2 border rounded bg-white"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex justify-end gap-3 mt-6">
//           <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded">
//             Cancelar
//           </button>
//           <button className="bg-primary-blue text-white px-4 py-2 rounded">
//             Aplicar cambios
//           </button>
//         </div>
//       </td>
//     </tr>
//   );
// }
