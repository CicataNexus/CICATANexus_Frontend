const Footer = () => {
  return (
    <div className="flex h-fit justify-around items-center text-center text-white bg-gradient-to-r from-blue-bg-gradient to-dim-blue-background font-montserrat text-xs">
      <div className="m-4">
        <p>Folio: CuM-LAB-RE-03</p>
        <p>Versión: 03</p>
        <p>Fecha de modificación: 21/02/2025</p>
      </div>
      <div className="m-4">
        <p>Fecha de revisión: 21/02/2025</p>
        <p>Fecha de aprobación: 07/09/2024</p>
        <p>Próxima Revisión: 22/10/2026</p>
      </div>
      <div className="m-4">
        <p>Modificó: Alan Fabricio Mendoza Peralta</p>
        <p>Revisó: Nancy Rivera Gómez</p>
        <p>Aprobó: Leslie Olmedo Nieva</p>
      </div>
    </div>
  );
};

export default Footer;
