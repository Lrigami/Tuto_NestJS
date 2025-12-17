import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString({message: 'Name must be a string'}) // check if name is a string
    @IsNotEmpty({message: 'Name is mandatory'}) // check if name is not empty
    name: string;
    @IsEmail({}, {message: "Email is not valid"})
    @IsNotEmpty({message: "Email is mandatory"})
    email: string;
    @IsString({message: "Password must be a string"})
    @IsNotEmpty({message: "Password is mandatory"})
    @MinLength(12, {message: "Password must be 12 characters in length minimum"}) // check if password is minmum 12 characters
    @IsStrongPassword({ // check if password is strong enough with parameters
    minLength: 12,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,}, {message: "Password is not strong enough"})
    password: string; 
    @IsEnum(['admin', 'user'], {message: "Role must be admin or user"})
    role?: 'admin' | 'user'
}