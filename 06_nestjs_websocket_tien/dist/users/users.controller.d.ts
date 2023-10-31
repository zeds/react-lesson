import { UsersService } from './users.service';
import { Response } from 'express';
import { UpdateUserDTO } from './dto/update-user.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    update(id: string, updateUserDTO: UpdateUserDTO, response: Response): Promise<Response<any, Record<string, any>>>;
    getAllUsers(request: Request, response: Response): Promise<any>;
    getUserInfo(req: any): any;
}
