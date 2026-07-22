import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { RecipeDifficulty } from 'src/enums/RecipeDifficulty';

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'text', nullable: true })
    image_url: string;

    @Column({ type: 'enum', enum: RecipeDifficulty, nullable: true })
    difficulty: RecipeDifficulty | null;

    @Column({ type: 'int', nullable: true })
    durationMinutes: number | null;

    @Column({ type: 'json', nullable: true, default: [] })
    tools: string[];

    @Column({ type: 'json' })
    ingredients: string[];

    @Column({ type: 'json' })
    instructions: string[];

    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    author: User;

    @ManyToMany(() => Category, (category) => category.recipes, {
        cascade: true,
    })
    @JoinTable({ name: 'recipe_categories' })
    categories: Category[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
