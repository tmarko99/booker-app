import { User } from './models/user.model';
import { UserDocument } from './models/user.schema';
import { UsersRepository } from './users.repository';
import { CreateUserInput } from './dto/input/create-user.input.dto';
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { GetUserArgs } from './dto/args/get-user-args.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async createUser(createUserInput: CreateUserInput) {
    await this.validateCreateUserData(createUserInput);
    const userDocument = await this.userRepository.create({
      ...createUserInput,
      password: await bcrypt.hash(createUserInput.password, 10),
    });

    return this.toModel(userDocument);
  }

  async getUser(getUserArgs: GetUserArgs) {
    const userDocument = await this.userRepository.findOne(getUserArgs);

    return this.toModel(userDocument);
  }

  async validateUser(email: string, password: string) {
    const userDocument = await this.userRepository.findOne({ email });
    const isPasswordValid = await bcrypt.compare(
      password,
      userDocument.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }

    return this.toModel(userDocument);
  }

  private async validateCreateUserData(createUserData: CreateUserInput) {
    let found = true;
    try {
      await this.userRepository.findOne({ email: createUserData.email });
    } catch (err) {
      found = false;
    }

    if (found) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  private toModel(userDocument: UserDocument): User {
    return {
      _id: userDocument._id.toHexString(),
      email: userDocument.email,
    };
  }
}
