import express, { Application } from 'express';

import userRoutes from '../routes/usuarios.routes';
import cors from 'cors';
import db from '../database/connection';


export class Server {

    private app: Application;
    private port: string;
    private apiPath = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        
        // Conexión a base de datos MySQL.
        this.dbConnection();
        // Definición de middlewares
        this.middlewares();
        // Definición de rutas del servidor.
        this.routes();

    }
    
    // TODO: database config.
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online.');
            
            
        } catch (error) {
            return 'Unable to connect to the database: '+ error;
        }
    }

    middlewares(){
        
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body de mis peticiones
        this.app.use(express.json());

        // Carpeta pública
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use( this.apiPath.usuarios,  userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server is running on port: '+ this.port);
            
        });
    }

}

export default Server;