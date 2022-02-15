import { Module } from '@nestjs/common';
import { DbModule } from './db';
import { TransactionModule } from './transactions/transaction.module';
import {AuthModule} from "./auth";

@Module({
  imports: [DbModule,TransactionModule,AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
