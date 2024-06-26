import { Component, OnInit } from '@angular/core';
import { FacturacompraService } from '../facturacompra.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturacompraModel } from '../facturacompra.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-facturacompra',
  templateUrl: './editar-facturacompra.component.html',
  styleUrls: ['./editar-facturacompra.component.css']
})

export class EditarFacturacomprasComponent implements OnInit {

  id: string = '';

  facturacompra: FacturacompraModel = new FacturacompraModel('', '', '', '');

  constructor(
    private facturacompraService: FacturacompraService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      console.log("EDITAR");
      this.facturacompraService.obtenerFacturacompraPorId(this.id).subscribe(
        data => {
          if (data && data.length > 0) {
            this.facturacompra = data[0];
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
    if (this.id) { // Si hay un ID, entonces estamos editando
      this.facturacompraService.actualizarFacturacompra(this.facturacompra).subscribe(
        data => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Se ha actualizado exitosamente",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/facturacompra']);
        },
        error => {
          console.log(error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Hubo un error al actualizar",
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
    } else { // Si no hay un ID, entonces estamos creando
      console.log('crear');
      this.facturacompraService.agregarFacturacompra(this.facturacompra).subscribe(
        data => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Se ha creado exitosamente",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/facturacompra']);
        },
        error => {
          console.log(error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Hubo un error al crear",
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
    }
  }
}
