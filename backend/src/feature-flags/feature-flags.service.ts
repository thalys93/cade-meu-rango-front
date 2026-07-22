import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type FeatureFlagKey = 'seeding';

const FLAG_ENV_MAP: Record<FeatureFlagKey, string> = {
    seeding: 'FEATURE_SEEDING',
};

@Injectable()
export class FeatureFlagsService {
    constructor(private readonly configService: ConfigService) {}

    isEnabled(flag: FeatureFlagKey): boolean {
        const envKey = FLAG_ENV_MAP[flag];
        const value = this.configService.get<string>(envKey);
        if (value === undefined || value === '') {
            return false;
        }
        return ['1', 'true', 'yes'].includes(value.toLowerCase());
    }
}
