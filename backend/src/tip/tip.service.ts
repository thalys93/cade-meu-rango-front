import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Tip } from './entities/tip.entity';
import { CreateTipDto } from './dto/create-tip.dto';
import { UpdateTipDto } from './dto/update-tip.dto';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';

@Injectable()
export class TipService {
    constructor(
        @InjectRepository(Tip)
        private readonly tipRepository: Repository<Tip>,
    ) {}

    async paginate(
        options: IPaginationOptions,
        filters: { search?: string; author?: string } = {},
    ) {
        const qb = this.tipRepository
            .createQueryBuilder('tip')
            .leftJoinAndSelect('tip.author', 'author')
            .orderBy('tip.createdAt', 'DESC');

        if (filters.search?.trim()) {
            qb.andWhere('LOWER(tip.title) LIKE LOWER(:search)', {
                search: `%${filters.search.trim()}%`,
            });
        }

        if (filters.author?.trim()) {
            qb.andWhere('LOWER(author.name) LIKE LOWER(:author)', {
                author: `%${filters.author.trim()}%`,
            });
        }

        return paginate<Tip>(qb, options);
    }

    async paginateByAuthor(authorId: string, options: IPaginationOptions) {
        const qb = this.tipRepository
            .createQueryBuilder('tip')
            .leftJoinAndSelect('tip.author', 'author')
            .where('author.id = :authorId', { authorId })
            .orderBy('tip.createdAt', 'DESC');

        return paginate<Tip>(qb, options);
    }

    async findOne(id: string) {
        const tip = await this.tipRepository.findOne({
            where: { id },
            relations: ['author'],
        });
        if (!tip) {
            throw new NotFoundException('api.tip.not.found');
        }
        return tip;
    }

    async create(dto: CreateTipDto, authUser: AuthUser) {
        const tip = this.tipRepository.create({
            title: dto.title,
            description: dto.description,
            author: { id: authUser.id },
        });
        return this.tipRepository.save(tip);
    }

    async update(id: string, dto: UpdateTipDto, authUser: AuthUser) {
        const tip = await this.findOne(id);
        this.assertOwner(tip, authUser);

        if (dto.title !== undefined) tip.title = dto.title;
        if (dto.description !== undefined) tip.description = dto.description;

        return this.tipRepository.save(tip);
    }

    async remove(id: string, authUser: AuthUser) {
        const tip = await this.findOne(id);
        this.assertOwner(tip, authUser);
        await this.tipRepository.delete(id);
        return { message: 'api.tip.deleted', tipId: id };
    }

    private assertOwner(tip: Tip, authUser: AuthUser) {
        if (tip.author?.id !== authUser.id) {
            throw new ForbiddenException('api.tip.forbidden');
        }
    }
}
