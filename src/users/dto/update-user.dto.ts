import { CreateUserDto } from "./create-user.dto";
import { PartialType } from "@nestjs/mapped-types";

// UpdateUserDto herits from CreateUserDto
export class UpdateUserDto extends PartialType(CreateUserDto) {}