import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContratoModel } from '../contrato.model';
import { ContratoService } from '../contrato.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-contrato',
  templateUrl: './lista-contrato.component.html',
  styleUrls: ['./lista-contrato.component.css']
})
export class ListaContratoComponent implements OnInit {

  contratos: Observable<ContratoModel[]> | undefined;

  constructor(private contratoService: ContratoService) { }

  ngOnInit() {
      this.contratos = this.contratoService.obtenerContrato();
  }

  borrarContrato(id: string) {
    this.contratoService.borrarContrato(id).subscribe(data => {
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
