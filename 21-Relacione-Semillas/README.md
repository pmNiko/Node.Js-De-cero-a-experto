# Rest Project + TypeScript

Este proyecto previamente inicializado tiene todo lo necesario para trabajar con TypeScript, Express y Rest.

Cada paso de su configuración ya se ha realizado previamente en el curso, por lo que solo es necesario clonar el proyecto y comenzar a trabajar.

## Instalación

1. Clonar .env.template a .env y configurar las variables de entorno
2. Ejecutar `npm install` para instalar las dependencias
3. En caso de necesitar base de datos, configurar el docker-compose.yml y ejecutar `docker-compose up -d` para levantar los servicios deseados.
4. Ejecutar el seed
5. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo

<br/>

---

<br/>

##### Temas puntuales de la sección

- En esta sección aprenderemos a trabajar con relaciones en nuestras colecciones de Mongo y cómo podemos generar una semilla para poblar la base de datos rápidamente.

- Puntualmente veremos:

  - Una nueva forma de DTO completa

  - Validar MongoIDs

  - Crear categorías, productos y usuarios desde una semilla

  - Remover información en la serialización JSON
