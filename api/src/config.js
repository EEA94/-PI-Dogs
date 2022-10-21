const DB_USER = process.env.DB_USER || 'postgres'
const DB_PASSWORD = process.env.DB_PASSWORD || 'Elias1406'
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_NAME = process.env.DB_NAME || 'dogs'
const DB_PORT = process.env.PORT || 5432
const PORT_ACCESS = process.env.PORT_ACCESS || 3005

const API_KEY = process.env.API_KEY

module.exports = {
DB_USER,
DB_PASSWORD,
DB_HOST,
DB_NAME,
DB_PORT,
PORT_ACCESS,
API_KEY
}
