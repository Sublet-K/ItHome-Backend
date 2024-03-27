import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserExportInterface } from '@/interface/user.interface';
import {
  userCreateStub,
  userExportStub,
  userFilterStub,
  userUpdateStub,
  userVerifyUpdateStub,
} from '../../stubs/mongodb.stub';
import { MongodbModule } from '../mongodb/mongodb.module';
import { MongodbUserService } from '../mongodb/mongodb.user.service';
import { PostInterface } from '@/interface/post.interface';
import { CacheModule } from '@nestjs/cache-manager';
import { MongodbPostService } from '../mongodb/mongodb.post.service';

jest.mock('../mongodb/mongodb.post.service');
jest.mock('../mongodb/mongodb.postimage.service');
jest.mock('../mongodb/mongodb.postkey.service');
jest.mock('../mongodb/mongodb.reservation.service');
jest.mock('../mongodb/mongodb.user.service');

describe('UserService', () => {
  let service: UserService;
  let mongodbUserService: MongodbUserService;
  let mongodbPostService: MongodbPostService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [MongodbModule, CacheModule.register()],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    mongodbUserService = module.get<MongodbUserService>(MongodbUserService);
    mongodbPostService = module.get<MongodbPostService>(MongodbPostService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('TESTING getAllUser (GET /user)', () => {
    describe('When calling User', () => {
      let result: UserExportInterface[] | Error;

      beforeEach(async () => {
        try {
          result = await service.getAllUser();
        } catch (e) {
          result = e;
        }
      });

      it('should call user', () => {
        expect(result).toEqual([userExportStub()]);
      });

      it('should be array', () => {
        expect(result).toBeInstanceOf(Array);
      });
    });
  });

  describe('TESTING getUserByKey (GET /user/:user_id)', () => {
    describe('when calling with id', () => {
      let result: UserExportInterface | undefined;
      const user_id = 'fsh_12';
      beforeEach(async () => {
        try {
          result = await service.getUserByKey(user_id);
        } catch (_e) {
          result = undefined;
        }
      });

      it('then should return interface', () => {
        expect(result).toBeDefined();
      });

      it('then should call db to get a user', () => {
        expect(mongodbUserService.getUserByKey).toHaveBeenCalledTimes(1);
      });

      it('then should call db to get one User with given parameters', () => {
        expect(mongodbUserService.getUserByKey).toHaveBeenCalledWith(user_id);
      });

      it('then should call db to get one User', () => {
        expect(mongodbUserService.getUserByKey).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('TESTING getUserPostByKey (GET /user/post)', () => {
    describe('when calling with id', () => {
      let result: PostInterface[] | undefined;
      const user_id = 'fsh_12';
      beforeEach(async () => {
        try {
          result = await service.getUserPostByKey(user_id);
        } catch (_e) {
          result = undefined;
        }
      });

      it('then should return interface', () => {
        expect(result).toBeDefined();
      });

      it('then should call db to get a user', () => {
        expect(mongodbPostService.getUserPostByKey).toHaveBeenCalledTimes(1);
      });

      it('then should call db to get one User with given parameters', () => {
        expect(mongodbPostService.getUserPostByKey).toHaveBeenCalledWith(
          user_id,
        );
      });

      it('then should call db to get one User', () => {
        expect(mongodbPostService.getUserPostByKey).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('TESTING createUser (Post /user/:user_id)', () => {
    describe('when calling with normal input', () => {
      let result: UserExportInterface | undefined;
      beforeEach(async () => {
        try {
          result = await service.createUser(userCreateStub());
        } catch (_e) {
          result = undefined;
        }
      });
      it('then should return interface', () => {
        expect(result).toBeDefined();
      });
      it('then should call db to create user', () => {
        expect(mongodbUserService.createUser).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('TESTING deleteOneUser (DELETE /user/:user_id', () => {
    describe('when calling with user delete', () => {
      let result: boolean | undefined;
      beforeEach(async () => {
        try {
          result = await service.deleteOneUser('example');
        } catch (_e) {
          result = undefined;
        }
      });

      it('then should return boolena', () => {
        expect(result).toBeDefined();
      });

      it('then should call db to delete user', () => {
        expect(mongodbUserService.deleteOneUser).toHaveBeenCalledTimes(1);
      });

      it('then should call db to delete user with given parameters', () => {
        expect(mongodbUserService.deleteOneUser).toHaveBeenCalledWith(
          'example',
        );
      });
    });
  });

  describe('TESTING putOneUser (UPDATE /user/update', () => {
    describe('when calling with user update inputs', () => {
      let result: UserExportInterface | undefined;
      beforeEach(async () => {
        try {
          result = await service.putOneUser('mocked-user_id', userUpdateStub());
        } catch (_e) {
          result = undefined;
        }
      });

      it('then should return ExportInterface', () => {
        expect(result).toBeDefined();
      });

      it('then should call db to update user', () => {
        expect(mongodbUserService.putOneUser).toHaveBeenCalledTimes(1);
      });

      it('then should db to update user with given parameters', () => {
        expect(mongodbUserService.putOneUser).toHaveBeenCalledWith(
          'mocked-user_id',
          userUpdateStub(),
        );
      });
    });
  });

  describe('TESTING putVerifyUser (UPDATE /user/verifyupdate', () => {
    describe('when calling with user update inputs', () => {
      let result: UserExportInterface | undefined;
      beforeEach(async () => {
        try {
          result = await service.putOneUser(
            'mocked-user_id',
            userVerifyUpdateStub(),
          );
        } catch (_e) {
          result = undefined;
        }
      });

      it('then should return ExportInterface', () => {
        expect(result).toBeDefined();
      });

      it('then should call db to update user', () => {
        expect(mongodbUserService.putOneUser).toHaveBeenCalledTimes(1);
      });

      it('then should db to update user with given parameters', () => {
        expect(mongodbUserService.putOneUser).toHaveBeenCalledWith(
          'mocked-user_id',
          userVerifyUpdateStub(),
        );
      });
    });
  });

  describe('TESTING filterUser', () => {
    describe('when calling with user filter query', () => {
      let result: UserExportInterface[] | undefined;
      beforeEach(async () => {
        try {
          result = await service.filterUser(userFilterStub());
        } catch (_e) {
          result = undefined;
        }
      });

      it('then should return array', () => {
        expect(result).toBeDefined();
        expect(result).toEqual([userExportStub()]);
      });

      it('then should call db to filter user', () => {
        expect(mongodbUserService.filterUser).toHaveBeenCalledTimes(1);
      });

      it('then should call db to filter user with given parameters', () => {
        expect(mongodbUserService.filterUser).toHaveBeenCalledWith(
          userFilterStub(),
        );
      });
    });
  });
});
