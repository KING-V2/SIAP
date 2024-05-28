import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TiendaModel } from '../tienda.model';
import { TiendaService } from '../tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-tienda',
  templateUrl: './lista-tienda.component.html',
  styleUrls: ['./lista-tienda.component.css']
})
export class ListaTiendaComponent implements OnInit {

  tiendas: Observable<TiendaModel[]> | undefined;

  constructor(private tiendaService: TiendaService) { }

  ngOnInit() {
    this.obtenerTiendas();
  }
  
  obtenerTiendas() {
    this.tiendaService.obtenerTienda().subscribe(
      data => {
        console.log("Datos de tiendas obtenidos:", data);
        this.tiendas = of(data);
      },
      error => {
        console.error("Error al obtener las tiendas:", error);
      }
    );
  }
  
  borrarTienda(id: string) {
    console.log("ID de la tienda a eliminar:", id);
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
        this.tiendaService.borrarTienda(id).subscribe(
          () => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "El registro se ha eliminado con éxito.",
              icon: "success"
            });
            this.obtenerTiendas(); 
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
