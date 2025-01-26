import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shelf } from './models/shelf.model';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { UpdateShelfDto } from './dto/update-shelf.dto';

@Injectable()
export class ShelvesService {
  constructor(
    @InjectModel(Shelf)
    private readonly shelfModel: typeof Shelf,
  ) {}

  async create(createShelfDto: CreateShelfDto): Promise<Shelf> {
    const shelf = await this.shelfModel.create(
      createShelfDto as Partial<CreateShelfDto>,
    );
    return shelf;
  }

  async findAll(): Promise<Shelf[]> {
    return this.shelfModel.findAll();
  }

  async findOne(id: number): Promise<Shelf> {
    const shelf = await this.shelfModel.findByPk(id);
    if (!shelf) {
      throw new NotFoundException(`Shelf with ID ${id} not found`);
    }
    return shelf;
  }

  async update(id: number, updateShelfDto: UpdateShelfDto): Promise<Shelf> {
    const shelf = await this.findOne(id);
    await shelf.update(updateShelfDto);
    return shelf;
  }

  async remove(id: number): Promise<void> {
    const shelf = await this.findOne(id);
    await shelf.destroy();
  }

  async getShelvesByFridgeId(fridgeId: number): Promise<Shelf[]> {
    return this.shelfModel.findAll({ where: { fridgeId } });
  }
}
