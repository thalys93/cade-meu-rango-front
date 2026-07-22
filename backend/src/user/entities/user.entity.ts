import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { hashSync } from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'text' })
    name: string;

    @Column({ nullable: false, type: 'text', unique: true })
    @Unique(['email'])
    email: string;

    @Column({ nullable: true, type: 'text' })
    @Exclude()
    password: string;

    @Column({ nullable: true, type: 'text' })
    @Exclude()
    recoverToken: string;

    @Column({ nullable: true, type: 'text' })
    avatar_url: string;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({ name: 'user_roles' })
    roles: Role[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @BeforeInsert()
    hashPasswordOnInsert() {
        if (this.password) {
            this.password = hashSync(this.password, 10);
        }
    }

    @Column({ nullable: true, type: 'json', default: {} })
    settings: Record<string, unknown>;
}
