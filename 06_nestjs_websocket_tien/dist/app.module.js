"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.envConfig = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./authentication/auth.module");
const items_controller_1 = require("./items/items.controller");
const messages_module_1 = require("./messages/messages.module");
const dotenv_1 = require("dotenv");
exports.envConfig = (0, dotenv_1.config)().parsed;
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, auth_module_1.AuthModule, messages_module_1.MessagesModule],
        controllers: [items_controller_1.ItemsController],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map