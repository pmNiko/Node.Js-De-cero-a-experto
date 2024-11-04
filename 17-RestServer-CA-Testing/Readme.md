### Rest Server Clean Architecture

<br/>

---

##### Temas puntuales de la sección

- Esta sección de testing, posiblemente es la más simple de todas,
  porque realizaremos pruebas de integración sobre nuestro servidor Rest.

- La idea es que al llamar un endpoint, obtengamos la información deseada y esperada,
  si llamamos un método de creación, estamos esperando que se cree el elemento,
  y realizaremos posteriormente las limpiezas respectivas.

- Sólo vamos a probar aquí, lo que no hemos evaluado antes,
  por lo que la sección no es tan extensa.

<br/>

---

###### Ejecución del proyecto

    1. npx prisma init --datasource-provider postgresql
    2. npx prisma generate
    3. sudo chmod 755 -R  postgres-db/
    4. npx prisma migrate dev --name init
    5. yarn test:watch
