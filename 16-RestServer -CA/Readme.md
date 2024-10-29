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
            npx prisma migrate
            yarn dev
        ```        
    * El build de producción corre la migraciones de la BD


[source](https://developer.themoviedb.org/reference/account-details)
[Prisma DB](https://www.prisma.io/)

Temas puntuales de la sección
En esta sección, nos enfocaremos a trabajar mediante el patrón repositorio y la arquitectura limpia con casos de uso.

Es una sección opcional, pero recomendada, ya que aunque es importante, no quiere decir que es la única forma de trabajar, podemos usar el repositorio, controladores o inclusive los casos de uso directamente, pero si queremos implementarla a su totalidad, aquí tienen una guía al respecto.



En la sección del testing, pueden tomar el código fuente, o bien el suyo sin haber pasado por esta sección porque haremos pruebas de integración con el servidor, lo que significa que no probaremos los casos de uso, probaremos los servicios Rest directamente.