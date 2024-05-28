import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DevolucionModel } from '../devolucion.model';
import { DevolucionService } from '../devolucion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-devolucion',
  templateUrl: './lista-devolucion.component.html',
  styleUrls: ['./lista-devolucion.component.css']
})
export class ListaDevolucionComponent implements OnInit {

  devoluciones: Observable<DevolucionModel[]> | undefined;

  constructor(private devolucionService: DevolucionService) { }

  ngOnInit() {
      this.devoluciones = this.devolucionService.obtenerDevolucion();
  }

  borrarDevolucion(id: string) {
    this.devolucionService.borrarDevolucion(id).subscribe(data => {
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
