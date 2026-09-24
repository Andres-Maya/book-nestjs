import { Controller, Delete, Get, Param, Post } from '@nestjs/common';

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

    @Get(':id')
    getUserById(@Param('id') id: string) {
        console.log('.:: UserID', id);
        const user = this.users.find((user) => user.id === id);
        console.log(".:: usuario buscado: ", user);
        if (user === undefined) {
            throw new NotFoundException('Usuario con ID ${id} no existe');
        }
        if(user.id === "1") {
            throw new ForbiddenException('No tienes permisos para acceder al usuario con ID ${id}');
        }
        return user;
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

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        const position = this.users.findIndex((user) => user.id === id);
        this.users.splice(position, 1);
        return{
            msg: "Usuario eliminado correctamente", "Usuario": Unknown word.
        }
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() changes: User) {
        console.log('.:: ID usuario', id);
        console.log('.:: Cambios', changes);

        const position = this.users.findIndex((user) => user.id === id);

        if(position === -1){
            return {
                msg: 'Usuario no encontrado'
            }
        }

        const currentData = this.users[position];
        const updateUser = {
            ...currentData,
            ...changes
        };

        this.users[position] = updateUser;

        return{
            msg: 'Usuario actualizado correctamente',
            data: updateUser
        };
    }
    
}
