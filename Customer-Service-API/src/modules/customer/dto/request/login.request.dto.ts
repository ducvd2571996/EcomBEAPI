import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginPayloadDTO {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;
}
