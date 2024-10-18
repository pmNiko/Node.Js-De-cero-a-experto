/**Este arvhivo debe ejecutarse antes de lanzar la app 
 * editar jest.config 
 *  setupFiles: [
 *  "<rootDir>/setupTests.ts"
 * ],
*/
import { config } from 'dotenv';


config({
    path: '.env.test'
});