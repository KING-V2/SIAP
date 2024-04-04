import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RolModel } from '../rol.model';
import { RolService } from '../rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-rol',
  templateUrl: './lista-rol.component.html',
  styleUrls: ['./lista-rol.component.css']
})
export class ListaRolComponent implements OnInit {

  roles: Observable<RolModel[]> | undefined;

  constructor(private rolService: RolService) { }

  ngOnInit() {
    this.obtenerRol();
  }
  
  obtenerRol() {
    this.rolService.obtenerRol().subscribe(
      data => {
        console.log("Datos de rol obtenidos:", data);
        this.roles = of(data);
      },
      error => {
        console.error("Error al obtener rol:", error);
      }
    );
  }
  
  borrarRol(id: string) {
    console.log("ID del rol a eliminar:", id);
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
        this.rolService.borrarRol(id).subscribe(
          () => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "El registro se ha eliminado con éxito.",
              icon: "success"
            });
            this.obtenerRol(); 
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
