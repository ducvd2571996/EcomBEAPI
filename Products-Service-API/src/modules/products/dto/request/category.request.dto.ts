import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryPayloadDTO {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ApiProperty({ required: false })
  @IsOptional()
  image?: string;
}

export class UpdateCategoryPayloadDTO {
  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ApiProperty({ required: false })
  @IsOptional()
  image?: string;
}
