"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const serveStatic = require("serve-static");
const path = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(cors({
        origin: [app_module_1.envConfig.REDIRECT_URL, 'http://localhost:5173'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-xsrf-token'],
        exposedHeaders: ['Content-Type'],
    }));
    app.use(cookieParser());
    app.use('/files', serveStatic(path.join(__dirname, '../public/images')));
    const PORT = app_module_1.envConfig.APP_PORT;
    await app.init();
    await app.listen(PORT, () => {
        console.log(`Sever is running in http://localhost:${PORT}/`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map