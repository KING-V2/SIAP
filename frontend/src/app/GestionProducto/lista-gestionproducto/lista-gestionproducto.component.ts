import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GestionProductoModel } from '../gestionproducto.model';
import { GestionProductoService } from '../gestion-producto.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-lista-gestionproducto',
  templateUrl: './lista-gestionproducto.component.html',
  styleUrls: ['./lista-gestionproducto.component.css']
})

export class ListaGestionProductoComponent implements OnInit {

  gestionproductos: Observable<GestionProductoModel[]> | undefined;

  constructor(private gestionproductoService: GestionProductoService) { }

  ngOnInit() {
      this.gestionproductos = this.gestionproductoService.obtenerGestionProducto();
      
  }

  borrarGestionProducto(id: string) {
    this.gestionproductoService.borrarGestionProducto(id).subscribe(data => {
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
