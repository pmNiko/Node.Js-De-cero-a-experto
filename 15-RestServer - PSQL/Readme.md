####  REST Server

----

###### Puesta en marcha 


- Dev
    * Clonar el repositorio
    * Definir las variables de entorno en el .env
    * correr el docker compose
        ```sh
            docker compose up -d
        ```
    * Poner a correr el proyecto con el comando 
        ```sh
            yarn dev
        ```        
    * El build de producción corre la migraciones de la BD


[source](https://developer.themoviedb.org/reference/account-details)
[Prisma DB](https://www.prisma.io/)