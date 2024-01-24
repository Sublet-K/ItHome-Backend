import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  PostFilterQueryDto,
  PostGetAllQueryDto,
  PostUpdateDto,
  PrismaPostCreateDto,
} from '@/dto/post.dto';
import { PostInterface } from '@/interface/post.interface';
import { MongodbPostKeyService } from './mongodb.postkey.service';
import { UserInterface } from '@/interface/user.interface';

@Injectable()
export class MongodbPostService {
  POST_VERSION = 1;

  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => MongodbPostKeyService))
    private mongodbPostKeyService: MongodbPostKeyService,
  ) {}

  async getAllPosts(query: PostGetAllQueryDto) {
    // 모든 포스트를 가져옴, 나중에는 Query Parameter을 이용해 필터하여 가져옴
    const posts: PostInterface[] = await this.prisma.post.findMany({
      where: {
        version: { gte: this.POST_VERSION },
        deleted: false,
        local_save: false,
      },
      skip: query.maxPost * (query.page - 1),
      take: query.maxPost,
    });
    return posts;
  }

  async getPostMaxKey() {
    const posts: PostInterface[] = await this.prisma.post.findMany({});
    if (!posts || posts.length === 0) return 0;
    return posts.reduce((prev, cur) => {
      return Math.max(prev, cur.key);
    }, posts[0].key);
  }

  /**
   * 전해준 데이터를 기반으로 post를 만듦
   *
   * @param data
   * @returns
   */
  async createPost(data: PrismaPostCreateDto, user: UserInterface) {
    const res: PostInterface = await this.prisma.post.create({
      data: {
        ...data,
        key: await this.mongodbPostKeyService.getPostKey(), // 새로운 postKey를 받아옴
        postuser: {
          connect: {
            user_id: user.user_id,
          },
        },
        version: this.POST_VERSION,
      },
    });
    return res;
  }

  async getOnePost(key: number) {
    const res: PostInterface | null = await this.prisma.post.findFirst({
      where: {
        key,
        version: { gte: this.POST_VERSION },
        deleted: false,
        local_save: false,
      },
    });
    if (!res) {
      throw Error("mongodb.service:getOnePost(), post doesn't exist");
    }
    return res;
  }

  async putOnePost(key: number, putPostBody: PostUpdateDto) {
    const res: PostInterface = await this.prisma.post.update({
      where: {
        key,
        version: { gte: this.POST_VERSION },
        deleted: false,
      },
      data: putPostBody,
    });
    return res;
  }

  async deleteOnePost(key: number, user: UserInterface) {
    await this.prisma.post.update({
      where: {
        key,
        version: { gte: this.POST_VERSION },
        deleted: false,
        postuser: {
          user_id: user['user_id'],
        },
      },
      data: {
        deleted: true,
      },
    });

    return true;
  }

  async filterPost(query: PostFilterQueryDto) {
    const post_date = {
      gt: new Date(query.fromDate || '0'),
      lt: new Date(query.toDate || '9999-12-31'),
    };
    const range_price = {
      gte: query.fromPrice || 0,
      lte: query.toPrice || 90000000,
    };

    const res: PostInterface[] = await this.prisma.post.findMany({
      where: {
        version: { gte: this.POST_VERSION },
        post_date: post_date,
        price: range_price,
        request: true,
        position: query.position,
        min_duration: { lte: query.fromDuration || 1000000 },
        max_duration: { gte: query.toDuration || 0 },
        limit_people: query.limit_people,
        number_room: query.number_room,
        number_bathroom: query.number_bathroom,
        number_bedroom: query.number_bedroom,
        x_coordinate: query.x_coordinate,
        y_coordinate: query.y_coordinate,
        city: query.city,
        gu: query.gu,
        dong: query.dong,
        street: query.street,
        street_number: query.street_number,
        deleted: false,
        local_save: false,
      },
    });
    return res;
  }

  async getLocalPost(user: UserInterface) {
    const res: PostInterface[] = await this.prisma.post.findMany({
      where: {
        version: { gte: this.POST_VERSION },
        deleted: false,
        local_save: true,
        postuser: {
          user_id: user['user_id'],
        },
      },
    });
    return res;
  }
}
