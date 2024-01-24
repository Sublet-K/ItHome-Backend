import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserInterface } from '@/interface/user.interface';
import { UserCreateDto, UserFilterDto, UserUpdateDto } from '@/dto/user.dto';

import * as bcrypt from 'bcrypt';
import { ImageInterface } from '@/interface/image.interface';

@Injectable()
export class MongodbUserService {
  USER_VERSION = 2;
  IMAGE_VERSION = 1;
  constructor(private prisma: PrismaService) {}

  async getOneUser(user_id: string) {
    const res: UserInterface = await this.prisma.user.findFirstOrThrow({
      where: {
        user_id,
        version: {
          gte: this.USER_VERSION,
        },
        delete: false,
      },
    });
    return res;
  }

  async getAllUser() {
    const u: UserInterface[] = await this.prisma.user.findMany({
      where: {
        version: {
          gte: this.USER_VERSION,
        },
      },
    });
    return u;
  }

  async getUserByKey(user_id: string) {
    const result: UserInterface | null = await this.prisma.user.findFirst({
      where: {
        user_id,
        version: {
          gte: this.USER_VERSION,
        },
        delete: false,
      },
    });
    if (!result) {
      throw Error('[mongodb.service:getUserByKey] result null');
    }
    return result;
  }

  async createUser(data: UserCreateDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(data.password, salt);
    data.password = hashPassword;
    const result: UserInterface = await this.prisma.user.create({
      data: { ...data, version: this.USER_VERSION },
    });
    if (!result) {
      throw Error('[mongodb.service:createUser] result null');
    }
    return result;
  }

  async validateUser(user_id: string, password: string) {
    const result: UserInterface | null = await this.prisma.user.findFirst({
      where: {
        user_id,
        version: { gte: this.USER_VERSION },
        delete: false,
      },
    });

    const password_result = await bcrypt.compare(password, result!.password);
    if (!result || !password_result) {
      throw Error(
        '[mongodb.service:validateUser] user_id or password is wrong',
      );
    }
    return result;
  }

  async putOneUser(user_id: string, putUserBody: UserUpdateDto) {
    const res: UserInterface = await this.prisma.user.update({
      where: {
        user_id,
        version: { gte: this.USER_VERSION },
        delete: false,
      },
      data: putUserBody,
    });
    if (!res) {
      throw Error('[mongodb.service:putOneUser] user doesnt exist');
    }
    return res;
  }

  async deleteOneUser(user_id: string) {
    const res: UserInterface = await this.prisma.user.update({
      where: {
        user_id,
        version: { gte: this.USER_VERSION },
        delete: false,
      },
      data: {
        delete: true,
      },
    });
    if (!res) {
      throw Error('[mongodb.service:deleteOneUser] user doesnt exist');
    }
    return true;
  }

  async filterUser(query: UserFilterDto) {
    const res: UserInterface[] = await this.prisma.user.findMany({
      where: {
        version: { gte: this.USER_VERSION },
        school: query.school,
      },
    });
    return res;
  }

  async getUserImage(filename: string, filetype: string, image_hash: string) {
    const res: ImageInterface | null = await this.prisma.profileImage.findFirst(
      {
        where: {
          version: {
            gte: this.IMAGE_VERSION,
          },
          filename,
          filetype,
          image_hash,
        },
      },
    );
    if (!res) {
      throw new Error("[mongodb.service:getImage] image doesn't exist");
    }
    return res;
  }

  async saveUserImage(filename: string, filetype: string, image_hash: string) {
    const res: ImageInterface = await this.prisma.profileImage.create({
      data: {
        filename,
        filetype,
        image_hash,
        version: this.IMAGE_VERSION,
      },
    });
    return res;
  }

  async putUserImage(user_id: string, image_id: string) {
    const res: UserInterface = await this.prisma.user.update({
      where: {
        user_id,
        version: { gte: this.USER_VERSION },
        delete: false,
      },
      data: {
        image_id: image_id,
      },
    });
    if (!res) {
      throw Error('[mongodb.service:putUserImage] user doesnt exist');
    }
    return res;
  }
}
