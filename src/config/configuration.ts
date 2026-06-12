export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),

  nodeEnv: process.env.NODE_ENV,

  database: {
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    name: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
