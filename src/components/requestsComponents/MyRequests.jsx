import { useState } from "react";
import Header from "./Header";
import Request from "./Request";
import { IoMdClose } from "react-icons/io";

const solicitudes = [
  { type: "Equipo", date: "01/03/2025", status: "En progreso", id: 1 },
  { type: "Equipo", date: "28/02/2025", status: "En progreso", id: 2 },
  { type: "Material", date: "15/02/2025", status: "Aprobada", id: 3 },
  { type: "Reactivo", date: "02/02/2025", status: "Rechazada", id: 4 },
  { type: "Reactivo", date: "02/02/2025", status: "Rechazada", id: 5 },
];

const MyRequests = () => {
  const [activeRequest, setActiveRequest] = useState(null);
  const [cancelledRequestId, setCancelledRequestId] = useState(null); // Track cancelled request
  const [showCancelModal, setShowCancelModal] = useState(false); // To toggle modal visibility

  const handleCancelRequest = (requestId) => {
    setCancelledRequestId(requestId); // Set the cancelled request ID
    setShowCancelModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowCancelModal(false); // Close the modal
    setCancelledRequestId(null); // Reset the cancelled request ID
  };

  const handleClick = (index) => {
    if (activeRequest === index) {
      setActiveRequest(null);
    } else {
      setActiveRequest(index);
    }
  };

  return (
    <div className="h-screen w-full flex-col bg-neutral-100 flex overflow-auto">
      <Header />
      <div className="relative w-full h-full px-14 py-8 bg-neutral-100 flex flex-col justify-center items-center overflow-auto">
        <div className="text-xl mb-8 w-2/3">
          <h1 className="text-3xl">Solicitudes de servicio</h1>
          <p className="text-md text-neutral-500">
            Puede cancelar su solicitud en progreso si ya no la requiere
          </p>
        </div>
        <div className="grid grid-cols-4 w-2/3 bg-dark-blue text-white text-xl rounded-lg my-2 p-6 text-center items-center justify-center">
          <p>Tipo</p>
          <p>Fecha</p>
          <p>Estatus</p>
          <p>Cancelar?</p>
        </div>
        <ul className="text-dark-txt w-2/3 flex flex-col mb-8">
          {solicitudes.map((item, index) => (
            <li key={item.id}>
              <Request
                item={item}
                index={index}
                isActive={activeRequest === index}
                onClick={() => handleClick(index)}
                onCancel={handleCancelRequest}
              />
            </li>
          ))}
        </ul>

        <div className="w-2/3 flex justify-between">
          <p className="text-neutral-400">Mostrando 1 a 5 de x solicitudes</p>
          <div>
            <button className="px-2 m-1 border rounded-lg border-neutral-400 text-neutral-400">
              1
            </button>
            <button className="px-2 m-1 border rounded-lg border-neutral-400 text-neutral-400">
              2
            </button>
            <button className="px-2 m-1 border rounded-lg border-neutral-400 text-neutral-400">
              3
            </button>
            <button className="px-2 m-1 border rounded-lg border-neutral-400 text-neutral-400">
              4
            </button>
          </div>
        </div>

        {/* Modal for cancelling request */}
        {showCancelModal && (
          <div className="h-full w-full absolute backdrop-blur-sm bg-black/50 flex text-center justify-center items-center">
            <div className="relative flex flex-col justify-between items-center bg-green-100 p-30  rounded-3xl gap-12">
              <p className="text-3xl">
                ¿Seguro que desea cancelar la solicitud?
              </p>

              <button
                className="absolute right-4 top-4"
                onClick={handleCloseModal}
              >
                <IoMdClose size={30} />
              </button>
              <div className="flex w-full">
                {" "}
                <button
                  className="w-full py-4 px-8 m-2 bg-dark-blue text-white rounded-xl text-lg"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button className=" w-full py-4 px-8 m-2 bg-primary-blue text-white rounded-xl text-lg">
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;
