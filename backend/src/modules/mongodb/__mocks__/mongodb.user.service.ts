import { userStub } from '../../../stubs/mongodb.stub';

export const MongodbUserService = jest.fn().mockReturnValue({
  getOneUser: jest.fn().mockReturnValue(userStub()),
  getAllUser: jest.fn().mockReturnValue([userStub()]),
  getUserByKey: jest.fn().mockReturnValue(userStub()),
  createUser: jest.fn().mockReturnValue(userStub()),
  validateUser: jest.fn().mockReturnValue(userStub()),
  putOneUser: jest.fn().mockReturnValue(userStub()),
  deleteOneUser: jest.fn().mockReturnValue(userStub()),
  filterUser: jest.fn().mockReturnValue([userStub()]),
});
