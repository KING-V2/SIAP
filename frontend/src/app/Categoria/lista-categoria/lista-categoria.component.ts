import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaModel } from '../categoria.model';
import { CategoriaService } from '../categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css']
})
export class ListaCategoriaComponent implements OnInit {

  categorias: Observable<CategoriaModel[]> | undefined;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
      this.categorias = this.categoriaService.obtenerCategoria();
  }

  borrarCategoria(id: string) {
    this.categoriaService.borrarCategoria(id).subscribe(data => {
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
