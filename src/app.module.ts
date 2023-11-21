import { Module } from '@nestjs/common';
import { DeckController } from './deck.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DeckModule } from './services/deck/deck.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URI, {
      dbName: process.env.DATABASE_NAME,
      auth: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
      },
    }),
    DeckModule,
  ],
  controllers: [DeckController],
  providers: [],
})
export class AppModule {}
