import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TipoDocumentoModel } from '../tipodocumento.model';
import { TipoDocumentoService } from '../tipo-documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-tipodocumento',
  templateUrl: './lista-tipodocumento.component.html',
  styleUrls: ['./lista-tipodocumento.component.css']
})
export class ListaTipoDocumentoComponent implements OnInit {

  tipodocumentos: Observable<TipoDocumentoModel[]> | undefined;

  constructor(private tipodocumentoService: TipoDocumentoService) { }

  ngOnInit() {
    this.obtenerTipoDocumento();
  }
  
  obtenerTipoDocumento() {
    this.tipodocumentoService.obtenerTipoDocumento().subscribe(
      data => {
        console.log("Datos de tipodocumento obtenidos:", data);
        this.tipodocumentos = of(data);
      },
      error => {
        console.error("Error al obtener tipodocumento:", error);
      }
    );
  }
  
  borrarTipoDocumento(id: string) {
    console.log("ID del tipodocumento a eliminar:", id);
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
        this.tipodocumentoService.borrarTipoDocumento(id).subscribe(
          () => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "El registro se ha eliminado con éxito.",
              icon: "success"
            });
            this.obtenerTipoDocumento(); 
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
