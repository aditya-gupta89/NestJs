import { Inject, Injectable } from '@nestjs/common';
import {
  Args,
  Int,
  Query,
  ResolveField,
  Resolver,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { mockUsers } from 'src/__mock__/mockUser';
import { mockUserSettings } from 'src/__mock__/mockUserSettings';
import { User } from '../graphql/models/User';
import { UserSetting } from '../graphql/models/UserSettings';
import { CreateUserInput } from '../graphql/utils/CreateUserInput';
import { UserService } from './UserService';
import { UserSettings } from './UserSettingsService';

export let incrementalId = 3;

@Resolver((of) => User)
export class UserResolver {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(UserSettings) private userSettings: UserSettings,
  ) {}
  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUser(id);
  }
  @Query(() => [User])
  getUsers() {
    return this.userService.getUsers();
  }

  // @ResolveField((returns) => UserSetting, {
  //   name: 'settings',
  //   nullable: true,
  // })
  // getUserSettings(@Parent() user: User) {
  //   return this.userSettings.getUserSetting(user.id);
  // }

  @Mutation((returns) => User)
  createUser(
    // @Args('username') username: string,
    // @Args('displayName', { nullable: true }) displayName: string,
    @Args('createUserData') createUserData: CreateUserInput,
  ) {
    return this.userService.createUser(createUserData);
  }
}
