Sistema de Autenticación Segura (HttpOnly Cookies) - UNIANDES 2026

Este proyecto implementa una arquitectura desacoplada para la gestión de sesiones de usuario, utilizando Cookies HttpOnly para prevenir ataques XSS y asegurar la persistencia de la sesión sin comprometer credenciales en el almacenamiento local del navegador.

Repositorio oficial:
https://github.com/LauraAmancha/Semana-6--Tarea1


Stack Tecnológico

Frontend: Angular 19 (Standalone Components, Signals & Guards)

Backend: ASP.NET Core 8 Web API

Base de Datos: MySQL

Seguridad: HttpOnly Cookies + CORS Policy Strict


Características Principales

Autenticación End-to-End:
Validación de credenciales contra Base de Datos MySQL.

Seguridad Avanzada:
Implementación de Cookies HttpOnly (inaccesibles vía JavaScript) para el token de sesión.

Gestión de Sesión:

- Persistencia de sesión segura
- Validación de estado de sesión vía Endpoint en Backend
- Cierre de sesión (Logout) con limpieza de Cookies del navegador

Arquitectura:

Separación de responsabilidades y uso de inyección de dependencias.


Guía de Instalación y Ejecución

1. Base de Datos (MySQL)

Abrir phpMyAdmin

Crear una base de datos llamada:
db_login_simple

Importar el script SQL incluido en el proyecto


2. Backend (.NET 8)

Abrir la carpeta LoginSimple en Visual Studio

Verificar la cadena de conexión en:
appsettings.json

Ejecutar el proyecto

Puerto esperado:
https://localhost:7298


3. Frontend (Angular 19)

Abrir la carpeta LoginSimpleFront en Visual Studio Code

Instalar dependencias:

npm install

Ejecutar el servidor:

ng serve

Abrir en el navegador:

http://localhost:4200


Credenciales de Prueba

Usuario:
admin@correo.com

Contraseña:
12345


Verificación de Seguridad

1. Iniciar sesión en la aplicación
2. Presionar F12
3. Ir a Application > Cookies
4. Verificar la cookie SesionUsuario
5. Confirmar que HttpOnly está activo


Estructura del Proyecto

LoginSimple/           → Backend ASP.NET Core 8
LoginSimpleFront/      → Frontend Angular 19
db_login_simple.sql    → Script de Base de Datos
LoginSimple.sln        → Solución del Backend
README.txt             → Documentación del proyecto


Desarrollado por:
LauraAmancha

Materia:
Aplicaciones Web - UNIANDES

Año:
2026
