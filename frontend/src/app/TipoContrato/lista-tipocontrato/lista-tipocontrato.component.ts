import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TipoContratoModel } from '../tipocontrato-model';
import { TipoContratoService } from '../tipo-contrato.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-tipocontrato',
  templateUrl: './lista-tipocontrato.component.html',
  styleUrls: ['./lista-tipocontrato.component.css']
})
export class ListaTipoContratoComponent implements OnInit {

  tipocontratos: Observable<TipoContratoModel[]> | undefined;

  constructor(private tipocontratoService: TipoContratoService) { }

  ngOnInit() {
    this.obtenerTipoContrato();
  }
  
  obtenerTipoContrato() {
    this.tipocontratoService.obtenerTipoContrato().subscribe(
      data => {
        console.log("Datos de rol obtenidos:", data);
        this.tipocontratos = of(data);
      },
      error => {
        console.error("Error al obtener rol:", error);
      }
    );
  }
  
  borrarTipoContrato(id: string) {
    console.log("ID del tipocontrato a eliminar:", id);
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
        this.tipocontratoService.borrarTipoContrato(id).subscribe(
          () => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "El registro se ha eliminado con éxito.",
              icon: "success"
            });
            this.obtenerTipoContrato(); 
          },
          error => {
            console.error("Error al eliminar el tipocontrato:", error);
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
