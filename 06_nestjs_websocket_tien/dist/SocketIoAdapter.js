"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIoAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
class SocketIoAdapter extends platform_socket_io_1.IoAdapter {
    constructor(app, configService) {
        super(app);
        this.app = app;
        this.configService = configService;
    }
    createIOServer(port, options) {
        port = this.configService.get('SOCKETIO.SERVER.PORT');
        const path = this.configService.get('SOCKETIO.SERVER.PATH');
        const origins = this.configService.get('SOCKETIO.SERVER.CORS.ORIGIN');
        const origin = origins.split(',');
        options.path = path;
        options.cors = { origin };
        const server = super.createIOServer(port, options);
        return server;
    }
}
exports.SocketIoAdapter = SocketIoAdapter;
//# sourceMappingURL=SocketIoAdapter.js.map