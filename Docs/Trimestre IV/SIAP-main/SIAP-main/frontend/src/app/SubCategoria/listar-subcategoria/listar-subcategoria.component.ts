import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SubCategoriaModel } from '../subcategoria.model';
import { SubCategoriaService } from '../subcategoria.service';
import Swal from 'sweetalert2';
import { AlertasService } from 'src/app/alertas/alertas.service'; // Asegúrate de importar el servicio AlertasService
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-lista-subcategoria',
  templateUrl: './listar-subcategoria.component.html',
  styleUrls: ['./listar-subcategoria.component.css']
})
export class ListaSubCategoriaComponent  implements OnInit {

  subcategorias: Observable<SubCategoriaModel[]> | undefined;

  constructor(private subcategoriaService: SubCategoriaService, private alertasService: AlertasService, private authService: AuthService) { }

  ngOnInit() {
    this.obtenerSubCategoria();
  }
  
  obtenerSubCategoria() {
    if (!this.authService.isAuth()) {
      // Si el usuario no está autenticado, redirigirlo a la página de inicio de sesión
      this.authService.logout(); // Otra opción podría ser this.router.navigate(['/login']);
      return;
    }

    this.subcategoriaService.obtenerSubCategoria().subscribe(
      data => {
        console.log("Datos de subcategorías obtenidos:", data);
        this.subcategorias = of(data);
      },
      error => {
        console.error("Error al obtener las subcategorías:", error);
        if (error.status === 403) {
          // Si el backend devuelve un 403 (Permiso denegado), mostrar un mensaje de error
          Swal.fire({
            title: "Acceso denegado",
            text: "No tiene permiso para acceder a esta función.",
            icon: "error"
          });
        }
      }
    );
  }
  
  borrarSubCategoria(id: string) {
    if (!this.authService.isAuth()) {
      // Redireccionar o mostrar mensaje de error si el usuario no está autenticado
      return;
    }

    const userRole = this.authService.getUser().Rol_idRol; // Obtener el rol del usuario desde el servicio AuthService

    // Verificar permisos basados en el rol del usuario
    if (userRole === 1) {
      console.log("ID de la subcategoria a eliminar:", id);
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
              console.error("Error al eliminar subcategoria:", error);
              Swal.fire({
                title: "Error",
                text: "Hubo un error al eliminar la subcategoria. Por favor, inténtelo de nuevo más tarde.",
                icon: "error"
              });
            }
          );
        }
      });
    } else {
      // Mostrar mensaje de error o redireccionar si el usuario no tiene permisos suficientes
      console.log("Acceso denegado. Permiso insuficiente.");
    }
  }
  ngOnInitSubCategoria(): void {
    this.obtenerAlertas();
  }

  obtenerAlertas(): void {
    this.alertasService.obtenerAlertas().subscribe(
      (alertas) => {
        this.alertasService.actualizarAlertas(alertas);
      },
      (error) => {
        console.error('Error al obtener alertas:', error);
      }
    );
  }

  hayAlertas(): boolean {
    return this.alertasService.hayAlertas();
  }

  getAlertas(): any[] {
    return this.alertasService.getAlertas();
  }

}
