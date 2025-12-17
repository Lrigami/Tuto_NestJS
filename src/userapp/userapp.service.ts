import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Role } from '@prisma/client';

@Injectable()
export class UserappService {
  constructor (private readonly databaseService: DatabaseService) {}

  // create user with Prisma method UserCreateInput
  create(createUser: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: createUser,
    });
  }

  // add a optionnal role parameter to filter users
  findAll(role?: Role) {
    if (role) {
      return this.databaseService.user.findMany({
        where: {
          role: role as Role,
        },
      })
    }
    return this.databaseService.user.findAll();
  }


  findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: { id },
    });
  }

  // update user with Prisma method UserUpdateInput
  update(id: number, updateUser: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: { id },
      data: updateUser,
    });
  }

  remove(id: number) {
    return this.databaseService.user.delete({
      where: { id },
    });
  }
}
