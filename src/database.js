import mysql from "mysql2/promise";

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Cambia esto si tienes una contraseña para tu base de datos
    database: 'biblioteca'
});

export { pool };
