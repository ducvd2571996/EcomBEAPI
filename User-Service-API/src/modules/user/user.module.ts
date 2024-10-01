import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from 'src/database/repositories';
import { UserEntity } from 'src/database/entities';

@Module({
  controllers: [UserController],
  providers: [UserRepository, UserService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
