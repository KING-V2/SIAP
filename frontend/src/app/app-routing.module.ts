import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditarTiendaComponent } from './Tienda/servicios-tienda/editar-tienda/editar-tienda.component';
import { ListaTiendaComponent } from './Tienda/servicios-tienda/lista-tienda/lista-tienda.component';

import { EditarCategoriaComponent } from './Categoria/editar-categoria/editar-categoria.component';
import { ListaCategoriaComponent } from './Categoria/lista-categoria/lista-categoria.component';

import { EditarSubCategoriaComponent } from './SubCategoria/editar-subcategoria/editar-subcategoria.component';
import { ListaSubCategoriaComponent } from './SubCategoria/listar-subcategoria/listar-subcategoria.component';

import { EditarRolComponent } from './Rol/editar-rol/editar-rol.component';
import { ListaRolComponent } from './Rol/lista-rol/lista-rol.component';

import { EditarTipoDocumentoComponent } from './TipoDocumento/editar-tipodocumento/editar-tipodocumento.component';
import { ListaTipoDocumentoComponent } from './TipoDocumento/lista-tipodocumento/lista-tipodocumento.component';

import { EditarPersonaComponent } from './Persona/editar-persona/editar-persona.component';
import { ListaPersonaComponent} from './Persona/lista-persona/lista-persona.component';

import { EditarTipoContratoComponent } from './TipoContrato/editar-tipocontrato/editar-tipocontrato.component';
import { ListaTipoContratoComponent } from './TipoContrato/lista-tipocontrato/lista-tipocontrato.component';

import { EditarContratoComponent } from './Contrato/editar-contrato/editar-contrato.component';
import { ListaContratoComponent } from './Contrato/lista-contrato/lista-contrato.component';

import { EditarDevolucionComponent } from './Devolucion/editar-devolucion/editar-devolucion.component';
import { ListaDevolucionComponent } from './Devolucion/lista-devolucion/lista-devolucion.component';

import { EditarProveedorComponent } from './Proveedor/editar-proveedor/editar-proveedor.component';
import { ListaProveedorComponent } from './Proveedor/lista-proveedor/lista-proveedor.component';

import { EditarProductoComponent } from './Producto/editar-producto/editar-producto.component';
import { ListaProductoComponent } from './Producto/lista-producto/lista-producto.component';

import { ListaFacturacomprasComponent } from './FacturaCompra/lista-facturacompra/lista-facturacompras.component';
import { EditarFacturacomprasComponent } from './FacturaCompra/editar-facturacompra/editar-facturacompra.component';

import { EditarFacturaDetalleComponent } from './FacturaDetalle/editar-facturadetalle/editar-facturadetalle.component';
import { ListaFacturaDetalleComponent } from './FacturaDetalle/lista-facturadetalle/lista-facturadetalle.component';

import { EditarGestionProductoComponent } from './GestionProducto/editar-gestionproducto/editar-gestionproducto.component';
import { ListaGestionProductoComponent } from './GestionProducto/lista-gestionproducto/lista-gestionproducto.component';

import { EditarOrdenDeSalidaComponent } from './OrdenSalida/editar-ordendesalida/editar-ordendesalida.component';
import { ListaOrdenDeSalidaComponent } from './OrdenSalida/lista-ordendesalida/lista-ordendesalida.component';

import { EditarOrdenDeSalidaDetalladaComponent } from './OrdenSalidaDetallada/editar-ordendesalidadetallada/editar-ordendesalidadetallada.component';
import { ListaOrdenDeSalidaDetalladaComponent } from './OrdenSalidaDetallada/lista-ordendesalidadetallada/lista-ordendesalidadetallada.component';

import { EditarDevolucionDetalladaComponent } from './DevolucionDetallada/editar-devoluciondetallada/editar-devoluciondetallada.component';
import { ListaDevolucionDetalladaComponent } from './DevolucionDetallada/lista-devoluciondetallada/lista-devoluciondetallada.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { LoginComponent } from './Login/login.component';

const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path: 'tienda', component: ListaTiendaComponent },
  { path: 'tiendaAc/:id', component: EditarTiendaComponent },
  { path: 'tiendaAG', component: EditarTiendaComponent },

  { path: 'categoria', component: ListaCategoriaComponent },
  { path: 'categoriaAc/:id', component: EditarCategoriaComponent },
  { path: 'categoriaAG', component: EditarCategoriaComponent },

  { path: 'subcategoria', component: ListaSubCategoriaComponent },
  { path: 'subcategoriaAG', component: EditarSubCategoriaComponent },
  { path: 'subcategoriaAc/:id', component: EditarSubCategoriaComponent },

  { path: 'rol', component: ListaRolComponent },
  { path: 'rolAG', component: EditarRolComponent },
  { path: 'rolAc/:id', component: EditarRolComponent },

  { path: 'tipodocumento', component: ListaTipoDocumentoComponent },
  { path: 'tipodocumentoAG', component: EditarTipoDocumentoComponent },
  { path: 'tipodocumentoAc/:id', component: EditarTipoDocumentoComponent },

  { path: 'persona', component: ListaPersonaComponent },
  { path: 'personaAG', component: EditarPersonaComponent },
  { path: 'personaAc/:id', component: EditarPersonaComponent },

  { path: 'tipocontrato', component: ListaTipoContratoComponent },
  { path: 'tipocontratoAG', component: EditarTipoContratoComponent },
  { path: 'tipocontratoAc/:id', component: EditarTipoContratoComponent },

  { path: 'contrato', component: ListaContratoComponent },
  { path: 'contratoAG', component: EditarContratoComponent },
  { path: 'contratoAc/:id', component: EditarContratoComponent },

  { path: 'devolucion', component: ListaDevolucionComponent },
  { path: 'devolucionAG', component: EditarDevolucionComponent },
  { path: 'devolucionAc/:id', component: EditarDevolucionComponent },

  { path: 'proveedor', component: ListaProveedorComponent },
  { path: 'proveedorAG', component: EditarProveedorComponent },
  { path: 'proveedorAc/:id', component: EditarProveedorComponent },

  { path: 'producto', component: ListaProductoComponent },
  { path: 'productoAG', component: EditarProductoComponent },
  { path: 'productoAc/:id', component: EditarProductoComponent },

  { path: 'facturacompra', component: ListaFacturacomprasComponent },
  { path: 'facturacompraAG', component: EditarFacturacomprasComponent },
  { path: 'facturacompraAc/:id', component: EditarFacturacomprasComponent },

  { path: 'facturadetalle', component: ListaFacturaDetalleComponent },
  { path: 'facturadetalleAG', component: EditarFacturaDetalleComponent },
  { path: 'facturadetalleAc/:id', component: EditarFacturaDetalleComponent },

  { path: 'gestionproducto', component: ListaGestionProductoComponent },
  { path: 'gestionproductoAG', component: EditarGestionProductoComponent },
  { path: 'gestionproductoAc/:id', component: EditarGestionProductoComponent },

  { path: 'ordenDeSalida', component: ListaOrdenDeSalidaComponent },
  { path: 'ordenDeSalidaAG', component: EditarOrdenDeSalidaComponent },
  { path: 'ordenDeSalidaAc/:id', component: EditarOrdenDeSalidaComponent },

  { path: 'ordenDeSalidaDetallada', component: ListaOrdenDeSalidaDetalladaComponent },
  { path: 'ordenDeSalidaDetalladaAG', component: EditarOrdenDeSalidaDetalladaComponent },
  { path: 'ordenDeSalidaDetalladaAc/:id', component: EditarOrdenDeSalidaDetalladaComponent },

  { path: 'devoluciondetallada', component: ListaDevolucionDetalladaComponent },
  { path: 'devoluciondetalladaAG', component: EditarDevolucionDetalladaComponent },
  { path: 'devoluciondetalladaAc/:id', component: EditarDevolucionDetalladaComponent },

  { path: 'bienvenido', component: BienvenidoComponent },
  { path:'**', redirectTo:'login', pathMatch:'full' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
