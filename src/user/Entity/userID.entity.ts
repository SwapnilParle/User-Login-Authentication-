import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class userID{
    @PrimaryGeneratedColumn()
    id : string;

    @Column()
    earthId : string;

    @Column()
    username : string;

    @Column({unique:true})
    email: string;

    @Column({unique:true})
    phone: string;

    @Column()
    password : string;

}