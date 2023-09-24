import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostGetAllQueryDto, PrismaPostCreateDto } from '@/dto/post.dto';
import { PostInterface } from '@/interface/post.interface';
import { ImageInterface } from '@/interface/image.interface';
import { IncrementkeyInterface } from '@/interface/incrementkey.interface';
import { UserInterface } from '@/interface/user.interface';

@Injectable()
export class MongodbService {
  constructor(private prisma: PrismaService) {}

  isPositiveInt(val: number, defaultVal: number) {
    if (typeof val !== 'number') return defaultVal;
    if (!Number.isInteger(val)) return defaultVal;
    if (val <= 0) return defaultVal;
    return val;
  }

  async getAllPosts(query: PostGetAllQueryDto) {
    // 과도하게 높거나 값이 해당 범위가 아니라면 기본값으로 설정
    query.maxPost = this.isPositiveInt(query.maxPost, 6);
    if (query.maxPost > 50) query.maxPost = 6;
    query.page = this.isPositiveInt(query.page, 1);

    // 모든 포스트를 가져옴, 나중에는 Query Parameter을 이용해 필터하여 가져옴
    const posts: PostInterface[] = await this.prisma.post.findMany();

    // 페이지 당 포스트수와 현재 페이지를 기본으로 리스트를 반환
    return posts.slice(
      query.maxPost * (query.page - 1),
      query.maxPost * query.page,
    );
  }

  async getPostKey() {
    // incrementKey 테이블의 첫 번째 데이터를 가져옴
    const data: IncrementkeyInterface | null =
      await this.prisma.incrementKey.findFirst();
    if (!data)
      throw new Error('mongodb.service:getPostKey(), document doesnt exist');

    // postKey를 1 증가시키고 그 값을 받아옴
    const updated: IncrementkeyInterface =
      await this.prisma.incrementKey.update({
        where: {
          id: data.id,
        },
        data: { postKey: { increment: 1 } },
      });

    // 증가된 postKey 값을 전달
    return updated.postKey;
  }

  /**
   * 전해준 데이터를 기반으로 post를 만듦
   *
   * @param data
   * @returns
   */
  async createPost(data: PrismaPostCreateDto) {
    // 임시로 user_id를 첫 번째 찾은 유저로 고정
    const postuser: UserInterface | null = await this.prisma.user.findFirst();
    if (!postuser)
      throw new Error('mongodb.service.ts:createPost(), postuser is null');

    const res: PostInterface = await this.prisma.post.create({
      data: {
        ...data,
        key: await this.getPostKey(), // 새로운 postKey를 받아옴
        postuser: {
          connect: {
            user_id: postuser.user_id,
          },
        },
      },
    });
    return res;
  }

  async getOnePost(key: number) {
    const res: PostInterface | null = await this.prisma.post.findFirst({
      where: {
        key,
      },
    });
    if (!res) throw Error("mongodb.service:getOnePost(), post doesn't exist");
    return res;
  }

  async saveImage(filename: string, filetype: string) {
    const res: ImageInterface = await this.prisma.image.create({
      data: {
        filename,
        filetype,
      },
    });
    return res;
  }

  async putOnePost(key: number) {
    const res: PostInterface = await this.prisma.post.update({
      where: {
        key,
      },
      data: {
        title: 'new title!',
      },
    });
    return res;
  }
}