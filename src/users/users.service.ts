import { Injectable } from '@nestjs/common';
import { User } from 'types/usersType';

@Injectable()
export class UsersService {
    // simulate users db
    private users: User[] = [
        {
            id: '1', 
            name: 'John Doe', 
            email: 'a@a.fr',
            role: 'admin'
        },
        {
            id: '2', 
            name: 'Jane Doe', 
            email: 'b@b.fr',
            role: 'user',
        }, 
        {
            id: '3', 
            name: 'Céline Martin', 
            email: 'c@c.fr', 
            role: 'user'
        },
        {
            id: '4', 
            name: 'Jean Dupont', 
            email: 'd@d.fr', 
            role: 'user',
        }, 
        {
            id: '5', 
            name: 'Akiko Suzuki', 
            email: 'e@e.fr', 
            role: 'user'
        }
    ]

    // return all users from db
    findAll(): User[] {
        return this.users;
    } 

    // return one user discriminated by id from db
    findeOne(id: string): User {
        return this.users.find((user) => user.id === id) as User;
    }

    // add a new user into db, return the newly created user 
    create(user: User): User {
        // since id isn't autoincremented yet, do it manually
        const newId = (this.users.length + 1).toString();
        const newUser = {
            ...user, 
            id: newId,
        };
        this.users.push(newUser);
        return newUser;
    }

    // update an existing user, return the updated user
    update(id: String, user: User): User {
        // discriminate by id
        const index = this.users.findIndex((user) => user.id === id);
        this.users[index] = user;
        return user;
    }

    // delete an existing user, return a string
    delete(id: String): string {
        this.users = this.users.filter((user) => user.id !== id);
        return "User deleted successfully";
    }
}
