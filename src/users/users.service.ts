import { Injectable } from '@nestjs/common';

export type User = {
    userId: number;
    username: string;
    password: string;
}

// mock data
const users: User[] = [

    {
        userId: 1,
        username: "alice",
        password: "qwerty"
    },
    {
        userId: 2,
        username: "ron",
        password: "1234"
    }
];


@Injectable()
export class UsersService {

    // in real life the service will be likely async in nature
    async findUserByName(username: string): Promise<User | undefined> {
        return users.find((user) => user.username === username)
    }
}
