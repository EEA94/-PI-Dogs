const DB_USER = process.env.DB_USER || 'postgres'
const DB_PASSWORD = process.env.DB_PASSWORD || 'Elias1406'
const DB_HOST = process.env.DB_HOST || 'localhost:5432'
const DB_NAME = process.env.DB_NAME || 'dogs'
const PORT = process.env.PORT || 3001

const API_KEY = process.env.API_KEY

module.exports = {
DB_USER,
DB_PASSWORD,
DB_HOST,
DB_NAME,
PORT,
API_KEY
}
