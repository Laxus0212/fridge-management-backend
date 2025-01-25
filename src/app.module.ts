import { Module } from '@nestjs/common';
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

@Module({
  imports: [AuthModule, FamiliesModule, FridgesModule, MessagesModule, ProductsModule, RecipesModule, ShelvesModule, ShoppingListsModule, UsersModule],
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
  providers: [AppService, AuthService, FamiliesService, FridgesService, MessagesService, ProductsService, RecipesService, ShelvesService, ShoppingListsService, UsersService],
})
export class AppModule {}
