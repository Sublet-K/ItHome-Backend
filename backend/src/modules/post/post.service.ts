import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import {
  PostCreateDto,
  PostFilterQueryDto,
  PostGetAllQueryDto,
  PostUpdateDto,
} from '@/dto/post.dto';
import { PostExportInterface, PostInterface } from '@/interface/post.interface';
import { UserInterface } from '@/interface/user.interface';
import { createHash } from 'crypto';
import { MongodbPostService } from '../mongodb/mongodb.post.service';
import { MongodbPostImageService } from '../mongodb/mongodb.postimage.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postdb: MongodbPostService,
    private readonly postimagedb: MongodbPostImageService,
  ) {}

  isPositiveInt(val: number, defaultVal: number) {
    if (typeof val !== 'number') return defaultVal;
    if (!Number.isInteger(val)) return defaultVal;
    if (val <= 0) return defaultVal;
    return val;
  }

  // GET /POST
  async getAllPosts(query: PostGetAllQueryDto) {
    query.maxPost = this.isPositiveInt(query.maxPost, 6);
    if (query.maxPost > 50) query.maxPost = 6;

    query.page = this.isPositiveInt(query.page, 1);

    const result = await this.postdb.getAllPosts(query);

    const ret = result.map((post) => this.transformExport(post));

    return ret;
  }

  // POST /POST
  async createPost(
    files: Express.Multer.File[],
    post: PostCreateDto,
    user: UserInterface,
  ) {
    post['end_day'] = new Date(post['end_day']);
    post['start_day'] = new Date(post['start_day']);

    const image_id: string[] = [];
    for (const file of files) {
      // 파일들을 하나씩 업로드 하고 그 id를 저장
      const res = await this.uploadImage(file);
      image_id.push(res.id);
    }

    // PrismaPostCreateDto 형식에 맞도록 변경하여 createPost에 전달
    const res: PostInterface = await this.postdb.createPost(
      {
        ...post,
        image_id,
      },
      user,
    );
    const ret = this.transformExport(res);
    return ret;
  }

  // GET /POST/:postKey
  async getOnePost(key: number) {
    const res = await this.postdb.getOnePost(key);
    const ret = this.transformExport(res);
    return ret;
  }

  // GET /post/local
  async getLocalPost(user: UserInterface) {
    const res = await this.postdb.getLocalPost(user);
    const ret = res.map((ele) => {
      return this.transformExport(ele);
    });
    return ret;
  }

  // PUT /POST/:postKey
  async putOnePost(
    key: number,
    files: Express.Multer.File[],
    postUpdateInput: PostUpdateDto,
  ) {
    postUpdateInput['end_day'] &&= new Date(postUpdateInput['end_day']);
    postUpdateInput['start_day'] &&= new Date(postUpdateInput['start_day']);

    const image_id: string[] = [];
    for (const file of files) {
      // 파일들을 하나씩 업로드 하고 그 id를 저장
      const res = await this.findOrUploadImage(file);
      image_id.push(res.id);
    }
    postUpdateInput.image_id = image_id;

    const res = await this.postdb.putOnePost(key, postUpdateInput);
    const ret = this.transformExport(res);
    return ret;
  }

  // DELETE /POST/:postKey
  async deleteOnePost(key: number, user: UserInterface) {
    const res = await this.postdb.deleteOnePost(key, user);
    return res;
  }

  async filterPost(query: PostFilterQueryDto) {
    const res = await this.postdb.filterPost(query);

    const ret = res.map((post) => this.transformExport(post));
    return ret;
  }

  calculateHash(buffer: Buffer) {
    const hash = createHash('sha256');
    hash.update(buffer);
    const res = hash.digest('hex');
    return res;
  }

  async findOrUploadImage(file: Express.Multer.File) {
    const image_hash = this.calculateHash(file.buffer);
    try {
      const res = await this.postimagedb.getImage(
        file.originalname,
        file.mimetype,
        image_hash,
      );
      return res;
    } catch (e) {
      console.log('[post.service:findOrUploadImage] getImage failed');
      const res = await this.uploadImage(file);
      return res;
    }
  }

  async uploadImage(file: Express.Multer.File) {
    if (!file || file.mimetype !== 'image/jpeg') {
      throw new Error(
        '[post.service:uploadImage] file not exist or mimetype is not image/jpeg',
      );
    }
    const image_hash = this.calculateHash(file.buffer);
    const res = await this.postimagedb.saveImage(
      file.originalname,
      file.mimetype,
      image_hash,
    );
    const bytes = file.buffer;
    const buffer = Buffer.from(bytes);
    await writeFile(`./public/${res.id}.jpg`, buffer);
    return res;
  }

  transformExport(post: PostInterface): PostExportInterface {
    delete (post as { id?: string }).id;
    delete (post as { deleted?: boolean }).deleted;
    delete (post as { version?: number }).version;
    return post;
  }
}
