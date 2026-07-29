import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);
  private isConfigured = false;

  constructor(private readonly configService: ConfigService) {
    const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.configService.get<string>('CLOUDINARY_SECRET');

    if (cloudName && apiKey && apiSecret && cloudName !== 'axa-cloud') {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret
      });
      this.isConfigured = true;
      this.logger.log('Cloudinary initialized successfully');
    } else {
      this.logger.warn('Cloudinary using fallback asset storage mode');
    }
  }

  async uploadImage(fileDataUrl: string): Promise<{ url: string; publicId: string }> {
    if (!fileDataUrl) {
      throw new BadRequestException('Image file data is required');
    }

    if (this.isConfigured) {
      try {
        const result = await cloudinary.uploader.upload(fileDataUrl, {
          folder: 'axa-products',
          transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto', fetch_format: 'auto' }]
        });
        return {
          url: result.secure_url,
          publicId: result.public_id
        };
      } catch (err: any) {
        this.logger.error(`Cloudinary upload failed: ${err.message}`);
        throw new BadRequestException('Image upload to Cloudinary failed');
      }
    }

    // Fallback URL generation when using placeholder credentials
    const fakeId = `axa-product-${uuidv4().substring(0, 8)}`;
    return {
      url: fileDataUrl.startsWith('data:')
        ? fileDataUrl
        : `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80`,
      publicId: fakeId
    };
  }

  async deleteImage(publicId: string): Promise<boolean> {
    if (this.isConfigured && publicId) {
      try {
        await cloudinary.uploader.destroy(publicId);
        return true;
      } catch (err) {
        this.logger.warn(`Failed to delete Cloudinary asset ${publicId}`);
      }
    }
    return true;
  }
}
