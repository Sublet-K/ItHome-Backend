import { imageStub } from '../../../stubs/mongodb.stub';

export const MongodbPostImageService = jest.fn().mockReturnValue({
  getImage: jest.fn().mockReturnValue(imageStub()),
  saveImage: jest.fn().mockReturnValue(imageStub()),
});
