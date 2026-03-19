import { DataSource } from 'typeorm';
import { Todo } from './entity/Todo';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_URL || './dev.db',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: false,
  entities: [Todo],
  subscribers: [],
  migrations: [],
});

let initialized = false;

export async function initializeDataSource() {
  if (!initialized) {
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      initialized = true;
      console.log('Data Source has been initialized!');
    } catch (err) {
      console.error('Error during Data Source initialization:', err);
      throw err;
    }
  }
  return AppDataSource;
}

export default AppDataSource;
