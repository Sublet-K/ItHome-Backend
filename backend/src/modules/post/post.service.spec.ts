import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { PostExportInterface } from '@/interface/post.interface';
import {
  filterStub,
  imageStub,
  multerFileStub,
  postExportStub,
  postStub,
  userStub,
} from '../../stubs/mongodb.stub';
import { MongodbPostService } from '../mongodb/mongodb.post.service';
import { MongodbPostImageService } from '../mongodb/mongodb.postimage.service';
import { MongodbModule } from '../mongodb/mongodb.module';

jest.mock('../mongodb/mongodb.post.service');
jest.mock('../mongodb/mongodb.postimage.service');
jest.mock('../mongodb/mongodb.postkey.service');
jest.mock('../mongodb/mongodb.reservation.service');
jest.mock('../mongodb/mongodb.user.service');

describe('PostService', () => {
  let service: PostService;
  let mongoDbPostService: MongodbPostService;
  let mongodbPostImageService: MongodbPostImageService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongodbModule],
      providers: [PostService],
    }).compile();

    service = module.get<PostService>(PostService);
    mongoDbPostService = module.get(MongodbPostService);
    mongodbPostImageService = module.get(MongodbPostImageService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('TESTING getAllPosts (GET /post)', () => {
    describe('When calling with NaN parameters', () => {
      let result: PostExportInterface[] | Error;
      beforeEach(async () => {
        try {
          result = await service.getAllPosts({ maxPost: NaN, page: NaN });
        } catch (e) {
          result = e;
        }
      });

      it('should call db with default parameters', async () => {
        expect(mongoDbPostService.getAllPosts).toHaveBeenCalledWith({
          maxPost: 6,
          page: 1,
        });
      });

      it('should return one post', () => {
        expect(result).toEqual([postExportStub()]);
      });
    });

    describe('when callling with number parameters', () => {
      let result: PostExportInterface[] | Error;
      beforeEach(async () => {
        try {
          result = await service.getAllPosts({ maxPost: 10, page: 2 });
        } catch (e) {
          result = e;
        }
      });

      it('result should be array', () => {
        expect(result).toBeInstanceOf(Array);
      });

      it('should call db with given parameters', async () => {
        expect(mongoDbPostService.getAllPosts).toHaveBeenCalledWith({
          maxPost: 10,
          page: 2,
        });
      });
    });

    describe('when calling with negative numbers', () => {
      let result: PostExportInterface[] | Error;
      beforeEach(async () => {
        try {
          result = await service.getAllPosts({ maxPost: -1, page: -10 });
        } catch (e) {
          result = e;
        }
      });

      it('should return one post', () => {
        expect(result).toEqual([postExportStub()]);
      });

      it('should call db with default parameters', async () => {
        expect(mongoDbPostService.getAllPosts).toHaveBeenCalledWith({
          maxPost: 6,
          page: 1,
        });
      });
    });
  });

  describe('TESTING createPost (POST /post)', () => {
    describe('when calling with normal input', () => {
      let result: PostExportInterface | undefined;

      beforeEach(async () => {
        try {
          result = await service.createPost(
            [multerFileStub()],
            postStub(),
            userStub(),
          );
        } catch (_e) {
          result = undefined;
        }
      });

      it('then should return interface', () => {
        expect(result).toBeDefined();
      });

      it('then should call db to upload image', () => {
        expect(mongodbPostImageService.saveImage).toHaveBeenCalledTimes(1);
      });

      it('then should call db to upload image with given parameters', () => {
        expect(mongodbPostImageService.saveImage).toHaveBeenCalledWith(
          multerFileStub().originalname,
          multerFileStub().mimetype,
          'e8b2e35ef48996ac55a7519640fbeee4fd7f2d595376a663ec873f562703b2dc',
        );
      });

      it('then should call db to create post', () => {
        expect(mongoDbPostService.createPost).toHaveBeenCalledTimes(1);
        const post = postStub();
        post['start_day'] = new Date(post['start_day']);
        post['end_day'] = new Date(post['end_day']);
        post['image_id'] = [imageStub().id];
        expect(mongoDbPostService.createPost).toHaveBeenCalledWith(
          post,
          userStub(),
        );
      });
    });
  });

  describe('TESTING getOnePost (GET /post/:postKey)', () => {
    describe('when calling with normal number', () => {
      let result: PostExportInterface | undefined;
      const postKey = postStub().key;
      beforeEach(async () => {
        try {
          result = await service.getOnePost(postKey);
        } catch (_e) {
          result = undefined;
        }
      });

      it('then should return interface', () => {
        expect(result).toBeDefined();
        expect(result?.key).toEqual(postKey);
      });

      it('then should call db to get one post', () => {
        expect(mongoDbPostService.getOnePost).toHaveBeenCalledTimes(1);
      });

      it('then should call db to get one post with given parameters', () => {
        expect(mongoDbPostService.getOnePost).toHaveBeenCalledWith(postKey);
      });
    });
  });

  describe('TESTING putOnePost (PUT /post/:postKey)', () => {
    describe('when calling with post update inputs', () => {
      let result: PostExportInterface | undefined;
      beforeEach(async () => {
        try {
          result = await service.putOnePost(
            postStub().key,
            [multerFileStub()],
            postStub(),
          );
        } catch (e) {
          result = undefined;
        }
      });

      it('then should return ExportInterface', () => {
        expect(result).toBeDefined();
        expect(result).toEqual(postExportStub());
      });

      it('then should call db to update post', () => {
        expect(mongoDbPostService.putOnePost).toHaveBeenCalledTimes(1);
      });

      it('then should call db to update post with given parameters', () => {
        const callPost = {
          ...postStub(),
          image_id: [imageStub().id],
        };
        callPost['start_day'] = new Date(callPost['start_day']);
        callPost['end_day'] = new Date(callPost['end_day']);
        expect(mongoDbPostService.putOnePost).toHaveBeenCalledWith(
          postStub().key,
          callPost,
        );
      });

      it("then should call db to get post's image", () => {
        expect(mongodbPostImageService.getImage).toHaveBeenCalledTimes(1);
      });

      it("then should call db to get post's image with given parameters", () => {
        expect(mongodbPostImageService.getImage).toHaveBeenCalledWith(
          multerFileStub().originalname,
          multerFileStub().mimetype,
          'e8b2e35ef48996ac55a7519640fbeee4fd7f2d595376a663ec873f562703b2dc',
        );
      });
    });
  });

  describe('TESTING deleteOnePost (DELETE /post/:postKey)', () => {
    describe('when calling with post delete inputs', () => {
      let result: boolean | undefined;
      beforeEach(async () => {
        try {
          result = await service.deleteOnePost(postStub().key, userStub());
        } catch (e) {
          result = undefined;
        }
      });

      it('then should return boolean', () => {
        expect(result).toBeDefined();
      });

      it('then should call db to delete post', () => {
        expect(mongoDbPostService.deleteOnePost).toHaveBeenCalledTimes(1);
      });

      it('then should call db to delete post with given parameters', () => {
        expect(mongoDbPostService.deleteOnePost).toHaveBeenCalledWith(
          postStub().key,
          userStub(),
        );
      });
    });
  });

  describe('TESTING filterPost', () => {
    describe('when calling with post filter query', () => {
      let result: PostExportInterface[] | undefined;
      beforeEach(async () => {
        try {
          result = await service.filterPost(filterStub());
        } catch (e) {
          result = undefined;
        }
      });

      it('then should return array', () => {
        expect(result).toBeDefined();
        expect(result).toEqual([postExportStub()]);
      });

      it('then should call db to filter post', () => {
        expect(mongoDbPostService.filterPost).toHaveBeenCalledTimes(1);
      });

      it('then should call db to filter post with given parameters', () => {
        expect(mongoDbPostService.filterPost).toHaveBeenCalledWith(
          filterStub(),
        );
      });
    });
  });
});
