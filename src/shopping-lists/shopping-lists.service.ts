import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingList } from './models/shopping-list.model';
import { ShoppingListItem } from './models/shopping-list-item.model';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { ShoppingListItemDto } from './dto/shopping-list-item.dto';

@Injectable()
export class ShoppingListsService {
  constructor(
    @InjectModel(ShoppingList)
    private readonly shoppingListModel: typeof ShoppingList,
    @InjectModel(ShoppingListItem)
    private readonly shoppingListItemModel: typeof ShoppingListItem,
  ) {}

  async create(
    createShoppingListDto: CreateShoppingListDto,
  ): Promise<ShoppingList> {
    const shoppingList = await this.shoppingListModel.create(
      createShoppingListDto as Partial<CreateShoppingListDto>,
    );
    return shoppingList;
  }

  async findAll(): Promise<ShoppingList[]> {
    return this.shoppingListModel.findAll({ include: [ShoppingListItem] });
  }

  async findOne(listId: number): Promise<ShoppingList> {
    const shoppingList = await this.shoppingListModel.findByPk(listId, {
      include: [ShoppingListItem],
    });
    if (!shoppingList) {
      throw new NotFoundException(`Shopping list with ID ${listId} not found`);
    }
    return shoppingList;
  }

  async update(
    listId: number,
    updateShoppingListDto: UpdateShoppingListDto,
  ): Promise<ShoppingList> {
    const shoppingList = await this.findOne(listId);
    if (!updateShoppingListDto.familyId) {
      updateShoppingListDto.familyId = null;
    }
    await shoppingList.update(updateShoppingListDto);
    return shoppingList;
  }

  async remove(listId: number): Promise<void> {
    const shoppingList = await this.findOne(listId);
    await shoppingList.destroy();
  }

  async addItemToList(
    listId: number,
    itemDto: ShoppingListItemDto,
  ): Promise<ShoppingListItem> {
    const shoppingList = await this.findOne(listId);
    const item = await this.shoppingListItemModel.create({
      ...itemDto,
      shoppingListId: shoppingList.listId,
    });
    return item;
  }

  async updateItem(
    listId: number,
    itemId: number,
    itemDto: ShoppingListItemDto,
  ): Promise<ShoppingListItem> {
    const item = await this.shoppingListItemModel.findOne({
      where: { itemId, shoppingListId: listId },
    });
    if (!item) {
      throw new NotFoundException(
        `Item with ID ${itemId} not found in list ${listId}`,
      );
    }
    await item.update(itemDto);
    return item;
  }

  async removeItem(listId: number, itemId: number): Promise<void> {
    const item = await this.shoppingListItemModel.findOne({
      where: { itemId, shoppingListId: listId },
    });
    if (!item) {
      throw new NotFoundException(
        `Item with ID ${itemId} not found in list ${listId}`,
      );
    }
    await item.destroy();
  }

  async getListsByUserId(ownerId: number): Promise<ShoppingList[]> {
    return this.shoppingListModel.findAll({
      where: { ownerId },
      include: [ShoppingListItem],
    });
  }
}
