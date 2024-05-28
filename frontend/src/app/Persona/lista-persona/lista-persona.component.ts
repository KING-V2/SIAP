import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PersonaModel } from '../../Login/persona.model';
import { PersonaService } from '../../Login/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-persona',
  templateUrl: './lista-persona.component.html',
  styleUrls: ['./lista-persona.component.css']
})
export class ListaPersonaComponent implements OnInit {

  personas: Observable<PersonaModel[]> | undefined;

  constructor(private personaService: PersonaService) { }

  ngOnInit() {
    this.obtenerPersona();
  }
  
  obtenerPersona() {
    this.personaService.obtenerPersona().subscribe(
      data => {
        console.log("Datos de persona obtenidos:", data);
        this.personas = of(data);
      },
      error => {
        console.error("Error al obtener persona:", error);
      }
    );
  }
  
  borrarPersona(id: string) {
    console.log("ID del rol a eliminar:", id);
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
        this.personaService.borrarPersona(id).subscribe(
          () => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "El registro se ha eliminado con éxito.",
              icon: "success"
            });
            this.obtenerPersona(); 
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
