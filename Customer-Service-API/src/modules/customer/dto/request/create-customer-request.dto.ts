import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerPayloadDTO {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  email: string;
}
