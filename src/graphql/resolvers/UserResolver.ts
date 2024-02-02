import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { mockUsers } from 'src/__mock__/mockUser';
import { User } from '../models/User';

@Resolver()
export class UserResolver {
  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return mockUsers.find((data) => data?.id === id);
  }
  @Query(() => [User])
  getUsers() {
    return mockUsers;
  }
}
