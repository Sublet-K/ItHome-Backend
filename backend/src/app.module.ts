import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as passport from 'passport';
import * as _FileStore from 'session-file-store';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { ReservationModule } from './modules/reservation/reservation.module';
import { RequestModule } from './modules/request/request.module';
import { EventsModule } from './modules/events/events.module';
import { TestModule } from './test/test.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    AppModule,
    UserModule,
    AuthModule,
    PostModule,
    CacheModule.register({
      ttl: 300000, // 데이터 캐싱 시간(밀리 초 단위)
      max: 100, // 최대 캐싱 개수
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public_user'),
      serveRoot: '/public_user',
    }),
    ConfigModule.forRoot(),
    ReservationModule,
    RequestModule,
    EventsModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(passport.initialize(), passport.session()).forRoutes('*');
  }
}
