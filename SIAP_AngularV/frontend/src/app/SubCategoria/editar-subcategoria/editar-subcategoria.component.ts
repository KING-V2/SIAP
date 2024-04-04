import { Component, OnInit } from '@angular/core';
import { SubCategoriaService } from '../subcategoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategoriaModel } from '../subcategoria.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-subcategoria',
  templateUrl: './editar-subcategoria.component.html',
  styleUrls: ['./editar-subcategoria.component.css']
})
export class EditarSubCategoriaComponent implements OnInit {

  id: string = '';
  subcategoria : SubCategoriaModel = new SubCategoriaModel("","",""); 

  constructor(
    private subcategoriaService: SubCategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      console.log("EDITAR");
      this.subcategoriaService.obtenerSubCategoriaPorId(this.id).subscribe(
        data => {
          if (data && data.length > 0) {
            this.subcategoria = data[0];
          }
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log("CREAR");
    }
  }

  onSubmit() {
    console.log('onSubmit');
  
    if (this.id) { 
      this.subcategoriaService.actualizarSubCategoria(this.subcategoria).subscribe(
        data => {
          console.log('Tienda actualizada correctamente:', data);
          Swal.fire({ 
            position: "center",
            icon: "success",
            title: "La tienda se ha actualizado exitosamente",
            showConfirmButton: false,
            timer: 1500
          });
          console.log('Redirigiendo a /subcategoria');
          this.router.navigate(['/subcategoria']); // Redirige de vuelta a la lista de tiendas
        },
        error => {
          console.log('Error al actualizar la tienda:', error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Hubo un error al actualizar la tienda",
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
    } else {
      console.log('crear');
      this.subcategoriaService.agregarSubCategoria(this.subcategoria).subscribe(
        data => {
          console.log('Tienda creada correctamente:', data);
          Swal.fire({ 
            position: "center",
            icon: "success",
            title: "La tienda se ha creado exitosamente",
            showConfirmButton: false,
            timer: 1500
          });
          console.log('Redirigiendo a /subcategoria');
          this.router.navigate(['/subcategoria']); 
        },
        error => {
          console.log('Error al crear la tienda:', error);
          Swal.fire({ 
            position: "center",
            icon: "error",
            title: "Hubo un error al crear la tienda",
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
    }
  }
}
