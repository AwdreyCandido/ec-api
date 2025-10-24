import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  create(createStoreDto: CreateStoreDto) {
    const store = this.storesRepository.create(createStoreDto);
    return this.storesRepository.save(store);
  }

  findAll() {
    return this.storesRepository.find({
      relations: ['products'],
    });
  }

  findOne(id: number) {
    return this.storesRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    await this.storesRepository.update(id, updateStoreDto);
    return this.storesRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.storesRepository.delete(id);
  }
}
