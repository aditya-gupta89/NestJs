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
import { User } from '../models/User';
import { UserSetting } from '../models/UserSettings';
import { CreateUserInput } from '../utils/CreateUserInput';

export let incrementalId = 3;

@Resolver((of) => User)
export class UserResolver {
  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return mockUsers.find((data) => data?.id === id);
  }
  @Query(() => [User])
  getUsers() {
    return mockUsers;
  }

  @ResolveField((returns) => UserSetting, {
    name: 'settings',
    nullable: true,
  })
  getUserSettings(@Parent() user: User) {
    return mockUserSettings.find((settings) => settings.userId === user.id);
  }

  @Mutation((returns) => User)
  createUser(
    // @Args('username') username: string,
    // @Args('displayName', { nullable: true }) displayName: string,
    @Args('createUserData') createUserData: CreateUserInput,
  ) {
    const { username, displayName } = createUserData;
    const newUser = { username, displayName, id: ++incrementalId };
    mockUsers.push(newUser);
    return newUser;
  }
}
