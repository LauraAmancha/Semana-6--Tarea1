using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using System.Data;

namespace LoginSimple.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly string connectionString;

        public AuthController(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // 1. Validación de datos faltantes (400)
            if (string.IsNullOrEmpty(request.Correo) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "Faltan datos requeridos." });
            }

            // 2. Validación de credenciales
            if (request.Correo == "admin@correo.com" && request.Password == "12345")
            {
                // 🍪 CONFIGURACIÓN DE LA COOKIE (Nivel Seguridad Máxima)
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,    // Bloquea acceso desde JavaScript (Angular no puede verla)
                    Secure = true,      // Solo viaja por HTTPS
                    SameSite = SameSiteMode.None, // Requerido para comunicación entre diferentes puertos (4200 a 7298)
                    Expires = DateTime.Now.AddMinutes(20) // La sesión expira en 20 min
                };

                // Insertamos la cookie en la respuesta
                Response.Cookies.Append("SesionUsuario", "Deko Admin", cookieOptions);

                return Ok(new
                {
                    success = true,
                    usuario = "Deko Admin",
                    rol = "Administrador",
                    mensaje = "Cookie inyectada correctamente"
                });
            }

            return Unauthorized(new { message = "Credenciales incorrectas." });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Para cerrar sesión, eliminamos la cookie expirándola
            Response.Cookies.Delete("SesionUsuario", new CookieOptions
            {
                SameSite = SameSiteMode.None,
                Secure = true
            });
            return Ok(new { message = "Sesión cerrada y cookie eliminada" });
        }

        // Endpoint para que Angular pregunte si el usuario sigue logueado
        [HttpGet("validar")]
        public IActionResult ValidarSesion()
        {
            if (Request.Cookies.TryGetValue("SesionUsuario", out string nombreUsuario))
            {
                return Ok(new { valido = true, usuario = nombreUsuario });
            }
            return Unauthorized(new { valido = false, message = "No hay sesión activa" });
        }
    }

    public class LoginRequest
    {
        public string Correo { get; set; }
        public string Password { get; set; }
    }
}