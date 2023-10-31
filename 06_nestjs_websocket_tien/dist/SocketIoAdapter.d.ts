import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { ConfigService } from '@nestjs/config';
export declare class SocketIoAdapter extends IoAdapter {
    private app;
    private configService;
    constructor(app: INestApplicationContext, configService: ConfigService);
    createIOServer(port: number, options?: ServerOptions): any;
}
