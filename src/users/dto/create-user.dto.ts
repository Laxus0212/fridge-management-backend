// create-user.dto.ts
export class CreateUserDto {
  email: string;
  username: string;
  password: string;
  familyId?: number;
}