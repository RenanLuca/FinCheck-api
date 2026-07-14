import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../../shared/database/repositories/categories.repositories';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  findAllByUserId(userId: string) {
    const categories = this.categoriesRepository.findMany({
      where: {
        userId: userId,
      },
    }); 
    
    return categories;
  }

}
