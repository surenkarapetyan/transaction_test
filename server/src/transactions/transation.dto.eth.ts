import {
    IsNotEmpty,
    IsString,
    Validate,
} from 'class-validator';
import { Empty } from '../empty.customValidation';

export class transactionDtoEth {
    @IsNotEmpty()
    @Validate(Empty, { message: 'full_name is required' })
    full_name:string

    @IsNotEmpty()
    @IsString()
    @Validate(Empty, { message: 'Amount is required' })
    amount_eth: number;

    @IsNotEmpty()
    @Validate(Empty, { message: 'From is required' })
    from:string;

    @IsNotEmpty()
    @Validate(Empty, { message: 'Address is required' })
    address: string;
}
