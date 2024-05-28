import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    CorreoElectronico: '',
    Contrasena: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logIn() {
  console.log(this.user);
  this.authService.singin(this.user).subscribe((res: any) => {
    console.log(res);
    if (res.token) {
      // Mensaje de éxito
      Swal.fire({
        title: '¡Éxito!',
        text: 'Inicio de sesión correcto.',
        icon: 'success',
        confirmButtonText: 'Continuar',
      }).then(() => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/bienvenido']);
      });
    } else {
      // Mensaje de error
      Swal.fire({
        title: 'Por favor llene los campos',
        text: res.message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  });
}

}
