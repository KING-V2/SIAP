import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdenDeSalidaDetalladaModel } from '../ordendesalidadetallada.model';
import { OrdenDeSalidaDetalladaService } from '../ordendesalidadetallada.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-ordendesalidadetallada',
  templateUrl: './lista-ordendesalidadetallada.component.html',
  styleUrls: ['./lista-ordendesalidadetallada.component.css']
})
export class ListaOrdenDeSalidaDetalladaComponent implements OnInit {

  ordendesalidadetalladas: Observable<OrdenDeSalidaDetalladaModel[]> | undefined; // Cambio aquí

  constructor(private ordendesalidadetalladaService: OrdenDeSalidaDetalladaService) { }

  ngOnInit() {
      this.ordendesalidadetalladas = this.ordendesalidadetalladaService.obtenerOrdenDeSalidaDetallada(); // Cambio aquí
  }

  borrarOrdenDeSalidaDetallada(id: string) {
    this.ordendesalidadetalladaService.borrarOrdenDeSalidaDetallada(id).subscribe(data => {
      console.log(data);
    })

    Swal.fire({
      title: "¿Esta seguro de que desea eliminar el dato?",
      text: "No podra revertir este cambio!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado!",
          text: "El registro se ha eliminado con exito.",
          icon: "success"
        })
        setTimeout(() => {
          window.location.reload();
        }, 2000);;
      }
    }
    );

  }

}
