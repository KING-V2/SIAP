export class FacturaDetalleModel {

    constructor(
      public Proveedor_idProveedor: string,
      public FacturaCompra_idFacturaCompra: string,
      public CantidadProductos: string,
      public PrecioCompra: string
    ) { }
  
  }
  