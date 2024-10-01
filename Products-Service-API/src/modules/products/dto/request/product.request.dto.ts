import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePosProductPayloadDTO {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ApiProperty()
  image: string;

  @IsString()
  @ApiProperty({ required: false })
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  tax: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  categoryIds: number[];
}

export class GetProductListPayloadDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  maxResultCount: number;

  @ApiProperty({ required: false })
  @IsOptional()
  skipCount: number;

  @ApiProperty({ required: false })
  @IsOptional()
  keyword: string;
}
