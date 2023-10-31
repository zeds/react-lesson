import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Put,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  public async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDTO: UpdateUserDTO,
    @Res() response: Response,
  ) {
    try {
      const result = await this.userService.update(id, updateUserDTO);
      console.log('result=', result);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully update user!',
        result: result,
      });
    } catch (err) {
      console.log('users えらー', err);
      return response.status(500).json({
        status: 'Error!',
        // message: err.response?.message,
        message: 'あいうえお',
      });
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.userService.getAllUser();
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Ok!',
        message: 'Internal Server Error!',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-info')
  getUserInfo(@Request() req) {
    return req.user;
  }
}
