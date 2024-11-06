import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerPayloadDTO {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  address: string;
}
