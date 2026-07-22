import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Roles } from 'src/enums/Roles';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Tip } from 'src/tip/entities/tip.entity';
import { DataSource } from 'typeorm';
import { FeatureFlagsService } from 'src/feature-flags/feature-flags.service';
import { toCategorySlug } from 'src/helpers/slug';
import {
    MOCK_CATEGORIES,
    MOCK_PASSWORD,
    MOCK_RECIPES,
    MOCK_TIPS,
    MOCK_USERS,
} from './seeding.data';

@Injectable()
export class SeedingService implements OnModuleInit {
    private readonly logger = new Logger(SeedingService.name);

    constructor(
        private readonly dataSource: DataSource,
        private readonly featureFlags: FeatureFlagsService,
    ) {}

    async onModuleInit() {
        if (!this.featureFlags.isEnabled('seeding')) {
            this.logger.log('Seeding desabilitado (FEATURE_SEEDING=false)');
            return;
        }
        await this.createRoles();
        await this.createCategories();
        await this.createUsers();
        await this.createRecipes();
        await this.createTips();
    }

    async createRoles() {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const rolesRepository = queryRunner.manager.getRepository(Role);
            const rolesToSeed = Object.values(Roles);

            for (const role of rolesToSeed) {
                const existingRole = await rolesRepository.findOneBy({
                    name: role,
                });

                if (!existingRole) {
                    await rolesRepository.insert({ name: role });
                    this.logger.verbose(`Inserted role: ${role}`);
                } else {
                    this.logger.warn(`Role already exists: ${role}`);
                }
            }

            await queryRunner.commitTransaction();
            this.logger.log('Roles seeded successfully!');
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error('Failed to seed roles', (error as Error).stack);
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async createCategories() {
        const repo = this.dataSource.getRepository(Category);

        for (const name of MOCK_CATEGORIES) {
            const slug = toCategorySlug(name);
            const existing = await repo.findOneBy({ slug });
            if (existing) {
                this.logger.warn(`Category already exists: ${name}`);
                continue;
            }
            await repo.save(repo.create({ name, slug }));
            this.logger.verbose(`Inserted category: ${name}`);
        }

        this.logger.log('Categories seeded successfully!');
    }

    async createUsers() {
        const usersRepo = this.dataSource.getRepository(User);
        const rolesRepo = this.dataSource.getRepository(Role);
        const userRole = await rolesRepo.findOneBy({ name: Roles.User });

        if (!userRole) {
            throw new Error('Role User not found. Seed roles first.');
        }

        for (const mock of MOCK_USERS) {
            const existing = await usersRepo.findOneBy({ email: mock.email });
            if (existing) {
                this.logger.warn(`User already exists: ${mock.email}`);
                continue;
            }

            const user = usersRepo.create({
                ...mock,
                password: MOCK_PASSWORD,
                roles: [userRole],
                settings: {},
            });
            await usersRepo.save(user);
            this.logger.verbose(`Inserted user: ${mock.email}`);
        }

        this.logger.log('Users seeded successfully!');
    }

    async createRecipes() {
        const recipesRepo = this.dataSource.getRepository(Recipe);
        const usersRepo = this.dataSource.getRepository(User);
        const categoriesRepo = this.dataSource.getRepository(Category);

        for (const mock of MOCK_RECIPES) {
            const existing = await recipesRepo.findOneBy({ title: mock.title });
            if (existing) {
                let changed = false;
                if (!existing.image_url && mock.image_url) {
                    existing.image_url = mock.image_url;
                    changed = true;
                }
                if (!existing.difficulty) {
                    existing.difficulty = mock.difficulty;
                    changed = true;
                }
                if (!existing.durationMinutes) {
                    existing.durationMinutes = mock.durationMinutes;
                    changed = true;
                }
                if (!existing.tools?.length) {
                    existing.tools = mock.tools;
                    changed = true;
                }
                if (changed) {
                    await recipesRepo.save(existing);
                    this.logger.verbose(`Updated recipe meta: ${mock.title}`);
                } else {
                    this.logger.warn(`Recipe already exists: ${mock.title}`);
                }
                continue;
            }

            const author = await usersRepo.findOneBy({
                email: mock.authorEmail,
            });
            if (!author) {
                this.logger.error(
                    `Author not found for recipe: ${mock.authorEmail}`,
                );
                continue;
            }

            const categories = await categoriesRepo.find({
                where: mock.categoryNames.map((name) => ({ name })),
            });

            await recipesRepo.save(
                recipesRepo.create({
                    title: mock.title,
                    description: mock.description,
                    image_url: mock.image_url,
                    difficulty: mock.difficulty,
                    durationMinutes: mock.durationMinutes,
                    tools: mock.tools,
                    ingredients: mock.ingredients,
                    instructions: mock.instructions,
                    author,
                    categories,
                }),
            );
            this.logger.verbose(`Inserted recipe: ${mock.title}`);
        }

        this.logger.log('Recipes seeded successfully!');
    }

    async createTips() {
        const tipsRepo = this.dataSource.getRepository(Tip);
        const usersRepo = this.dataSource.getRepository(User);

        for (const mock of MOCK_TIPS) {
            const existing = await tipsRepo.findOneBy({ title: mock.title });
            if (existing) {
                this.logger.warn(`Tip already exists: ${mock.title}`);
                continue;
            }

            const author = await usersRepo.findOneBy({
                email: mock.authorEmail,
            });
            if (!author) {
                this.logger.error(
                    `Author not found for tip: ${mock.authorEmail}`,
                );
                continue;
            }

            await tipsRepo.save(
                tipsRepo.create({
                    title: mock.title,
                    description: mock.description,
                    author,
                }),
            );
            this.logger.verbose(`Inserted tip: ${mock.title}`);
        }

        this.logger.log('Tips seeded successfully!');
    }
}
