-- 1 Cuál es el stock que hay de materia prima de cada proveedor.


-- 2 En liste el nombre de cada proveedor y su producto más caro.  ---- innecesaria y parecida a la 5


-- 3 Calcular  gastos de proveedores  


-- 4 Cuente todos los productos y en listelos con su respectivo proveedor y su precio 

select NombreEmpresa, nomProducto, precioProducto 
from proveedor 
inner join producto on Proveedor_idProveedor = Proveedor_idProveedor
order by NombreEmpresa, precioProducto;


-- 5 Imprima los productos que más se compran a cada proveedor,enlista nombre y precio.

select nomProducto, precioProducto, NombreEmpresa
from producto 
inner join proveedor on idProveedor = idProveedor
where (idProveedor, precioProducto) in (
select idProveedor, MAX(precioProducto) 
FROM producto
group by idProveedor);

-- 6 Devuelve el proveedor que menos productos nos provee y en listelos con su nombre y precio.

select nomProducto, precioProducto, NombreEmpresa
from producto 
inner join proveedor on idProveedor = idProveedor
where (idProveedor, precioProducto) in (
select idProveedor, MIN(precioProducto) 
FROM producto
group by idProveedor)
limit 1;

-- 7 Imprima los nombres de los proveedores alfabéticamente.         ---- innecesaria

select NombreEmpresa
from proveedor
order by NombreEmpresa asc;
 
 -- 8 calcule el precio total que suman todos los productos
 
 select sum(precioProducto) AS Precio_Total
 from producto;

-- 9 Calcule la cantidad media de todos los productos                         --- no entiendo


-- 10 Calcular el total de entradas y salidas de un producto específico en un período de tiempo   ----- no entiendo



-- 11 Encontrar productos que se están agotando y que deben reabastecerse                       

select nomProducto, cantidadExistente
from producto
where cantidadExistente <= 5;

-- 12 Encontrar productos próximos a vencerse o expirar

select nomProducto, fechaVencimiento
from producto 
where fechaVencimiento >= curdate()
order by fechaVencimiento
limit 7;

-- 13 Calcular el valor total del inventario          ---- repetida 



-- 14 Consultar todos los detalles de un producto especificado por el id 

select idProducto,nomProducto,precioProducto,fechaVencimiento,cantidadExistente 
from producto
where idProducto = 123;

select *
from producto;




-- 15 Consultar la cantidad disponible de un producto en especifico

select nomProducto, cantidadExistente as cantidad_disponible
from producto
where nomProducto = 'Queso Alpina';

-- 16 Calcular el total de los productos que se registraron en una fecha determinada

select idFacturaCompra,observacionesCompra,fechaCompra
from facturacompra
where fechaCompra = '2018-06-02';

-- 17 listar todas las transacciones especificado por el id

select idFacturaCompra,fechaCompra,producto_idProducto
from facturacompra
where producto_idProducto='22';


-- 18 Consultar todos los productos de una categoria especifica 

select nomProducto,categoria.idCategorias, nombreCategoria
from producto
join categoria on idCategorias = categoria.idCategorias
where nombreCategoria = 'Bebidas'
order by nombreCategoria asc;

select*
FROM categoria;

-- 19 Consultar los días en promedio que se demora en vender el producto            ----



-- 20 Lista de los productos que han sido añadidos

select nomProducto, Estado
from producto
join gestionproducto on Producto_idProducto = Producto_idProducto
where Estado = 'Añadido'
order by Estado asc;


-- 21 Enliste las fechas de llegada de los productos con las fechas de salido de bodega y nombre del producto



-- 22 Encontrar los productos que no han sido vendidos usando una subconsulta escalara:

select idProducto, nomProducto
from producto
where idProducto not in (
SELECT DISTINCT producto_idProducto
FROM facturacompra);

-- 23 Encontrar el producto más vendido en el último mes   ------



-- 24 Encontrar el producto menos vendido en el último mes     -----



-- 25 consulte todos los datos de los productos que empiezan por la letra A

select *
from producto
where nomProducto LIKE 'A%';


-- 26 Según la ID del proveedor enliste cada producto que tiene cada proveedor

select NombreEmpresa as NombreProveedor, nomProducto as NombreProducto
from producto
inner join producto on idProveedor= producto.idProveedor;

-- 27 Imprima los productos que salen de fecha tal a fecha tal

-- 28 imprima los productos que se le envían a cada tienda por factura de salida

-- 29 Imprima todos los trabajadores mayores de 30

-- 30 Imprima los precios mayores o igual a 5000 y organizarlos por fecha de entrada 

