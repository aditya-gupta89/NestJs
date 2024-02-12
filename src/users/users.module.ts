import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSetting } from 'src/graphql/models/UserSettings';
import { UserResolver } from './UserResolver';
import { UserService } from './UserService';
import { UserSettingsResolver } from './userSettingsResolver';
import { UserSettings } from './UserSettingsService';

@Module({
  imports: [TypeOrmModule.forFeature([User,UserSetting])],
  providers: [UserResolver, UserService, UserSettingsResolver, UserSettings],
})
export class UsersModule {}
