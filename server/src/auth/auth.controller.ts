import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { AuthDiToken } from './auth.di';
import { AuthService } from './auth.service';
import { signInDto, signUpDto } from './auth.dto';

@Controller('api')
export class AuthController {
  constructor(
    @Inject(AuthDiToken.AUTH_SERVICE) private readonly authService: AuthService,
  ) {}

  @HttpCode(200)
  @Post('login')
  async signIn(@Body() payload: signInDto) {
    return this.authService.userSignIn(payload);
  }

  @HttpCode(200)
  @Post('register')
  async signUp(@Body() payload: signUpDto) {
    return this.authService.createUser(payload);
  }
}
