Iniciar los servicios del contenedor: docker-compose up -d
Verificar los contenedores en ejecución: docker-compose ps
Detener los servicios del contenedor: docker-compose down
Acceder a la base de datos: docker exec -it pg_container psql -U sisinf pg_database

Listar DB: \l
Usar/Seleccionar una base datos: \c dbname;
Listar tablas: \dt
Salir de la consola de Postgres: \q 
