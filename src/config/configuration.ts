export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV,

  database: {
    port: process.env.DATABASE_PORT,
    name: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNMAE,
    password: process.env.DATABASE_PASSWORD,
  },
});
