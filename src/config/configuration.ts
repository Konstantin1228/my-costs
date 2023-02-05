export default () => ({
    database: {
        url: process.env.SERVER_URL,
        name: process.env.DB_NAME
    }
})