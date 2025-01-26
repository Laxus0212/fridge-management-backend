import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ShoppingListsService } from './shopping-lists.service';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { ShoppingListItemDto } from './dto/shopping-list-item.dto';

@Controller('shopping-lists')
export class ShoppingListsController {
  constructor(private readonly shoppingListsService: ShoppingListsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createShoppingListDto: CreateShoppingListDto) {
    return this.shoppingListsService.create(createShoppingListDto);
  }

  @Get()
  findAll() {
    return this.shoppingListsService.findAll();
  }

  @Get(':listId')
  async findOne(@Param('listId') listId: number) {
    const shoppingList = await this.shoppingListsService.findOne(listId);
    if (!shoppingList) {
      throw new NotFoundException(`Shopping list with ID ${listId} not found`);
    }
    return shoppingList;
  }

  @Put(':listId')
  update(
    @Param('listId') listId: number,
    @Body() updateShoppingListDto: UpdateShoppingListDto,
  ) {
    return this.shoppingListsService.update(listId, updateShoppingListDto);
  }

  @Delete(':listId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('listId') listId: number) {
    return this.shoppingListsService.remove(listId);
  }

  @Post(':listId/items')
  @HttpCode(HttpStatus.CREATED)
  addItemToList(
    @Param('listId') listId: number,
    @Body() itemDto: ShoppingListItemDto,
  ) {
    return this.shoppingListsService.addItemToList(listId, itemDto);
  }

  @Put(':listId/items/:itemId')
  updateItem(
    @Param('listId') listId: number,
    @Param('itemId') itemId: number,
    @Body() itemDto: ShoppingListItemDto,
  ) {
    return this.shoppingListsService.updateItem(listId, itemId, itemDto);
  }

  @Delete(':listId/items/:itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeItem(@Param('listId') listId: number, @Param('itemId') itemId: number) {
    return this.shoppingListsService.removeItem(listId, itemId);
  }

  @Get(':ownerId/user-shopping-lists')
  getListsByUserId(@Param('ownerId') ownerId: number) {
    return this.shoppingListsService.getListsByUserId(ownerId);
  }
}
