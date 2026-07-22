import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tip } from './entities/tip.entity';
import { TipService } from './tip.service';
import {
    TipControllerProtected,
    TipControllerPublic,
} from './tip.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Tip])],
    controllers: [TipControllerPublic, TipControllerProtected],
    providers: [TipService],
    exports: [TipService],
})
export class TipModule {}
