import { Repository, getCustomRepository } from "typeorm"
import { MessagesRepository } from "../infra/typeorm/repositories/MessagesRepository"
import { Message } from "../infra/typeorm/entities/Message";

interface IMessageCreate {

  admin_id?: string;

  user_id: string;

  text: string;
}

class MessagesService {
  private messagesRepository: Repository<Message>;

  constructor(){
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  async create({ admin_id, user_id, text }: IMessageCreate) {
    const message = this.messagesRepository.create({
      admin_id,
      user_id,
      text
    });

    await this.messagesRepository.save(message);

    return message;
  }

  async index(user_id: string){
    const listMessagesById = await this.messagesRepository.find({
      where: { user_id },
      relations: ["user"]
    });

    return listMessagesById;
  }
}

export { MessagesService }
