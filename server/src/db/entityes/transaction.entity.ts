import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
    name: 'transaction',
})
export class transactionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    recipient: string;

    @Column('bigint')
    amount: number;

    @Column('bigint')
    owner: number;

    @CreateDateColumn()
    createdAt?: Date;
}
