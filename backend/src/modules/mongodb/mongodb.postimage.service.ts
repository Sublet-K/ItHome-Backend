import { ImageInterface } from '@/interface/image.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MongodbPostImageService {
  IMAGE_VERSION = 1;
  constructor(private prisma: PrismaService) {}

  async getImage(filename: string, filetype: string, image_hash: string) {
    const res: ImageInterface | null = await this.prisma.image.findFirst({
      where: {
        version: {
          gte: this.IMAGE_VERSION,
        },
        filename,
        filetype,
        image_hash,
      },
    });
    if (!res) {
      throw new Error("[mongodb.service:getImage] image doesn't exist");
    }
    return res;
  }

  async saveImage(filename: string, filetype: string, image_hash: string) {
    const res: ImageInterface = await this.prisma.image.create({
      data: {
        filename,
        filetype,
        image_hash,
        version: this.IMAGE_VERSION,
      },
    });
    return res;
  }
}
