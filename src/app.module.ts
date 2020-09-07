import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';


import { MONGO_URI } from './environments'

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI),
    GraphQLModule.forRoot({}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
