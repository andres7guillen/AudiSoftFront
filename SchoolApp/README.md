# SchoolApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.2.

## Development server

To start a local development server:
1. Configurar la cadena de conexión
Abre el archivo appsettings.json y actualiza la cadena de conexión con los datos de tu motor de base de datos:
{
  "ConnectionStrings": {
    "DbConnection": "Server=TU_SERVIDOR;Database=TU_BASE_DE_DATOS;User Id=TU_USUARIO;Password=TU_PASSWORD;TrustServerCertificate=True;"
  }
}

2. Ejecutar las migraciones
El proyecto utiliza Entity Framework Core para la gestión de la base de datos.
Existe una migración inicial llamada:
initApp
Para crear la base de datos en tu entorno, ejecuta el siguiente comando desde la raíz del proyecto:
* dotnet ef database update
* o desde el package console apuntando al proyecto SchoolData: Update Database
Esto aplicará automáticamente la migración y creará todas las tablas necesarias en tu base de datos.

3. Verificar la creación de la base de datos
Una vez ejecutado el comando, valida que:
La base de datos fue creada correctamente
Las tablas existen según el modelo definido


