import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSetting } from '../graphql/models/UserSettings';
import { CreateUserSettingsInput } from '../graphql/utils/createUserSettingsInput';
import { UserSettings } from './UserSettingsService';

@Resolver()
export class UserSettingsResolver {
  constructor(@Inject(UserSettings) private userSetting: UserSettings) {}
  @Mutation((returns) => UserSetting)
  createUserSettings(
    @Args('createUserSettingsData')
    createUserSettingsData: CreateUserSettingsInput,
  ) {
    return this.userSetting.createUserSetting(createUserSettingsData);
  }
}
