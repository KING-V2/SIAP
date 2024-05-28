import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SubCategoriaModel } from '../subcategoria.model';
import { SubCategoriaService } from '../subcategoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-subcategoria',
  templateUrl: './listar-subcategoria.component.html',
  styleUrls: ['./listar-subcategoria.component.css']
})
export class ListaSubCategoriaComponent  implements OnInit {

  subcategorias: Observable<SubCategoriaModel[]> | undefined;

  constructor(private subcategoriaService: SubCategoriaService) { }

  ngOnInit() {
    this.obtenerSubCategoria();
  }
  
  obtenerSubCategoria() {
    this.subcategoriaService.obtenerSubCategoria().subscribe(
      data => {
        console.log("Datos de tiendas obtenidos:", data);
        this.subcategorias = of(data);
      },
      error => {
        console.error("Error al obtener las tiendas:", error);
      }
    );
  }
  
  borrarSubCategoria(id: string) {
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
        this.subcategoriaService.borrarSubCategoria(id).subscribe(
          () => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "El registro se ha eliminado con éxito.",
              icon: "success"
            });
            this.obtenerSubCategoria(); 
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
