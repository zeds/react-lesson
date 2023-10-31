import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth.module';
import { ItemsController } from './items/items.controller';
import { MessagesModule } from './messages/messages.module';
import { AppController } from './app.controller';
import { config } from 'dotenv';

export const envConfig = config().parsed;

@Module({
  imports: [UsersModule, AuthModule, MessagesModule],
  controllers: [ItemsController],
  providers: [],
})
export class AppModule {}
