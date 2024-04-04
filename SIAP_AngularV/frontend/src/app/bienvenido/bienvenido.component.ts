import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent {
  constructor(private router: Router) {}

  irANuevaPagina() {
    this.router.navigate(['/bienvenido']); // Redirige a la página 'bienvenido'
  }
}
