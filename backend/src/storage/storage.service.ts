import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { UploadTemplates } from 'src/enums/UploudTemplates';

@Injectable()
export class StorageService {
    constructor(private readonly configService: ConfigService) {
        cloudinary.config({
            cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
        });
    }

    generateCloudinarySignature(
        publicId: string,
        uploadPreset: UploadTemplates,
        displayName?: string,
    ) {
        const timestamp = Math.floor(Date.now() / 1000);

        const params: any = {
            timestamp,
            public_id: publicId,
            upload_preset: uploadPreset,
        };

        if (displayName) params.display_name = displayName;
        if (!Object.values(UploadTemplates).includes(uploadPreset)) throw new BadRequestException('Invalid upload preset');

        const signature = cloudinary.utils.api_sign_request(
            params,
            this.configService.get('CLOUDINARY_API_SECRET'),
        );

        const result: any = {
            timestamp,
            signature,
            public_id: publicId,
            api_key: this.configService.get('CLOUDINARY_API_KEY'),
            cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
            upload_preset: uploadPreset,
        };

        if (displayName) result.display_name = displayName;

        return result;
    }
}
