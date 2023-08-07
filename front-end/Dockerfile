# Imagen base
FROM node:latest

# Directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package.json .

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente de la aplicación
COPY . .

#Compilar la aplicacion
RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]


