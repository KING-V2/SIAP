
CREATE DATABASE  siap;
USE siap ;

CREATE TABLE categoria (
    idCategorias INT NOT NULL AUTO_INCREMENT,
    nombreCategoria VARCHAR(45) ,
    PRIMARY KEY (idCategorias)
);

CREATE TABLE  subcategoria (
  idsubCategoria INT NOT NULL AUTO_INCREMENT,
  NombreSubCategoria VARCHAR(45) ,
  Categoria_idCategorias INT NOT NULL ,
  PRIMARY KEY (idsubCategoria),
  INDEX fk_subCategoria_Categoria1_idx (Categoria_idCategorias ASC) ,
  CONSTRAINT fk_subCategoria_Categoria1
    FOREIGN KEY (Categoria_idCategorias)
    REFERENCES categoria (idCategorias));


CREATE TABLE rol (
    idRol INT NOT NULL AUTO_INCREMENT,
    nombreRol VARCHAR(45) ,
    PRIMARY KEY (idRol)
);

CREATE TABLE tipodocumento (
    idtipoDocumento INT NOT NULL AUTO_INCREMENT,
    TipoDeDocumento VARCHAR(45) ,
    PRIMARY KEY (idtipoDocumento)
);

CREATE TABLE  persona (
  idPersona INT NOT NULL AUTO_INCREMENT,
  Nombre1 VARCHAR(45) ,
  Nombre2 VARCHAR(45) ,
  Apellido1 VARCHAR(45) ,
  Apellido2 VARCHAR(45) ,
  fechaNacimiento DATE ,
  Telefono BIGINT ,
  CorreoElectronico VARCHAR(45) ,
  Contraseña VARCHAR (50),
  DireccionResidencia VARCHAR(45) ,
  NumeroDocumentoIdentidad BIGINT ,
  tipoDocumento_idtipoDocumento INT NOT NULL,
  Rol_idRol INT NOT NULL,
  PRIMARY KEY (idPersona, tipoDocumento_idtipoDocumento, Rol_idRol),
  INDEX fk_Persona_tipoDocumento1_idx (tipoDocumento_idtipoDocumento ASC),
  INDEX fk_Persona_Rol1_idx (Rol_idRol ASC),
  CONSTRAINT fk_Persona_Rol1
    FOREIGN KEY (Rol_idRol)
    REFERENCES rol (idRol),
  CONSTRAINT fk_Persona_tipoDocumento1
    FOREIGN KEY (tipoDocumento_idtipoDocumento)
    REFERENCES tipodocumento (idtipoDocumento));

CREATE TABLE tipocontrato (
    idtipoContrato INT NOT NULL AUTO_INCREMENT,
    descripcionTipoContrato VARCHAR(45) ,
    PRIMARY KEY (idtipoContrato)
);

CREATE TABLE  contrato (
  idContrato INT NOT NULL AUTO_INCREMENT,
  Salario DOUBLE NULL ,
  FechaInicioContrato DATE ,
  FechaFinalContrato DATE ,
  tipoContrato_idtipoContrato INT NOT NULL,
  Persona_idPersona INT NOT NULL,
  PRIMARY KEY (idContrato),
  INDEX fk_Contrato_tipoContrato1_idx (tipoContrato_idtipoContrato ASC) ,
  INDEX fk_contrato_Persona1_idx (Persona_idPersona ASC) ,
  CONSTRAINT fk_contrato_Persona1
    FOREIGN KEY (Persona_idPersona)
    REFERENCES persona (idPersona),
  CONSTRAINT fk_contrato_tipoContrato1
    FOREIGN KEY (tipoContrato_idtipoContrato)
    REFERENCES tipocontrato (idtipoContrato));

CREATE TABLE devolucion (
    idDevolucion INT NOT NULL AUTO_INCREMENT,
    DescripcionMotivoDevolucion VARCHAR(45) ,
    FechaDevolucion DATE ,
    PRIMARY KEY (idDevolucion)
);

CREATE TABLE proveedor (
    idProveedor INT NOT NULL AUTO_INCREMENT,
    NombreEmpresa VARCHAR(45) ,
    PRIMARY KEY (idProveedor)
);




CREATE TABLE  producto (
  idProducto INT NOT NULL AUTO_INCREMENT,
  nomProducto VARCHAR(45) ,
  precioProducto DOUBLE ,
  fechaVencimiento DATE ,
  categoria_idCategorias INT NOT NULL ,
  Proveedor_idProveedor INT NOT NULL ,
  PRIMARY KEY (idProducto),
  INDEX fk_Producto_Proveedor1_idx (Proveedor_idProveedor ASC) ,
  INDEX fk_Producto_Categoria1_idx (categoria_idCategorias ASC) ,
  CONSTRAINT fk_Producto_Proveedor1
    FOREIGN KEY (Proveedor_idProveedor)
    REFERENCES proveedor (idProveedor),
  CONSTRAINT fk_Producto_categorias1
    FOREIGN KEY (categoria_idCategorias)
    REFERENCES categoria (idCategorias));
    
    CREATE TABLE  facturacompra (
  idFacturaCompra INT NOT NULL AUTO_INCREMENT,
  observacionesCompra VARCHAR(45),
  fechaCompra DATE ,
  producto_idProducto INT NOT NULL,
  PRIMARY KEY (idFacturaCompra),
  INDEX fk_FacturaCompra_producto1_idx (producto_idProducto ASC) ,
  CONSTRAINT fk_facturacompra_producto1
    FOREIGN KEY (producto_idProducto)
    REFERENCES producto (idProducto));

    
    CREATE TABLE  devoluciondetallada (
  Devolucion_idDevolucion INT NOT NULL,
  Proveedor_idProveedor INT NOT NULL,
  Producto_idProducto INT NOT NULL,
  CantidadDevolver INT ,
  PRIMARY KEY (Devolucion_idDevolucion, Proveedor_idProveedor),
  INDEX fk_Devolucion_has_Proveedor_Proveedor1_idx (Proveedor_idProveedor ASC) ,
  INDEX fk_Devolucion_has_Proveedor_Devolucion1_idx (Devolucion_idDevolucion ASC) ,
  INDEX fk_Devolucion_has_Proveedor_Producto_idx(Producto_idProducto ASC),
  CONSTRAINT fk_Devolucion_has_Proveedor_Devolucion1
    FOREIGN KEY (Devolucion_idDevolucion)
    REFERENCES devolucion (idDevolucion),
  CONSTRAINT fk_Devolucion_has_Proveedor_Proveedor1
    FOREIGN KEY (Proveedor_idProveedor)
    REFERENCES proveedor (idProveedor),
  CONSTRAINT fk_Devolucion_has_Proveedor_Producto1
    FOREIGN KEY (Producto_idProducto)
    REFERENCES producto (idProducto));


CREATE TABLE  facturadetalle (
  Proveedor_idProveedor INT NOT NULL,
  FacturaCompra_idFacturaCompra INT NOT NULL,
  CantidadProductos INT,
  PrecioCompra DOUBLE,
  PRIMARY KEY (Proveedor_idProveedor, FacturaCompra_idFacturaCompra),
  INDEX fk_Producto_has_FacturaCompra_FacturaCompra1_idx (FacturaCompra_idFacturaCompra ASC) ,
  INDEX fk_Producto_has_FacturaCompra_Producto1_idx (Proveedor_idProveedor ASC) ,
  CONSTRAINT fk_Producto_has_FacturaCompra_FacturaCompra1
    FOREIGN KEY (FacturaCompra_idFacturaCompra)
    REFERENCES facturacompra (idFacturaCompra),
  CONSTRAINT fk_Producto_has_FacturaCompra_Proveedor1
    FOREIGN KEY (Proveedor_idProveedor)
    REFERENCES Proveedor (idProveedor));

CREATE TABLE  gestionproducto (
  Persona_idPersona INT NOT NULL AUTO_INCREMENT,
  Producto_idProducto INT NOT NULL,
  Estado ENUM('Añadido', 'Actualizado', 'Eliminado') ,
  PRIMARY KEY (Persona_idPersona, Producto_idProducto),
  INDEX fk_Persona_has_Producto_Producto1_idx (Producto_idProducto ASC) ,
  INDEX fk_Persona_has_Producto_Persona1_idx (Persona_idPersona ASC) ,
  CONSTRAINT fk_Persona_has_Producto_Persona1
    FOREIGN KEY (Persona_idPersona)
    REFERENCES persona (idPersona),
  CONSTRAINT fk_Persona_has_Producto_Producto1
    FOREIGN KEY (Producto_idProducto)
    REFERENCES producto (idProducto));
    
    CREATE TABLE tienda (
    idTienda INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (50),
    direccion VARCHAR (65),
    PRIMARY KEY (idTienda));
    
