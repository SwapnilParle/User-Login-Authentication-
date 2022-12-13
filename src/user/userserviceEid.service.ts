import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { userdto } from "src/dto's/userEid.dto";
import { Repository } from "typeorm";
import { userID } from "./Entity/userID.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class userserviceEid{
    constructor(
        @InjectRepository(userID) private readonly userEidRepo : Repository<userID>
    ){}

    async registerPartner(body: userdto){
        const { earthId, username, email, phone, password} = body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        await this.userEidRepo.save({earthId ,email , username, phone, password:hashedPassword})
        return {
            success: true,
            massage: "registered"

        }
        
    }
}