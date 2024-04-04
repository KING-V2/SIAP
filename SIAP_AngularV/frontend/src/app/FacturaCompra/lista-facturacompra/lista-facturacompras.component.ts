import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FacturacompraModel } from '../facturacompra.model';
import { FacturacompraService } from '../facturacompra.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-lista-facturacompra',
  templateUrl: './lista-facturacompras.component.html',
  styleUrls: ['./lista-facturacompras.component.css']
})

export class ListaFacturacomprasComponent implements OnInit {

  Facturacompra: Observable<FacturacompraModel[]> | undefined;

  constructor(private facturacompraService: FacturacompraService) { }

  ngOnInit() {
      this.Facturacompra = this.facturacompraService.obtenerFacturacompra();
      
  }

  borrarFacturacompra(id: string) {
    this.facturacompraService.borrarFacturacompra(id).subscribe(data => {
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
