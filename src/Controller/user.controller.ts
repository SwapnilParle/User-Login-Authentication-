import { Body, Controller, Get, Post, Res, Req , UseGuards} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport/dist';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/AuthGuard/jwt.guard';
import { JwtStrategy } from 'src/AuthGuard/jwt.Strategy';
import { UserService } from '../user/user.service';


@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
   
  ) {}


  @Post('/register')
  async register(@Body() body: any) {
    return this.userService.create(body);
  }


  @Post('/login')
  async login(@Body() body: any, @Res({ passthrough: true }) res: Response) {
    console.log('asdfghjkl');
    return this.userService.login(body, res);
  }

  @Get('/userDetails')
  @UseGuards(JwtAuthGuard)
  async userDetails(@Body() body: any, @Req() req: Request) {
    return this.userService.userDetails(body, req);
  }


  @Post('/logout')
  async Logout(@Res({ passthrough: true }) res: Response) {
    return this.userService.Logout(res);
  }
}

