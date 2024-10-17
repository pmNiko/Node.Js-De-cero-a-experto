#### Temas puntuales de la sección

- Esta sección es para integrar las bases de datos Mongo y PostgreSQL 
en nuestra aplicación de monitoreo, puntualmente veremos:

    * Mongoose
     
    * Prisma
     
    * TypeORM (superficialmente)
     
    * Migraciones de prisma
     
    * Insertar en base de datos
     
    * Leer de base de datos
     
    * Mapeo de data a Entidades
     
    * Creación de datasources
     
    * Caso de uso nuevo, para grabar en múltiples destinos simultáneamente

[Documentación](https://mongoosejs.com/)


- Secuencia de escalado

 * instalamos y configuramos la dependencia de Mongo DB

 * Creamos el Schema y Model

 * Definimos en "infraestructure" un datasource que implemente la interfaz de "domain/datasource"