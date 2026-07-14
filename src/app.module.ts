import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './shared/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, DatabaseModule, AuthModule, CategoriesModule],
  controllers: [],
  providers: [
    {provide: 'APP_GUARD', useClass: AuthGuard}
  ],
})
export class AppModule {}
