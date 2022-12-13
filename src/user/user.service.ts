import { Body, Injectable } from '@nestjs/common';
//import { Response } from '@nestjs/common/decorators';
import {
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { userCred } from './Entity/userCred.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(userCred)
    private readonly userRepository: Repository<userCred>,
    private jwtService: JwtService,
  ) {}

  //Registration

  async create(body: any): Promise<any> {
    const { name, email, password } = body;
    const salt = await bcrypt.genSalt(); // installed bcrypt and imported..... salt generated by genSalt()
    // console.log(password)
    const hashedPassword = await bcrypt.hash(password, salt);
    await this.userRepository.save({ name, email, password: hashedPassword });
    return {
      success: true,
      message: 'registered',
    };
  }

  //Login

  async login(body, response: Response): Promise<string> {
    const { email, password } = body;
    console.log(email);
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new BadRequestException('email not registered');
    const verifyPwd = await bcrypt.compare(password, user.password); // comparing hashed and original password
    if (!verifyPwd) throw new BadRequestException('email password didnt match');

    console.log('::::::: varifying pwd ::::::::::::::::', verifyPwd);

    // Jwt Token
    const paylaod = {
      id: user.id,
    };
    const jwt = await this.jwtService.signAsync(paylaod, { expiresIn: '30d' });

    response.cookie('token', jwt, {
      httpOnly: true,
      expires: new Date(new Date().getTime() + 604800000),
    });
    return jwt;
  }

  // cookie generation

  async userDetails(body: any, req: Request): Promise<any> {
    try {
      console.log('hello')
      const cookie = req.cookies['token'];
      const data = this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const userDetails = await this.userRepository.findOneBy({
        id: data['id'],
      });
      return data;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  async Logout(res: Response) {
    res.clearCookie('token');
    return {
      massage: 'success',
    };
  }
}