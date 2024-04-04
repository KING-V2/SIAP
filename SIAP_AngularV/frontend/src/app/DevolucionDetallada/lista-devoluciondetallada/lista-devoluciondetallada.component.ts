import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DevolucionDetalladaModel } from '../devoluciondetallada.model';
import { DevolucionDetalladaService } from '../devolucion-detallada.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-devoluciondetallada',
  templateUrl: './lista-devoluciondetallada.component.html',
  styleUrls: ['./lista-devoluciondetallada.component.css']
})
export class ListaDevolucionDetalladaComponent implements OnInit {

  devoluciondetalladas: Observable<DevolucionDetalladaModel[]> | undefined;

  constructor(private devoluciondetalladaService: DevolucionDetalladaService) { }

  ngOnInit() {
    this.obtenerDevolucionDetallada();
  }
  
  obtenerDevolucionDetallada() {
    this.devoluciondetalladaService.obtenerDevolucionDetallada().subscribe(
      data => {
        console.log("Datos de devoluciondetallada obtenidos:", data);
        this.devoluciondetalladas = of(data);
      },
      error => {
        console.error("Error al obtener las devoluciondetallada:", error);
      }
    );
  }
  
  borrarDevolucionDetallada(id: string) {
    console.log("ID de devoluciondetallada a eliminar:", id);
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
        this.devoluciondetalladaService.borrarDevolucionDetallada(id).subscribe(
          () => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "El registro se ha eliminado con éxito.",
              icon: "success"
            });
            this.obtenerDevolucionDetallada(); 
          },
          error => {
            console.error("Error al eliminar tienda:", error);
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
