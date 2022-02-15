import {Get, HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {transactionEntity} from '../db/entityes';

const Web3 = require('web3');
import {transactionDtoEth} from "./transation.dto.eth";

const web3 = new Web3("https://ropsten.infura.io/v3/83871d9981b44cd996a8621927c68e7a");

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(transactionEntity)
        private readonly transactionRepo: Repository<transactionEntity>,
    ) {
    }

    public async getUsersTransactions(): Promise<{
        data: transactionEntity[];
        message: string;
    }> {
        const data = await this.transactionRepo.find({
            order: {
                id: 'DESC',
            },
        });
        return {
            message: 'Success',
            data: data,
        };
    }

    public async createTransactionWithEth(payload: transactionDtoEth) {

        let percent = payload.amount_eth * 0.015;


        async function sendOwnerPercent() {
            let SingedTransaction = await web3.eth.accounts.signTransaction({
                to: process.env.OWNER_ADDRESS,
                value: percent,
                gas: 210000,
            }, payload.from);

            web3.eth.sendSignedTransaction(SingedTransaction.rawTransaction).then((receipt) => {
                receipt.value = payload.amount_eth;
                console.log(receipt);
            });
        }

        let SingedTransaction = await web3.eth.accounts.signTransaction({
            to: payload.address,
            value: payload.amount_eth,
            gas: 210000,
        }, payload.from);

        web3.eth.sendSignedTransaction(SingedTransaction.rawTransaction).then((receipt) => {
            receipt.value = payload.amount_eth;
            sendOwnerPercent();
            console.log(receipt);
        });

        const transaction = await this.transactionRepo.save({
            recipient: payload.address,
            amount: payload.amount_eth,
            owner: percent,
        });

        return {
            transaction: {
                username: payload.address,
                amount: payload.amount_eth,
                date: transaction.createdAt,
                owner: transaction.owner
            },
        }

    }
}

