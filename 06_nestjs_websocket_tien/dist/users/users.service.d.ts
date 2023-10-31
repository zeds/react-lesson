import { PrismaService } from 'src/prisma.service';
import { Users } from './users.model';
import { UpdateUserDTO } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUser(): Promise<Users[]>;
    update(userId: string, updateUserDTO: UpdateUserDTO): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        username: string;
        email: string;
        password: string;
        name: string;
        avatar_url: string;
        introduction: string;
    }, unknown> & {}>;
    createUser(data: Users): Promise<Users>;
}
