export default function PanelAgregarMaterial({ onClose }) {
    return (
      <div className="bg-white shadow-lg border border-blue-200 rounded-xl p-6 mt-4 w-full animate-fade-in">
        <form className="flex flex-col gap-6">
          {/* Sección: Información general */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Información general</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-sm mb-1">
                  Número de inventario
                </label>
                <input
                  type="text"
                  className="w-full bg-input-background rounded px-3 py-2 text-sm"
                  placeholder="Ingrese el número de inventario"
                />
              </div>
              <div>
                <label className="block font-medium text-sm mb-1">Nombre</label>
                <input
                  type="text"
                  className="w-full bg-input-background rounded px-3 py-2 text-sm"
                  placeholder="Ingrese el nombre"
                />
              </div>
              <div>
                <label className="block font-medium text-sm mb-1">Marca</label>
                <input
                  type="text"
                  className="w-full bg-input-background rounded px-3 py-2 text-sm"
                  placeholder="Ingrese la marca"
                />
              </div>
              <div>
                <label className="block font-medium text-sm mb-1">Modelo</label>
                <input
                  type="text"
                  className="w-full bg-input-background rounded px-3 py-2 text-sm"
                  placeholder="Ingrese el modelo"
                />
              </div>
              <div>
                <label className="block font-medium text-sm mb-1">
                  Número de serie
                </label>
                <input
                  type="text"
                  className="w-full bg-input-background rounded px-3 py-2 text-sm"
                  placeholder="Ingrese el número de serie"
                />
              </div>
              <div>
                <label className="block font-medium text-sm mb-1">Proveedor</label>
                <input
                  type="text"
                  className="w-full bg-input-background rounded px-3 py-2 text-sm"
                  placeholder="Ingrese el proveedor"
                />
              </div>
              <div>
                <label className="block font-medium text-sm mb-1">Imagen</label>
                <input
                  type="file"
                  className="w-full text-sm"
                />
              </div>
            </div>
          </section>
  
          {/* Sección: Trazabilidad */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Trazabilidad</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-sm mb-1">
                  Número de factura
                </label>
                <input
                  type="text"
                  className="w-full bg-input-background rounded px-3 py-2 text-sm"
                  placeholder="Ingrese el número de factura"
                />
              </div>
              <div>
                <label className="block font-medium text-sm mb-1">
                  Fecha de llegada
                </label>
                <input
                  type="date"
                  className="w-full bg-input-background rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block font-medium text-sm mb-1">
                  Registro en SICPat
                </label>
                <input
                  type="text"
                  className="w-full bg-input-background rounded px-3 py-2 text-sm"
                  placeholder="Agitador orbital para matraces con plataforma"
                />
              </div>
              <div>
                <label className="block font-medium text-sm mb-1">
                  Proyecto estratégico vinculado
                </label>
                <input
                  type="text"
                  className="w-full bg-input-background rounded px-3 py-2 text-sm"
                  placeholder="Donación"
                />
              </div>
            </div>
          </section>
  
          {/* Sección: Estado y uso */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Estado y uso</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-sm mb-1">Ubicación</label>
                <input
                  type="text"
                  className="w-full bg-input-background rounded px-3 py-2 text-sm"
                  placeholder="Ingrese la ubicación"
                />
              </div>
              <div>
                <label className="block font-medium text-sm mb-1">Estado</label>
                <select className="w-full bg-input-background rounded px-3 py-2 text-sm">
                  <option>En uso</option>
                  <option>Disponible</option>
                  <option>Fuera de servicio</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium text-sm mb-1">
                  Observaciones
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-input-background rounded px-3 py-2 text-sm"
                  placeholder="Ingrese observaciones sobre el equipo"
                />
              </div>
            </div>
          </section>
  
          {/* Botones */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-reject-btn hover:bg-reject-btn-hover text-white px-5 py-2 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-sidebar text-white px-5 py-2 rounded-lg"
            >
              Agregar equipo
            </button>
          </div>
        </form>
      </div>
    );
  }
  