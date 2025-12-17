import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'types/usersType';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    // simulate users db
    private users: User[] = [
        {
            id: 1, 
            name: 'John Doe', 
            email: 'a@a.fr',
            password: 'password1234',
            role: 'admin'
        },
        {
            id: 2, 
            name: 'Jane Doe', 
            email: 'b@b.fr',
            password: 'password1234',
            role: 'user',
        }, 
        {
            id: 3, 
            name: 'Céline Martin', 
            email: 'c@c.fr', 
            password: 'password1234',
            role: 'user'
        },
        {
            id: 4, 
            name: 'Jean Dupont', 
            email: 'd@d.fr', 
            password: 'password1234',
            role: 'user',
        }, 
        {
            id: 5, 
            name: 'Akiko Suzuki', 
            email: 'e@e.fr', 
            password: 'password1234',
            role: 'user'
        }
    ]

    // return all users from db
    findAll(): User[] {
        return this.users;
    } 

    // return one user discriminated by id from db
    findeOne(id: number): User {
        const user = this.users.find((user) => user.id === id) as User;
        if (!user) {
            // Exception that send an error message if user is not found
            throw new NotFoundException("User not found"); 
        }
        return user;
    }

    // add a new user into db, return the newly created user 
    create(createUser: CreateUserDto): User {
        // since id isn't autoincremented yet, do it manually
        const newId = this.users.length + 1;
        const newUser = {
            ...createUser, 
            id: newId,
        };
        this.users.push(newUser);
        return newUser;
    }

    // update an existing user, return the updated user
    update(id: number, updateUser: UpdateUserDto): User {
        // discriminate by id
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) {
            throw new NotFoundException("User not found")
        }
        this.users[index] = { ...updateUser, id};
        return this.users[index];
    }

    // delete an existing user, return a string
    delete(id: number): string {
        this.users = this.users.filter((user) => user.id !== id);
        return "User deleted successfully";
    }
}
