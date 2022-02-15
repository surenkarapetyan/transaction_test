import { HttpException, Injectable } from '@nestjs/common';
import { userEntity } from '../db/entityes';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { signInDto, signUpDto } from './auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(userEntity)
    private readonly userRepo: Repository<userEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async userSignIn(payload: signInDto): Promise<{ message: string; data: {} }> {
    const user = await this.userRepo.findOne({
      where: {
        email: payload.email,
      },
    });

    if (user && bcrypt.compareSync(payload.password, user.password)) {
      const token = this.jwtService.sign({
        id: user.id,
        email: user.email,
        name: user.name,
      });

      return {
        message: 'Success',
        data: {
          token: token,
        },
      };
    } else {
      throw new HttpException('Invalid email or password', 401);
    }
  }

  public async createUser(
    payload: signUpDto,
  ): Promise<{ data: {}; message: string }> {
    const isExist = await this.userRepo.findOne({
      where: {
        email: payload.email,
      },
    });

    if (isExist && isExist.id) {
      throw new HttpException('User with that email already exists', 400);
    }

    payload.password = bcrypt.hashSync(payload.password, 10);

    const user = await this.userRepo.save(payload);
    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      message: 'User success registered',
      data: {
        id_token: token,
      },
    };
  }
}
