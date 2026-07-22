import { Module } from '@nestjs/common';
import { UserControllerProtected } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RolesModule } from 'src/roles/roles.module';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role]), RolesModule],
    controllers: [UserControllerProtected],
    providers: [UserService],
    exports: [UserService, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
