import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import type { UserPayload } from 'src/types/user-payload';
import { FindOptionsSelect, Repository } from 'typeorm';
import { AddEmployeeDto } from './dto/addEmployee.dto';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from './entities/user.entity';
import { RegisterUserEvnet } from './events/user.envent';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async register(registerDto: RegisterDto) {
    let newUser, saved;

    try {
      newUser = this.userRepo.create({
        ...registerDto,
        company: { id: registerDto.companyId },
      });
      saved = await this.userRepo.save(newUser);
    } catch (error) {
      if (error && error['code'] == '23505') {
        throw new BadRequestException('Company already exists');
      }
    }

    this.eventEmitter.emit('user.register', new RegisterUserEvnet(saved.id));

    return {
      id: saved.id,
      email: saved.email,
    };
  }

  async findUser(
    email: string,
    isNeedPassword: boolean = false,
    relations: boolean = false,
  ) {
    const select: FindOptionsSelect<UserEntity> = {
      email: true,
      id: true,
      role: true,
      createdAt: true,
      deletedAt: true,
      password: isNeedPassword,
      name: true,
      updatedAt: true,
      company: false,
    };
    return await this.userRepo.findOne({
      where: {
        email: email,
      },
      select,
      relations: {
        company: relations,
      },
    });
  }

  async addEmployee(addEmployeeDto: AddEmployeeDto, user: UserPayload) {
    const company = (await this.findUser(user.user.email, false, true))
      ?.company;
    const newUser = await this.register({
      ...addEmployeeDto,
      companyId: company?.id,
    });

    return {
      newUser,
    };
  }
}
