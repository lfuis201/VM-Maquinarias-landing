# Servidor web Nginx para servir el contenido estático precompilado (dist)
FROM nginx:alpine

# Copiar la carpeta dist precompilada localmente
COPY dist /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
