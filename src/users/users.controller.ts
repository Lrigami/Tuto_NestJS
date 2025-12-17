import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from 'types/usersType';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly userServices: UsersService) {}

    // Get request calls userServices method findAll()
    @UseGuards(AuthGuard) // to use a guard on a specific request 
    @Get()
    @HttpCode(200)
    findAll(): User[] {
        return this.userServices.findAll();
    }

    // Get request takes a parameter: id, and calls userServices method findOne()
    @Get(':id')
    @HttpCode(200)
    findOne(@Param('id', ParseIntPipe) id: number): User {
        return this.userServices.findeOne(id);
    }

    // Allows to filter collections with specific parameters
    @Get()
    @HttpCode(200)
    findAllWithQuery(
        @Query('page') page: string, 
        @Query('limit') limit: string,
    ): string {
        return `Page ${page}, limit: ${limit}`;
    }

    // Post request takes an input: user, and calls userServices method create()
    @Post()
    @HttpCode(201)
    create(@Body() createUser: CreateUserDto): User {
        return this.userServices.create(createUser);
    }

    // Patch request takes a parameter: id, and an input: user, and calls userServices method update()
    @Patch()
    @HttpCode(200)
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUser: UpdateUserDto): User {
        return this.userServices.update(id, updateUser);
    }

    // Delete request takes a parameter: id, and calls userServices method delete()
    @Delete()
    @HttpCode(200)
    delete(@Param('id', ParseIntPipe) id: number): String {
        return this.userServices.delete(id);
    }
}
