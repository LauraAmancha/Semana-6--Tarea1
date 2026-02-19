namespace LoginSimple
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // 1. CONFIGURACIÓN DE SERVICIOS
            // Se define la política CORS "PermitirAngular"
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("PermitirAngular",
                    policy => policy.WithOrigins("http://localhost:4200") // Solo permite tu app Angular
                                    .AllowAnyMethod()
                                    .AllowAnyHeader()
                                    .AllowCredentials()); // Obligatorio para manejo de sesiones/cookies
            });

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // 2. CONFIGURACIÓN DEL PIPELINE (EL ORDEN IMPORTA)
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // ⚠️ IMPORTANTE: UseCors debe ir ANTES de UseAuthorization
            app.UseCors("PermitirAngular");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}