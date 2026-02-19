Sistema de Autenticación Segura (HttpOnly Cookies) - UNIANDES 2026
Este proyecto implementa una arquitectura desacoplada para la gestión de sesiones de usuario, utilizando Cookies HttpOnly para prevenir ataques XSS y asegurar la persistencia de la sesión sin comprometer credenciales en el almacenamiento local del navegador.

Stack Tecnológico
Frontend: Angular 19 (Standalone Components, Signals & Guards).

Backend: ASP.NET Core 8 Web API.

Base de Datos: MySQL.

Seguridad: HttpOnly Cookies + CORS Policy Strict.

Características Principales
Autenticación End-to-End: Validación de credenciales contra Base de Datos MySQL.

Seguridad Avanzada: Implementación de Cookies HttpOnly (inaccesibles vía JavaScript) para el token de sesión, superando la seguridad estándar de localStorage.

Gestión de Sesión:

Persistencia de sesión segura.

Validación de estado de sesión vía Endpoint en Backend.

Cierre de sesión (Logout) con limpieza de Cookies del navegador.

Arquitectura: Separación de responsabilidades y uso de inyección de dependencias.

Guía de Instalación y Ejecución
1. Base de Datos (MySQL)
Abrir phpMyAdmin.

Crear una base de datos llamada: db_login_simple.

Importar el script SQL adjunto en la carpeta /Base_de_Datos.

2. Backend (.NET 8)
Abrir la carpeta Backend_NET en Visual Studio.

Verificar la cadena de conexión en appsettings.json.

Ejecutar el proyecto.

Puerto esperado: https://localhost:7298.

3. Frontend (Angular 19)
Abrir la carpeta Frontend_Angular en VS Code.

Instalar dependencias con el comando: npm install

Ejecutar el servidor de desarrollo: ng serve

Acceder a la dirección: http://localhost:4200

Credenciales de Prueba
Para verificar el flujo completo, utilice el usuario administrador pre-configurado en la base de datos:

Usuario: admin@correo.com

Contraseña: 12345

Verificación de Seguridad (Evidencia)
Para comprobar la implementación de Cookies HttpOnly:

Inicie sesión en la aplicación.

Abra las herramientas de desarrollador (F12).

Navegue a la pestaña Application > Cookies.

Verifique la existencia de la cookie SesionUsuario.

Confirme que la columna HttpOnly se encuentra marcada/activa.

Estructura del Proyecto
/Backend_NET: API RESTful desarrollada con .NET 8.

/Frontend_Angular: SPA desarrollada con Angular 19.

/Base_de_Datos: Script SQL para la generación del esquema.

README.md: Documentación técnica del proyecto.

Desarrollado por: Laura Grimaneza Amancha Moyón
Materia: Aplicaciones Web - UNIANDES
