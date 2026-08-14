# Guía de Despliegue y Reconstrucción Docker (Frontend)

Esta guía detalla los pasos para actualizar el código en el servidor de producción (`5.78.176.220`) y reconstruir el contenedor Docker del frontend (`landing-web-sistematizate`).

---

## Paso 1: Conectarse al Servidor
Abre tu terminal y conéctate al servidor vía SSH:
```bash
ssh root@5.78.176.220
```

---

## Paso 2: Ir al Directorio del Proyecto
Navega a la carpeta donde está clonado el repositorio (ajusta la ruta si es diferente en tu servidor):
```bash
cd /var/www/sistematizate/landing/sistematizateLanding
# o la ruta correspondiente en el servidor
```

---

## Paso 3: Traer los Últimos Cambios (Git Pull)
Para obtener los cambios más recientes que hayas subido a tu repositorio remoto (GitHub, GitLab, etc.):
```bash
git pull origin main
```
*Nota: Si estás trabajando en otra rama, reemplaza `main` por el nombre de tu rama.*

---

## Paso 4: Reconstruir el Contenedor Docker
Dado que el proyecto utiliza `docker-compose.yml` para gestionar el servicio `nginx-landing`, puedes reconstruir y reiniciar la aplicación en segundo plano con una sola instrucción:

### Comando Recomendado:
```bash
docker compose down && docker compose up -d --build
```

### Explicación de los parámetros:
*   `down`: Detiene y elimina de forma limpia el contenedor anterior, liberando el nombre para evitar conflictos de recreación.
*   `up`: Inicia los servicios definidos en el `docker-compose.yml`.
*   `-d`: Ejecuta el contenedor en segundo plano (detached mode), liberando la consola.
*   `--build`: Fuerza la reconstrucción de la imagen Docker leyendo el archivo `Dockerfile` antes de iniciar el contenedor.

---

## Paso 5: Verificar que todo esté en Orden

### 1. Comprobar que el contenedor está activo:
```bash
docker compose ps
```
Deberías ver el contenedor `landing-web-sistematizate` con el estado `Up`.

### 2. Ver los logs en tiempo real (para asegurar que no hay errores):
```bash
docker compose logs -f nginx-landing
```
*(Presiona `Ctrl + C` para salir de la visualización de logs).*
