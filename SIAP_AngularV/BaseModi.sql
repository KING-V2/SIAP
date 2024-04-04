CREATE DATABASE siap;

-- Construccion de la base de datos --

USE siap ;
-- Tabla #1
CREATE TABLE categoria (
    idCategorias INT NOT NULL AUTO_INCREMENT,
    nombreCategoria VARCHAR(45) ,
    PRIMARY KEY (idCategorias)
);
select * from categoria;
--

-- Tabla #2
CREATE TABLE  subcategoria (
  idsubCategoria INT NOT NULL AUTO_INCREMENT,
  NombreSubCategoria VARCHAR(45) ,
  Categoria_idCategorias INT NOT NULL ,
  PRIMARY KEY (idsubCategoria),
  INDEX fk_subCategoria_Categoria1_idx (Categoria_idCategorias ASC) ,
  CONSTRAINT fk_subCategoria_Categoria1
    FOREIGN KEY (Categoria_idCategorias)
    REFERENCES categoria (idCategorias));
   
    -- Esta tabla tiene una llave foranea, proveniente de la tabla #1 --
    --
   
    --

 -- Tabla #3
CREATE TABLE rol (
    idRol INT NOT NULL AUTO_INCREMENT,
    nombreRol VARCHAR(45) ,
    PRIMARY KEY (idRol)
);
--

-- Tabla #4
CREATE TABLE tipodocumento (
    idtipoDocumento INT NOT NULL AUTO_INCREMENT,
    TipoDeDocumento VARCHAR(45) ,
    PRIMARY KEY (idtipoDocumento)
);
--

-- Tabla #5
CREATE TABLE  persona (
  idPersona INT NOT NULL AUTO_INCREMENT,
  Nombre1 VARCHAR(45) ,
  Nombre2 VARCHAR(45) ,
  Apellido1 VARCHAR(45) ,
  Apellido2 VARCHAR(45) ,
  fechaNacimiento DATE ,
  Telefono BIGINT UNIQUE,
  CorreoElectronico VARCHAR(45) UNIQUE,
  Contrasena VARCHAR (255) UNIQUE,
  DireccionResidencia VARCHAR(45) ,
  NumeroDocumentoIdentidad BIGINT UNIQUE,
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


    SET foreign_key_checks = 0;
   ALTER TABLE persona DROP FOREIGN KEY fk_Persona_tipoDocumento1;
   SET foreign_key_checks = 1;
    
    select * from persona;
   
-- Esta tabla tiene dos llaves foraneas, provenientes de las tablas #3 y #4 --
    --
   
   
-- Tabla #6
CREATE TABLE tipocontrato (
    idtipoContrato INT NOT NULL AUTO_INCREMENT,
    descripcionTipoContrato VARCHAR(45) ,
    PRIMARY KEY (idtipoContrato)
);
--

-- Tabla #7
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
    
    SET foreign_key_checks = 0;
    ALTER TABLE contrato DROP FOREIGN KEY fk_contrato_Persona1;
   ALTER TABLE contrato ADD CONSTRAINT fk_contrato_Persona1 FOREIGN KEY (Persona_idPersona) REFERENCES persona (idPersona) ON DELETE CASCADE ;
   SET foreign_key_checks = 1;
   
-- Esta tabla tiene dos llaves foraneas, provenientes de las tablas #6 y #5 --
    --
   
-- Tabla #8
CREATE TABLE devolucion (
    idDevolucion INT NOT NULL AUTO_INCREMENT,
    DescripcionMotivoDevolucion VARCHAR(45) ,
    FechaDevolucion DATE ,
    PRIMARY KEY (idDevolucion)
);
--

-- Tabla #9
CREATE TABLE proveedor (
    idProveedor INT NOT NULL AUTO_INCREMENT,
    NombreEmpresa VARCHAR(45) ,
    PRIMARY KEY (idProveedor)
);
--

-- Tabla #10
CREATE TABLE  producto (
  idProducto INT NOT NULL AUTO_INCREMENT,
  nomProducto VARCHAR(45) ,
  precioProducto DOUBLE ,
  descripcionProducto VARCHAR (100),
  fechaVencimiento DATE ,
  cantidadExistente INT ,
  categoria_idCategorias INT NOT NULL ,
  PRIMARY KEY (idProducto),
  INDEX fk_Producto_Categoria1_idx (categoria_idCategorias ASC) ,
  CONSTRAINT fk_Producto_categorias1
    FOREIGN KEY (categoria_idCategorias)
    REFERENCES categoria (idCategorias));
    
    select * from producto;
   
-- Esta tabla tiene dos llaves foraneas, provenientes de las tablas #1 y #9 --
    --
   
    -- Table #11
    CREATE TABLE  facturacompra (
  idFacturaCompra INT NOT NULL AUTO_INCREMENT,
  observacionesCompra VARCHAR(45),
  fechaCompra date,
  producto_idProducto INT NOT NULL,
  PRIMARY KEY (idFacturaCompra),
  INDEX fk_FacturaCompra_producto1_idx (producto_idProducto ASC) ,
  CONSTRAINT fk_facturacompra_producto1
    FOREIGN KEY (producto_idProducto)
    REFERENCES producto (idProducto));
    
   SET foreign_key_checks = 0;
   ALTER TABLE facturacompra DROP FOREIGN KEY fk_facturacompra_producto1;
   SET foreign_key_checks = 1;
-- Esta tabla tiene una llave foranea, proveniente de la tabla #10 --
    --

-- Tabla #12
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
   
    -- Esta tabla es compuesta, proveniente de las tablas #8, #9 y #10 --
    --

-- Tabla #13
  CREATE TABLE  facturadetalle (
  Proveedor_idProveedor INT NOT NULL,
  FacturaCompra_idFacturaCompra INT NOT NULL,
  CantidadProductos INT,
  PrecioCompra DOUBLE,
  PRIMARY KEY (FacturaCompra_idFacturaCompra, Proveedor_idProveedor),
  INDEX fk_Producto_has_FacturaCompra_FacturaCompra1_idx (FacturaCompra_idFacturaCompra ASC) ,
  INDEX fk_Producto_has_FacturaCompra_Producto1_idx (Proveedor_idProveedor ASC) ,
  CONSTRAINT fk_Producto_has_FacturaCompra_FacturaCompra1
    FOREIGN KEY (FacturaCompra_idFacturaCompra)
    REFERENCES facturacompra (idFacturaCompra),
  CONSTRAINT fk_Producto_has_FacturaCompra_Proveedor1
    FOREIGN KEY (Proveedor_idProveedor)
    REFERENCES Proveedor (idProveedor));
    
   SET foreign_key_checks = 0;
   ALTER TABLE facturadetalle DROP FOREIGN KEY fk_Producto_has_FacturaCompra_FacturaCompra1;
   SET foreign_key_checks = 1;
   
-- Esta tabla es compuesta, proveniente de las tablas #9 y #11 --
    --

-- Tabla #14
CREATE TABLE  gestionproducto (
  Persona_idPersona INT NOT NULL,
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
    
    SET foreign_key_checks = 0;
    ALTER TABLE gestionproducto DROP FOREIGN KEY fk_Persona_has_Producto_Persona1;
   ALTER TABLE gestionproducto ADD CONSTRAINT fk_Persona_has_Producto_Persona1 FOREIGN KEY (Persona_idPersona) REFERENCES persona (idPersona) ON DELETE CASCADE ;
   SET foreign_key_checks = 1;
   
-- Esta tabla es compuesta, proveniente de las tablas #10 y #5 --
    --
   
    -- Tabla #15
    CREATE TABLE tienda (
    idTienda INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (50),
    direccion VARCHAR (65),
    PRIMARY KEY (idTienda));
    --
   
    -- Tabla #16
    CREATE TABLE ordenDeSalida (
    idordenDeSalida INT NOT NULL AUTO_INCREMENT,
    fechaSalida DATETIME,
    tienda_idTienda INT NOT NULL,
    PRIMARY KEY (idordenDeSalida),
    INDEX fk__ordenDeSalida_tienda1_idx (tienda_idTienda ASC),
    CONSTRAINT fk_ordenDeSalida_tienda1
    FOREIGN KEY (tienda_idTienda)
    REFERENCES tienda (idTienda)
    );
   
-- Esta tabla tiene una llave foranea, proveniente de la tabla #15 --
    --
   
    -- Tabla #17
    CREATE TABLE ordenDeSalidaDetallada (
    Producto_idProducto INT NOT NULL,
    ordenDeSalida_idordenDeSalida INT NOT NULL,
    Cantidad INT,
    PRIMARY KEY (Producto_idProducto,ordenDeSalida_idordenDeSalida),
    INDEX fk_Producto_has_ordenDeSalida_producto1_idx (Producto_idProducto ASC),
    INDEX fk_Producto_has_ordenDeSalida_ordenDeSalida1_idx (ordenDeSalida_idordenDeSalida ASC),
    CONSTRAINT fk_Producto_has_ordenDeSalida_producto1
    FOREIGN KEY (Producto_idProducto)
    REFERENCES producto (idProducto),
    CONSTRAINT fk_Producto_has_ordenDeSalida_ordenDeSalida1
    FOREIGN KEY (ordenDeSalida_idordenDeSalida)
    REFERENCES ordenDeSalida (idordenDeSalida));
   
-- Esta tabla es compuesta, proveniente de las tablas #5 y #16 --
    --