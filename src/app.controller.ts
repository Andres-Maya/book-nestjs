import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    const myVar = this.configService.get('MY_VAR', { infer: true });
    const message = this.appService.getHello();
    return `${message} - MY_VAR: ${myVar}`;
  }
}
