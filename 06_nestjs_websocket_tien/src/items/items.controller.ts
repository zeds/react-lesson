import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateItemDTO } from './items.dto';

@Controller('/items')
export class ItemsController {
  @Post()
  createItem(@Body() createItemDTO: CreateItemDTO) {
    return 'hoge';
  }

  @Get()
  getHello() {
    return 'Hello items';
  }
}
