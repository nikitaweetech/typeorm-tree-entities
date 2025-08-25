import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, TreeRepository } from 'typeorm';
import { Category } from './category.entity';


@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async create(name: string, parentId?: string): Promise<Category> {
    const category = this.categoryRepo.create({ name });

    if (parentId) {
      const parent = await this.categoryRepo.findOne({ where: { id: parentId } });
      if (parent) {
        category.parent = parent;
      }
    }

    return this.categoryRepo.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepo.find({ relations: ['children'] });
  }

  async findOne(id: string) {
    return this.categoryRepo.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
  }

  async getAllRoots(){
    return this.dataSource.manager.getTreeRepository(Category).findTrees();
    //we can't use this function on adjacency list pattern that's why we are using another tree patter entities in typeorm
  }
}
