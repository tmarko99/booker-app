import { GetUserArgs } from './dto/args/get-user-args.dto';
import { CreateUserInput } from './dto/input/create-user.input.dto';
import { User } from './models/user.model';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.createUser(createUserInput);
  }

  @Query(() => User, { name: 'user' })
  getUser(@Args() getUserArgs: GetUserArgs) {
    return this.userService.getUser(getUserArgs);
  }
}
