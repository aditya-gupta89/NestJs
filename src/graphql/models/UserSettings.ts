import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PrimaryColumn, Column, Entity } from 'typeorm';

@ObjectType()
@Entity({ name: 'user_settings' })
export class UserSetting {
  @PrimaryColumn()
  @Field((type) => Int)
  userId: number;

  @Column()
  @Field({ defaultValue: false })
  receiveNotification: boolean;

  @Column()
  @Field({ defaultValue: false })
  receiveEmails: boolean;
}
