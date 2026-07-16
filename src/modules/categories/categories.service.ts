import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../../shared/database/repositories/categories.repositories';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ValidateCategoryOwnershipService } from './services/validate-category-ownership.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
  ) {}

  findAllByUserId(userId: string) {
    return this.categoriesRepository.findMany({
      where: {
        userId,
      },
    });
  }

  create(userId: string, createCategoryDto: CreateCategoryDto) {
    const { name, icon, type } = createCategoryDto;

    return this.categoriesRepository.create({
      data: {
        name,
        icon,
        type,
        userId,
      },
    });
  }

  async update(userId: string, categoryId: string, updateCategoryDto: UpdateCategoryDto) {
    await this.validateCategoryOwnershipService.validate(userId, categoryId);

    const { name, icon, type } = updateCategoryDto;

    return this.categoriesRepository.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
        icon,
        type,
      },
    });
  }

  async remove(userId: string, categoryId: string) {
    await this.validateCategoryOwnershipService.validate(userId, categoryId);

    return this.categoriesRepository.delete({
      where: {
        id: categoryId,
      },
    });
  }
}
