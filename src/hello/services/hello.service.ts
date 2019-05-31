import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  private helloArray: string[] = ['Hello World!', 'Hello?', 'Hi', 'Welcome'];

  getAllHellos(): string[] {
    return this.helloArray;
  }

  getHello(id: number): string {
    return this.helloArray[id];
  }

  postHello(newHello: string): string {
    const wasPushed: boolean = !!this.helloArray.push(newHello);
    return wasPushed ? 'New Hello message was successfully pushed' : 'Something went wrong';
  }

  putHello(id: number, newHello: string): string {
    this.helloArray[id] = newHello;
    return 'Hello messages were updated';
  }

  deleteHello(id: number): string {
    const wasRemoved = this.helloArray.splice(id, 1);
    return wasRemoved ? 'Hello message was successfully removed' : 'Something went wrong';
  }
}
