import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Fridge } from './models/fridge.model';
import { CreateFridgeDto } from './dto/create-fridge.dto';
import { UpdateFridgeDto } from './dto/update-fridge.dto';

@Injectable()
export class FridgesService {
  constructor(
    @InjectModel(Fridge)
    private readonly fridgeModel: typeof Fridge,
  ) {}

  async create(createFridgeDto: CreateFridgeDto): Promise<Fridge> {
    const fridge = await this.fridgeModel.create(createFridgeDto as any);
    return fridge;
  }

  async findAll(): Promise<Fridge[]> {
    return this.fridgeModel.findAll();
  }

  async findOne(id: number): Promise<Fridge> {
    const fridge = await this.fridgeModel.findByPk(id);
    if (!fridge) {
      throw new NotFoundException(`Fridge with ID ${id} not found`);
    }
    return fridge;
  }

  async update(id: number, updateFridgeDto: UpdateFridgeDto): Promise<Fridge> {
    const fridge = await this.findOne(id);
    if (!updateFridgeDto.familyId) {
      updateFridgeDto.familyId = null;
    }
    await fridge.update(updateFridgeDto);
    return fridge;
  }

  async remove(id: number): Promise<void> {
    const fridge = await this.findOne(id);
    await fridge.destroy();
  }

  async getFridgesByOwnerId(ownerId: number): Promise<Fridge[]> {
    return this.fridgeModel.findAll({ where: { ownerId } });
  }
  async getFridgesByFamilyId(familyId: number): Promise<Fridge[]> {
    return this.fridgeModel.findAll({ where: { familyId } });
  }
}
