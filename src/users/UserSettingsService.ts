import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSetting } from 'src/graphql/models/UserSettings';
import { CreateUserSettingsInput } from 'src/graphql/utils/createUserSettingsInput';
import { Repository } from 'typeorm';

@Injectable()
export class UserSettings {
  constructor(
    @InjectRepository(UserSetting)
    private UserSettingRepository: Repository<UserSetting>,
    @InjectRepository(User) private userRepository:Repository<User>
  ) {}

  async createUserSetting(createUserSetting: CreateUserSettingsInput) {
    const findUser = await this.userRepository.findOneBy({
      id: createUserSetting.userId,
    });

    if (!findUser) throw new Error('User Not Found');

    const newUserSetting = this.UserSettingRepository.create(
      createUserSetting,
    );
    const savedSettings = await this.UserSettingRepository.save(
      newUserSetting,
    );

    findUser.settings = savedSettings;
    await this.userRepository.save(findUser);

    return savedSettings;
  }

  getUserSetting(userSettingId: number) {
    return this.UserSettingRepository.findOneBy({
      userId: userSettingId,
    });
  }
}
