import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  // ⚠️ REVISA QUE ESTE PUERTO SEA EL MISMO DE TU BACKEND EN VISUAL STUDIO
  private apiUrl = 'https://localhost:7298/api/Auth';

  constructor() { }

  login(correo: string, password: string): Observable<any> {
    // 🛡️ withCredentials: true permite que el navegador acepte y guarde la cookie HttpOnly
    return this.http.post<any>(`${this.apiUrl}/login`, { correo, password }, { withCredentials: true }).pipe(
      tap(res => {
        if (res.success) {
          // Guardamos datos para la interfaz, pero la sesión real vive en la Cookie
          localStorage.setItem('usuario_nombre', res.usuario);
          localStorage.setItem('usuario_rol', res.rol);
          localStorage.setItem('sesion_activa', 'true');
        }
      })
    );
  }

  logout(): void {
    // 🧹 Avisamos al backend para que destruya la cookie
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe();

    // Limpiamos los datos locales
    localStorage.removeItem('usuario_nombre');
    localStorage.removeItem('usuario_rol');
    localStorage.removeItem('sesion_activa');
  }

  // 🔍 Nuevo método: Pregunta al Backend si la Cookie de sesión aún es válida
  verificarSesionBackend(): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}/validar`, { withCredentials: true }).pipe(
      map(res => res.valido),
      catchError(() => {
        this.logout(); // Si falla el backend, limpiamos el localStorage por seguridad
        return of(false);
      })
    );
  }

  estaLogueado(): boolean {
    return localStorage.getItem('sesion_activa') === 'true';
  }

  obtenerNombreUsuario(): string | null {
    return localStorage.getItem('usuario_nombre');
  }

  obtenerRolUsuario(): string | null {
    return localStorage.getItem('usuario_rol');
  }
}
