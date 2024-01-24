import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IncrementkeyInterface } from '@/interface/incrementkey.interface';
import { MongodbPostService } from './mongodb.post.service';

@Injectable()
export class MongodbPostKeyService {
  INCREMENTKEY_VERSION = 1;

  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => MongodbPostService))
    private mongodbPostService: MongodbPostService,
  ) {}

  async getPostKey() {
    // incrementKey 테이블의 첫 번째 데이터를 가져옴
    let data: IncrementkeyInterface | null =
      await this.prisma.incrementKey.findFirst({
        where: {
          version: { gte: this.INCREMENTKEY_VERSION },
        },
      });
    if (!data) {
      data = await this.prisma.incrementKey.create({
        data: {
          postKey: await this.mongodbPostService.getPostMaxKey(),
          version: this.INCREMENTKEY_VERSION,
        },
      });
      if (!data) throw Error("[mongodb.service:getPostKey] can't create data");
    }

    // postKey를 1 증가시키고 그 값을 받아옴
    const updated: IncrementkeyInterface =
      await this.prisma.incrementKey.update({
        where: {
          version: { gte: this.INCREMENTKEY_VERSION },
          id: data.id,
        },
        data: { postKey: { increment: 1 } },
      });

    // 증가된 postKey 값을 전달
    return updated.postKey;
  }
}
