### Temas puntuales de la sección

- Esta es nuestra primera (de varias) secciones de pruebas, 
    se que muchos no les interesa el testing, pero quiero mencionarles 
    que es muy importante y también hay personas que toman este curso 
    únicamente porque tiene un testing extensivo.



- Esta sección tiene por objetivo comprender lo siguiente:

    * ¿Qué es el testing automático?
     
    * ¿Por qué es importante?
     
    * Jest testing library
     
    * Configuraciones Node + TS + Jest
     
    * Pruebas en todos los archivos realizados en la sección anterior
    
    * Coverage - Cobertura  del testing


---- 

# Pasos para configurar Jest con TypeScript, en Node 

Documentación [oficial sobre Jest](https://jestjs.io/docs/getting-started)


1. Instalaciones de desarrollo (super test es útil para probar Express)
```
npm install -D jest @types/jest ts-jest supertest
```

2. Crear archivo de configuración de Jest
```
npx jest --init
```

3. En el archivo **jest.config.js** configurar
```
preset: 'ts-jest',
testEnvironment: "jest-environment-node",

// Opcional - The paths to modules that run some code to configure or set up the testing environment before each test
// setupFiles: ['dotenv/config'],
```

4. Crear scripts en el **package.json**
```
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage",
```