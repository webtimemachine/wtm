# Usa la imagen oficial de Node 20
FROM node:20

# Crea un directorio para la aplicación
WORKDIR /usr/src/app

# Copia los archivos de dependencia
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Si estás usando Nodemon, asegúrate de instalarlo globalmente
RUN npm install -g nodemon

# Copia los archivos de tu proyecto
COPY . .

# Expone el puerto que tu aplicación utiliza
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["nodemon", "index.js", "--ignore", "content.js"]
