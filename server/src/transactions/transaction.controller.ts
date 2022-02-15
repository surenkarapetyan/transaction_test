import {Body, Controller, Get, HttpCode, Inject, Post, UseGuards} from '@nestjs/common';
import { transactionDiToken } from './transaction.di';
import { TransactionService } from './transaction.service';
import {transactionDtoEth} from "./transation.dto.eth";
import {JwtAuthGuard} from "../auth";

@Controller('api')
export class TransactionController {
  constructor(
    @Inject(transactionDiToken.API_TRANSACTION)
    private readonly apiTransaction: TransactionService,
  ) {}

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('transactions')
  async getUsersTransaction() {
    return this.apiTransaction.getUsersTransactions();
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('transactions')
  async createTransactionWithEth(@Body() payload: transactionDtoEth) {
    return this.apiTransaction.createTransactionWithEth(payload);
  }
}
