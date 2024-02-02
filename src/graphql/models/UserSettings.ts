import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserSetting {
  @Field((type) => Int)
  userId: number;

  @Field({ defaultValue: false })
  receiveNotification: boolean;

  @Field({ defaultValue: false })
  receiveEmails: boolean;
}
