import { Connection, createConnection } from 'typeorm';

const isProduction = process.env.ENVIROMENT === 'production';

const connection = async (): Promise<Connection> => {
  return createConnection({
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_HOST),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectTimeoutMS: 120000,
    migrations: [
      `./${
        isProduction ? 'dist' : 'src'
      }/database/typeorm/migrations/*.${
        isProduction ? 'js' : 'ts'
      }`,
    ],
    entities: [
      `./${
        isProduction ? 'dist' : 'src'
      }/modules/**/infra/typeorm/entities/*.${isProduction ? 'js' : 'ts'}`,
    ],
    cli: {
      migrationsDir: `./${
        isProduction ? 'dist' : 'src'
      }/database/typeorm/migrations`,
    },
  });
};

export default connection;
