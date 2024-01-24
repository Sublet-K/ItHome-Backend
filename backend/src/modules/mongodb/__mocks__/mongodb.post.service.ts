import { postStub } from '../../../stubs/mongodb.stub';

export const MongodbPostService = jest.fn().mockReturnValue({
  getAllPosts: jest.fn().mockReturnValue([postStub()]),
  getPostMaxKey: jest.fn().mockReturnValue(1),
  createPost: jest.fn().mockReturnValue(postStub()),
  getOnePost: jest.fn().mockReturnValue(postStub()),
  putOnePost: jest.fn().mockReturnValue(postStub()),
  deleteOnePost: jest.fn().mockReturnValue(true),
  filterPost: jest.fn().mockReturnValue([postStub()]),
});
