import { getCustomRepository, Repository } from "typeorm";
import { SettingsRepository } from "../infra/typeorm/repositories/SettingsRepository"
import { Setting } from "../infra/typeorm/entities/Setting";
interface ISettingsCreate {
  chat: boolean,
  username: string
}

class SettingService {
  private settingsRepository: Repository<Setting>;

  constructor(){
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

 async create({chat, username}: ISettingsCreate){
  const userAlreadyExists = await this.settingsRepository.findOne({username});

  if(userAlreadyExists){
    throw new Error("User already exists.");
  }

  const setting = this.settingsRepository.create({
    chat,
    username
  });

  await this.settingsRepository.save(setting);

  return setting;
 }

 async findByUsername(username:string){
   const setting = await this.settingsRepository.findOne({username});

   return setting
 }
 async update(username: string, chat: boolean){
  await this.settingsRepository.createQueryBuilder()
  .update(Setting)
  .set({ chat })
  .where("username = :username", {
    username
  }).execute();
 }
}

export { SettingService }
