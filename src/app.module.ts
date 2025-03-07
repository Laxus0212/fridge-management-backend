import {
  INestApplication,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FamiliesController } from './families/families.controller';
import { FamiliesService } from './families/families.service';
import { FamiliesModule } from './families/families.module';
import { FridgesController } from './fridges/fridges.controller';
import { FridgesService } from './fridges/fridges.service';
import { FridgesModule } from './fridges/fridges.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './messages/messages.service';
import { MessagesModule } from './messages/messages.module';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { RecipesController } from './recipes/recipes.controller';
import { RecipesService } from './recipes/recipes.service';
import { RecipesModule } from './recipes/recipes.module';
import { ShelvesController } from './shelves/shelves.controller';
import { ShelvesService } from './shelves/shelves.service';
import { ShelvesModule } from './shelves/shelves.module';
import { ShoppingListsController } from './shopping-lists/shopping-lists.controller';
import { ShoppingListsService } from './shopping-lists/shopping-lists.service';
import { ShoppingListsModule } from './shopping-lists/shopping-lists.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { Family } from './families/models/family.model';
import { Product } from './products/models/product.model';
import { Shelf } from './shelves/models/shelf.model';
import { Fridge } from './fridges/models/fridge.model';
import { Chat } from './messages/models/chat.model';
import { Recipe } from './recipes/models/recipe.model';
import { Ingredient } from './recipes/models/ingredient.model';
import { Message } from './messages/models/message.model';
import { ShoppingList } from './shopping-lists/models/shopping-list.model';
import { ShoppingListItem } from './shopping-lists/models/shopping-list-item.model';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invitation } from './families/models/invitation.model';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './users/strategies/google.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './src/users/.env',
    }),
    PassportModule.register({ defaultStrategy: 'google' }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'varadi',
      password: 'password',
      database: 'fridge_database',
      models: [
        Family,
        User,
        Product,
        Shelf,
        Fridge,
        Message,
        Chat,
        Recipe,
        Ingredient,
        ShoppingList,
        ShoppingListItem,
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([
      User,
      Family,
      Invitation,
      Product,
      Shelf,
      Fridge,
      Chat,
      Recipe,
      Ingredient,
      Message,
      ShoppingList,
      ShoppingListItem,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
    AuthModule,
    FamiliesModule,
    FridgesModule,
    MessagesModule,
    ProductsModule,
    RecipesModule,
    ShelvesModule,
    ShoppingListsModule,
  ],
  controllers: [
    AppController,
    AuthController,
    FamiliesController,
    FridgesController,
    MessagesController,
    ProductsController,
    RecipesController,
    ShelvesController,
    ShoppingListsController,
    UsersController,
  ],
  providers: [
    AppService,
    AuthService,
    FamiliesService,
    FridgesService,
    MessagesService,
    ProductsService,
    RecipesService,
    ShelvesService,
    ShoppingListsService,
    UsersService,
    GoogleStrategy,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // middleware
  }

  static configure(app: INestApplication) {
    app.enableCors({
      origin: ['http://localhost:8100', 'https://accounts.google.com'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
      ],
      exposedHeaders: ['Authorization'],
    });
  }
}
