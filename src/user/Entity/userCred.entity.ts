import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class userCred {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;
}
