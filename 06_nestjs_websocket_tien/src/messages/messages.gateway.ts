import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer() //decorator dùng để chú thích biến server nhằm liên kết biến này với máy chủ WebSocket
  server: Server; //

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = this.messagesService.create(createMessageDto);

    if (!message.name) {
      message.name = 'anonymous';
    }
    console.log('createMessage=', message);

    this.server.emit('message', message);

    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    console.log('findAllMessages');
    return this.messagesService.findAll();
  }

  //複雑になるので、roomは１つにしている。
  @SubscribeMessage('join')
  joinRoom(
    //trích xuất giá trị từ thông điệp WebSocket gửi từ client thông qua sự kiện "tycostacsdping." 
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('join name=', name);
    return this.messagesService.identify(name, client.id);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const name = this.messagesService.getClientName(client.id);
    console.log('typing=', name);
    console.log('isTyping=', isTyping);

    // this.server.emit('typing', { name, isTyping });

    client.broadcast.emit('typing', { name, isTyping });
  }
}
