import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { toCategorySlug } from 'src/helpers/slug';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async findAll() {
        return this.categoryRepository.find({
            order: { name: 'ASC' },
        });
    }

    async findOrCreateByNames(names: string[]): Promise<Category[]> {
        const result: Category[] = [];
        const seen = new Set<string>();

        for (const raw of names) {
            const trimmed = raw?.trim();
            if (!trimmed) continue;

            const slug = toCategorySlug(trimmed);
            if (!slug || seen.has(slug)) continue;
            seen.add(slug);

            let category = await this.categoryRepository.findOne({
                where: { slug },
            });

            if (!category) {
                category = this.categoryRepository.create({
                    name: trimmed,
                    slug,
                });
                category = await this.categoryRepository.save(category);
            }

            result.push(category);
        }

        return result;
    }
}
