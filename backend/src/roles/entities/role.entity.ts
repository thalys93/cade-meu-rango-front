import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({ nullable: false, type: 'text' })
    name: string;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
}
