import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  isEmail,
} from 'class-validator';

export class RegisterUsersDto {
  @IsString()
  @Length(3, 10)
  username: string;

  @IsString()
  @Length(6, 12)
  password: string;

  @IsEmail()
  @IsString()
  @Length(5, 50)
  email: string;
}
