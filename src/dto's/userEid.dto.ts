import{IsEmail, IsNotEmpty} from 'class-validator';
import { Unique } from 'typeorm';
   


export class userdto{
    @IsNotEmpty()
    earthId : string;

    @IsNotEmpty()
    username : string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    password: string;
}

