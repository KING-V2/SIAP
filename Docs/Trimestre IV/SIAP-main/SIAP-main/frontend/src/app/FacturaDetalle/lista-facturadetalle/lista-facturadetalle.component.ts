import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FacturaDetalleModel } from '../facturadetalle.model';
import { FacturaDetalleService } from '../factura-detalle.service';
import Swal from 'sweetalert2'
import { AlertasService } from 'src/app/alertas/alertas.service'; // Asegúrate de importar el servicio AlertasService

@Component({
  selector: 'app-lista-facturadetalle',
  templateUrl: './lista-facturadetalle.component.html',
  styleUrls: ['./lista-facturadetalle.component.css']
})

export class ListaFacturaDetalleComponent implements OnInit {

  facturadetalles: Observable<FacturaDetalleModel[]> | undefined;

  constructor(private facturadetalleService: FacturaDetalleService, private alertasService: AlertasService) { }

  ngOnInit() {
      this.facturadetalles = this.facturadetalleService.obtenerFacturaDetalle();
      
  }

  borrarFacturaDetalle(id: string) {
    this.facturadetalleService.borrarFacturaDetalle(id).subscribe(data => {
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

  ngOnInitFacturaDetalle(): void {
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
