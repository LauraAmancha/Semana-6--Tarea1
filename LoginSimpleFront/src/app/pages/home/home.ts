import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// REVISA ESTA RUTA CON TU ESTRUCTURA REAL
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html', // <--- CORREGIDO
  styleUrl: './home.css'      // <--- CORREGIDO
})
export class HomeComponent implements OnInit {
  public authService = inject(AuthService); // Público para usarlo en el HTML
  private router = inject(Router);

  nombreUsuario: string | null = '';

  ngOnInit() {
    // Rúbrica: Recuperar datos de la sesión
    this.nombreUsuario = this.authService.obtenerNombreUsuario();
  }

  salir() {
    // Rúbrica: Logout limpia la sesión
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
