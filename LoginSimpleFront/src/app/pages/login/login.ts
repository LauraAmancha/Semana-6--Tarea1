import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth'; // Revisa que la ruta coincida con tu estructura

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importamos FormsModule para usar ngModel
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  correo: string = '';
  password: string = '';
  mensajeError: string = '';

  iniciarSesion() {
    this.authService.login(this.correo, this.password).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/home']); // Si todo sale bien, nos vamos al Home
        }
      },
      error: (err) => {
        this.mensajeError = "Credenciales incorrectas o servidor apagado.";
      }
    });
  }
}
