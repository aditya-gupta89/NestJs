import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { mockUserSettings } from 'src/__mock__/mockUserSettings';
import { UserSetting } from '../models/UserSettings';
import { CreateUserSettingsInput } from '../utils/createUserSettingsInput';

@Resolver()
export class UserSettingsResolver {
  @Mutation((returns) => UserSetting)
  createUserSettings(
    @Args('createUserSettingsData')
    createUserSettingsData: CreateUserSettingsInput,
  ) {
    mockUserSettings.push(createUserSettingsData);
    return createUserSettingsData;
  }
}
