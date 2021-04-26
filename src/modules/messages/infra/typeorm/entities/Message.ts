import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { User } from '@modules/users/infra/typeorm/entities/User';

@Entity('messages')
class Message {
  @PrimaryColumn()
  id: string;

  @Column()
  admin_id: string;

  @Column()
  user_id: string;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  // RELATIONS
  @JoinColumn({ name:"user_id" })
  @ManyToOne(() => User)
  user: User;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { Message };
