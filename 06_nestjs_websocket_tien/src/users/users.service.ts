import { PrismaService } from 'src/prisma.service';
import { Users } from './users.model';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUser(): Promise<Users[]> {
    console.log('getAllUser()');
    const ret = this.prisma.users.findMany();
    console.log('ret=', ret);
    return ret;
  }

  async update(userId: string, updateUserDTO: UpdateUserDTO) {
    console.log('update data=', updateUserDTO);
    console.log('userId=', userId);
    const editedUser = await this.prisma.users.findUnique({
      where: { id: userId },
    });

    if (!editedUser) {
      throw new NotFoundException('User not found');
    }

    const result = await this.prisma.users.update({
      where: { id: userId },
      data: updateUserDTO,
    });
    console.log(result);

    return result;

    // return this.prisma.users.update({ where: { id }, data: updateUserDTO });
  }

  async createUser(data: Users): Promise<Users> {
    const existing = await this.prisma.users.findFirst({
      where: { OR: [{ username: data.username }, { email: data.email }] },
    });

    if (existing) {
      console.log('existing=', existing);
      throw new ConflictException(
        'そのユーザー名または、メールアドレスは登録されています。',
      );
    }

    console.log('data=', data);
    return this.prisma.users.create({
      data,
    });
  }
}
