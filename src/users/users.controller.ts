import { Controller, Get, Param, Post } from '@nestjs/common';

interface User {
    id: string;
    name: string;
    correo: string;
}

@Controller('users')
export class UsersController {
    private users: User[] = [
        {
            id: '1',
            name: 'Mario',
            correo: 'mario@gmail.com'
        },
        {
            id: '2',
            name: 'Rosa',
            correo: 'rosa@gmail.com'
        },
        {
            id: '3',
            name: 'Juan',
            correo: 'juan@gmail.com'
        }
    ]

    @Get()
    getUsers() {
        return this.users;
    }

    @Get('id/:id')
    getUserById(@Param('id') id: string) {
        console.log('.:: UserID', id);
        const data = this.users.find((user) => user.id === id);
        console.log(".:: data: ", data);
        return data;
    }

    @Get('search/:name')
    getUserByName(@Param('name') name: string) {
        const data = this.users.find((user) => user.name === name);
        return data?.correo;
    }
    
    @Post()
    createUser(@Body() user: User) {
        console.log('.:: user', user)
        this.users.push(user);
        return {
            msg: "Usuario creado correctamente",    "Usuario": Unknown word.
            data: user
        }
    }
    
}
