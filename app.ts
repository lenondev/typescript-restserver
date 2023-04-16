import dotenv from 'dotenv';
import Server from './models/server';

// Configuración del dotenv.
dotenv.config();


const server = new Server();

server.listen();
