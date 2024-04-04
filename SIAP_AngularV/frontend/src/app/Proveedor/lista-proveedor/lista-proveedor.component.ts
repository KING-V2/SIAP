import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProveedorModel } from '../proveedor.model';
import { ProveedorService } from '../proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-proveedor',
  templateUrl: './lista-proveedor.component.html',
  styleUrls: ['./lista-proveedor.component.css']
})
export class ListaProveedorComponent implements OnInit {

  proveedores: Observable<ProveedorModel[]> | undefined;

  constructor(private proveedorService: ProveedorService) { }

  ngOnInit() {
    this.obtenerProveedor();
  }
  
  obtenerProveedor() {
    this.proveedorService.obtenerProveedor().subscribe(
      data => {
        console.log("Datos de proveedores obtenidos:", data);
        this.proveedores = of(data);
      },
      error => {
        console.error("Error al obtener proveedores:", error);
      }
    );
  }
  
  borrarProveedor(id: string) {
    console.log("ID del proveedor a eliminar:", id);
    Swal.fire({
      title: "¿Está seguro de que desea eliminar el dato?",
      text: "¡No podrá revertir este cambio!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.proveedorService.borrarProveedor(id).subscribe(
          () => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "El registro se ha eliminado con éxito.",
              icon: "success"
            });
            this.obtenerProveedor(); 
          },
          error => {
            console.error("Error al eliminar el rol:", error);
            Swal.fire({
              title: "Error",
              text: "Hubo un error al eliminar la tienda. Por favor, inténtelo de nuevo más tarde.",
              icon: "error"
            });
          }
        );
      }
    });
  }
}
