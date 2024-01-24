import { PostCreateDto, PostFilterQueryDto } from '@/dto/post.dto';
import { ReservationDto } from '@/dto/reservation.dto';
import { UserCreateDto, UserFilterDto, UserUpdateDto } from '@/dto/user.dto';
import { ImageInterface } from '@/interface/image.interface';
import { PostExportInterface, PostInterface } from '@/interface/post.interface';
import { ReservationInterface } from '@/interface/reservation.interface';
import { UserExportInterface, UserInterface } from '@/interface/user.interface';
import { Stream } from 'stream';

export const userStub = (): UserInterface => {
  return {
    id: 'mocked-id',
    user_id: 'mocked-user_id',
    username: 'mocked-username',
    email: 'mocked@mocked.com',
    phone: '+82010-1234-5678',
    password: 'Mocked-password1)',
    delete: false,
    version: 1,
    school: 'ABC Univ',
    id_card: false,
    image_id: 'default',
  };
};

export const userExportStub = (): UserExportInterface => {
  return {
    id: userStub().id,
    phone: userStub().phone,
    school: userStub().school,
    username: userStub().username,
    email: userStub().email,
    user_id: userStub().user_id,
    image_id: userStub().image_id,
    id_card: userStub().id_card,
  };
};

export const postCreateStub = (): PostCreateDto => {
  return {
    basic_info: 'mocked-basic_info',
    benefit: 'mocked-benefit',
    description: 'mocked-description',
    end_day: '2010-01-01',
    extra_info: 'mocked-extra_info',
    max_duration: 1,
    min_duration: 1,
    position: 'mocked-position',
    refund_policy: 'mocked-refund_policy',
    rule: 'mocked-rule',
    start_day: '2000-01-01',
    title: 'mocked-title',
    price: 1,
    limit_people: 3,
    number_room: 3,
    number_bathroom: 3,
    number_bedroom: 3,
    accomodation_type: '전대', //건물 유형
    building_type: '아파트', //아파트인지, 주택인지
    contract: false,
    x_coordinate: 3.0,
    y_coordinate: 3.0,
    city: 'mock-city',
    gu: 'mock-gu',
    dong: 'mock-dong',
    street: 'mock-street',
    street_number: 'mock-street-number',
    post_code: 'mock-post-code',
    local_save: false,
  };
};

export const postExportStub = (): PostExportInterface => {
  const createStub = postCreateStub();

  return {
    ...createStub,
    key: 1,
    image_id: ['mocked-image_id'],
    postuser_id: 'mocked-postuser_id',
    post_date: 'mocked-post_date',
    start_day: new Date(createStub.start_day).toISOString(),
    end_day: new Date(createStub.end_day).toISOString(),
    private: false,
    request: false,
  };
};

export const postStub = (): PostInterface => {
  return {
    ...postExportStub(),
    id: 'mocked-id',
    deleted: false,
    version: 1,
  };
};

export const imageStub = (): ImageInterface => {
  return {
    id: 'mocked-id1',
    filename: 'mocked-filename1',
    filetype: 'mocked-filetype1',
    image_hash: 'mocked-image_hash1',
  };
};

export const multerFileStub = (): Express.Multer.File => {
  return {
    fieldname: 'mocked-fieldname',
    originalname: 'mocked-originalname',
    encoding: 'mocked-encoding',
    mimetype: 'image/jpeg',
    destination: 'mocked-destination',
    filename: 'mocked-filename',
    path: 'mocked-path',
    size: 1,
    stream: Stream.Readable.from('mocked-stream'),
    buffer: Buffer.from('mocked-buffer'),
  };
};

export const filterStub = (): PostFilterQueryDto => {
  return {
    maxPost: 16,
    page: 1,
    fromDate: '2000-01:01',
    toDate: '2010-01-01',
  };
};

export const userCreateStub = (): UserCreateDto => {
  return {
    username: 'mocked-username',
    email: 'mocked@mocked.com',
    phone: '+82010-1234-5678',
    password: 'Mocked-password1)',
    school: userStub().school,
    user_id: 'mocked-user_id',
  };
};
export const userUpdateStub = (): UserUpdateDto => {
  return {
    username: 'mocked-username',
    email: 'mocked@mocked.com',
    phone: '+82010-1234-5678',
    password: 'Mocked-password1))',
    school: 'ABC univ',
    user_id: 'mocked-user_id',
    image_id: 'second image',
  };
};

export const userFilterStub = (): UserFilterDto => {
  return {
    school: 'ABC univ',
  };
};

export const reservationStub = (): ReservationDto => {
  return {
    key: 2,
    user_id: 'mocked-userid',
    post_key: '1',
    r_start_day: '2024-01-10T00:00:00.000Z',
    r_end_day: '2024-04-05T00:00:00.000Z',
    pay: 50000,
  };
};

export const reservationInterfaceStub = (): ReservationInterface => {
  return {
    id: 'mocked-id',
    key: 2,
    user_id: 'mocked-userid',
    post_key: '1',
    r_start_day: '2024-01-10T00:00:00.000Z',
    r_end_day: '2024-04-05T00:00:00.000Z',
    pay: 50000,
    User: {
      ...userExportStub(),
    },
    Post: {
      ...postExportStub(),
    },
  };
};
