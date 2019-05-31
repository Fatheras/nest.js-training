import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { HelloService } from '../services/hello.service';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getAllHellos(): any {
    return this.helloService.getAllHellos();
  }

  @Get(':id')
  getHello(@Param() params): string {
    const id: number = params.id;
    return this.helloService.getHello(id);
  }

  @Post()
  postHello(@Body() body: any): string {
    const hello: string = body.greeting;
    return this.helloService.postHello(hello);
  }

  @Put(':id')
  putHello(@Param() params, @Body() body: any): string {
    const id: number = params.id;
    const hello: string = body.greeting;
    return this.helloService.putHello(id, hello);
  }

  @Delete(':id')
  deleteHello(@Param() params): string {
    const id: number = params.id;
    return this.helloService.deleteHello(id);
  }
}
