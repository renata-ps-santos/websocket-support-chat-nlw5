import { getCustomRepository, Repository } from "typeorm";
import { UsersRepository } from "../infra/typeorm/repositories/UsersRepository"
import { User } from "../infra/typeorm/entities/User";

class UserService {
  private usersRepository: Repository<User>;

  constructor(){
    this.usersRepository = getCustomRepository(UsersRepository);
  }

 async create(email: string){
  const userAlreadyExists = await this.usersRepository.findOne({ email });

  if(userAlreadyExists){
    throw new Error("User already exists.");
  }

  const user = this.usersRepository.create({
    email
  });

  await this.usersRepository.save(user);

  return user;
 }

 async findByEmail(email: string) {
  const user = await this.usersRepository.findOne({ email });

  return user;
}
}

export { UserService }
