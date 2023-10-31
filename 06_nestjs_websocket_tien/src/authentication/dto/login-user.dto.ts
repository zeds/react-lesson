import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @Length(5, 50)
  email: string;

  @IsString()
  @Length(6, 12)
  password: string;
}
