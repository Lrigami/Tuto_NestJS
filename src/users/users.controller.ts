import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from 'types/usersType';

@Controller('users')
export class UsersController {
    constructor(private readonly userServices: UsersService) {}

    // Get request calls userServices method findAll()
    @Get()
    @HttpCode(200)
    findAll(): User[] {
        return this.userServices.findAll();
    }

    // Get request takes a parameter: id, and calls userServices method findOne()
    @Get(':id')
    @HttpCode(200)
    findOne(@Param('id') id: string): User {
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
    create(@Body() user: User): User {
        return this.userServices.create(user);
    }

    // Patch request takes a parameter: id, and an input: user, and calls userServices method update()
    @Patch()
    @HttpCode(200)
    update(@Param('id') id: string, @Body() user: User): User {
        return this.userServices.update(id, user);
    }

    // Delete request takes a parameter: id, and calls userServices method delete()
    @Delete()
    @HttpCode(200)
    delete(@Param('id') id: string): String {
        return this.userServices.delete(id);
    }
}
