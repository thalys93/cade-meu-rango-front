import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    async paginate(options: IPaginationOptions) {
        const queryBuilder = this.roleRepository.createQueryBuilder('rol');
        queryBuilder.orderBy('rol.name', 'DESC');

        return paginate<Role>(queryBuilder, options);
    }

    async create(createRoleDto: CreateRoleDto) {
        const role = this.roleRepository.create(createRoleDto);
        await this.roleRepository.save(role);

        return { message: 'api.role.created', role };
    }

    async findAll() {
        const roles = await this.roleRepository.findAndCount();
        if (roles[1] === 0) {
            throw new NotFoundException('api.role.not_found');
        } else {
            return { found: roles[0], count: roles[1] };
        }
    }

    async findOne(id: number) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new NotFoundException('api.role.not_found');
        } else {
            return { found: role };
        }
    }

    async update(id: number, updateRoleDto: UpdateRoleDto) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new NotFoundException('api.role.not_found');
        } else {
            Object.assign(role, updateRoleDto);
        }
        await this.roleRepository.update(id, role);
        return { message: 'api.role.updated', role };
    }

    async remove(id: number) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new NotFoundException('api.role.not_found');
        } else {
            await this.roleRepository.delete(id);
            return { message: 'api.role.deleted' };
        }
    }
}
