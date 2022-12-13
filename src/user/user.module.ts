import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '../Controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userCred } from './Entity/userCred.entity';
import { JwtModule } from '@nestjs/jwt';
import { userserviceEid } from './userserviceEid.service';
import { userID } from './Entity/userID.entity';
import { userEidCont } from 'src/Controller/userEid.controller';
import { JwtAuthGuard } from 'src/AuthGuard/jwt.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/AuthGuard/jwt.Strategy';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([userCred,userID]),
    JwtModule.register({ secret: 'secret' })

  ],
  controllers: [UserController,userEidCont],
  providers: [userserviceEid,UserService,JwtAuthGuard, JwtStrategy]
})
export class UserModule {}
