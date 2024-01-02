import { imageStub, postStub, userStub } from './stubs/mongodb.stub';

export const MongodbService = jest.fn().mockReturnValue({
  getAllPosts: jest.fn().mockReturnValue([postStub()]),
  getPostKey: jest.fn().mockReturnValue(1),
  createPost: jest.fn().mockReturnValue(postStub()),
  getOnePost: jest.fn().mockReturnValue(postStub()),
  putOnePost: jest.fn().mockReturnValue(postStub()),
  deleteOnePost: jest.fn().mockReturnValue(true),
  getImage: jest.fn().mockReturnValue(imageStub()),
  saveImage: jest.fn().mockReturnValue(imageStub()),
  getOneUser: jest.fn().mockReturnValue(userStub()),
  getAllUser: jest.fn().mockReturnValue([userStub()]),
  getUserByKey: jest.fn().mockReturnValue(userStub()),
  createUser: jest.fn().mockReturnValue(userStub()),
  validateUser: jest.fn().mockReturnValue(userStub()),
  putOneUser: jest.fn().mockReturnValue(userStub()),
  deleteOneUser: jest.fn().mockReturnValue(userStub()),
  filterPost: jest.fn().mockReturnValue([postStub()]),
  filterUser: jest.fn().mockReturnValue([userStub()]),
});
