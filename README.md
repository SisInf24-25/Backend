Servidor:
- Instalar dependencias: npm install
- Iniciar servidor: npm run start
- Iniciar servidor en modo desarrollo: npm run dev

Base de datos con Docker:
- Construir las imágenes: docker-compose build
- Iniciar los contenedores: docker-compose up -d
- Detener los contenedores: docker-compose down
- Acceso a terminal de la bd: docker exec -it pg_container psql -U sisinf pg_database

Requiere un fichero .env

Algunos comandos para la bd:
- Listar DB: \l
- Usar/Seleccionar una base datos: \c dbname;
- Listar tablas: \dt
- Salir de la consola de Postgres: \q 
