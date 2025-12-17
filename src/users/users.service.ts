import { Injectable } from '@nestjs/common';
import { User } from 'types/usersType';

@Injectable()
export class UsersService {
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

    findAll(): User[] {
        return this.users;
    } 

    findeOne(id: string): User {
        return this.users.find((user) => user.id === id) as User;
    }

    create(user: User): User {
        const newId = (this.users.length + 1).toString();
        const newUser = {
            ...user, 
            id: newId,
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id: String, user: User): User {
        const index = this.users.findIndex((user) => user.id === id);
        this.users[index] = user;
        return user;
    }

    delete(id: String): string {
        this.users = this.users.filter((user) => user.id !== id);
        return "User deleted successfully";
    }
}
