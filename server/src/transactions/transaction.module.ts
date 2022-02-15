import { Module } from '@nestjs/common';
import { DbModule } from '../db';
import { transactionDiToken } from './transaction.di';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import {CurrentUserService} from "../auth/auth.jwtDecode";
import {JwtStrategy} from "../auth/jwt.strategy";
import {AuthModule} from "../auth";

@Module({
  imports: [DbModule,AuthModule],
  providers: [
    {
      provide: transactionDiToken.API_TRANSACTION,
      useClass: TransactionService,
    },
      CurrentUserService,
      JwtStrategy
  ],
  controllers: [TransactionController],
})
export class TransactionModule {}
