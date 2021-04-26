import dbConnection from './typeorm';

export default class Database {
  public async init() {
    await dbConnection();
  }
}