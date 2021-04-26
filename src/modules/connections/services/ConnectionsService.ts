import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../infra/typeorm/entities/Connection';
import { ConnectionsRepository } from '../infra/typeorm/repositories/ConnectionsRepository';

interface IConnectionCreate {
  user_id:string;
  socket_id:string;
  admin_id?: string;
  id?: string;
}

class ConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor(){
    this.connectionsRepository = getCustomRepository(ConnectionsRepository)
  }

  async create({admin_id, user_id, socket_id , id }: IConnectionCreate){
    const connection = this.connectionsRepository.create({
      admin_id,
      user_id,
      socket_id,
      id
    });
    await this.connectionsRepository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string) {
    const connection = this.connectionsRepository.findOne({ user_id });

    return connection;
  }

  async findAllWithoutAdmin() {
    const connection = await this.connectionsRepository.find({
      where: {
        admin_id: null,
      },
      relations: ['user'],
    });
    return connection;
  }

  async findBySocketID(socket_id: string) {
    const connection = this.connectionsRepository.findOne({ socket_id });

    return connection;
  }

  async updateAdminID(user_id: string, admin_id: string) {
    await this.connectionsRepository
      .createQueryBuilder()
      .update(Connection)
      .set({ admin_id })
      .where('user_id = :user_id', {
        user_id,
      })
      .execute();
  }

}

export { ConnectionsService }
