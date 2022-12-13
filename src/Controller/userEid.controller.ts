import { Controller } from "@nestjs/common";
import { Body, Post } from "@nestjs/common/decorators";
import { userserviceEid } from "src/user/userserviceEid.service";

@Controller('api')
export class userEidCont{
    constructor(
        private usereidService: userserviceEid
    ){}

    @Post('resister')
    async resisterPartner(@Body() body){
        return this.usereidService.registerPartner(body)
    }
}