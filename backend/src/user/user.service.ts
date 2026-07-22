/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Role } from 'src/roles/entities/role.entity';
import { Roles } from 'src/enums/Roles';
import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    private logger = new Logger(UserService.name);

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly rolesRepository: Repository<Role>,
    ) {}

    async resolveRoles(roleNames?: string[]): Promise<Role[]> {
        const names = roleNames?.length ? roleNames : [Roles.User];

        const roles = await this.rolesRepository.find({
            where: { name: In(names) },
        });

        if (roles.length !== names.length) {
            const found = new Set(roles.map((r) => r.name));
            const missing = names.filter((n) => !found.has(n as Roles));
            throw new NotFoundException(
                `api.role.not.found: ${missing.join(', ')}`,
            );
        }

        return roles;
    }

    async create(createUserDto: CreateUserDto) {
        const existing = await this.usersRepository.findOne({
            where: { email: createUserDto.email },
        });
        if (existing) {
            throw new ConflictException('api.user.email.already.exists');
        }

        const roles = await this.resolveRoles([Roles.User]);

        const user = this.usersRepository.create({
            name: createUserDto.name,
            email: createUserDto.email,
            password: createUserDto.password,
            avatar_url: createUserDto.avatar_url,
            roles,
            settings: createUserDto.settings ?? {},
        });

        await this.usersRepository.save(user);
        delete user.password;
        return user;
    }

    async findByIdWithRoles(id: string): Promise<User | null> {
        return await this.usersRepository.findOne({
            where: { id },
            relations: ['roles'],
        });
    }

    async findOne(id: string) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['roles'],
        });
        if (!user) {
            throw new NotFoundException('api.user.not.found');
        }

        delete user.password;
        return { found: user };
    }

    async findByEmail(email: string) {
        try {
            return await this.usersRepository.findOneOrFail({
                where: { email },
                relations: ['roles'],
            });
        } catch (e) {
            this.logger.error(e);
            throw new NotFoundException('api.user.email.not_found');
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['roles'],
        });
        if (!user) {
            throw new NotFoundException('api.user.not.found');
        }

        const allowedFields = ['name', 'email', 'avatar_url', 'settings'];
        const filteredUpdateData: Record<string, unknown> = {};

        for (const field of allowedFields) {
            if (updateUserDto[field] !== undefined) {
                filteredUpdateData[field] = updateUserDto[field];
            }
        }

        Object.assign(user, filteredUpdateData);

        await this.usersRepository.save(user);
        delete user.password;
        return { message: 'api.user.updated', user };
    }

    async updateToken(id: string, token: string) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('api.user.not.found');
        }

        user.recoverToken = token;
        await this.usersRepository.update(id, user);
        return { message: 'api.user.token.updated', user };
    }

    async remove(id: string) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('api.user.not.found');
        }

        await this.usersRepository.delete(id);
        return { message: 'api.user.deleted', userID: id };
    }

    async updatePasswordByEmail(email: string, newPassword: string) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException('api.user.email.not_found');
        }
        const { hashSync } = await import('bcrypt');
        const hashed = hashSync(newPassword, 10);

        await this.usersRepository.update(user.id, {
            password: hashed,
            recoverToken: null,
        });

        return { message: 'api.user.password.updated', userId: user.id };
    }
}
