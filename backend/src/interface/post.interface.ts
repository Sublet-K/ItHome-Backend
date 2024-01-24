import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class PostBase {
  @IsString()
  basic_info: string;

  @IsString()
  benefit: string;

  @IsString()
  description: string;

  @IsDateString()
  end_day: string | Date;

  @IsString()
  extra_info: string;

  @IsInt()
  @IsNumber()
  max_duration: number;

  @IsInt()
  @IsNumber()
  min_duration: number;

  @IsString()
  position: string;

  @IsString()
  refund_policy: string;

  @IsString()
  rule: string;

  @IsDateString()
  start_day: string | Date;

  @IsString()
  title: string;

  @IsInt()
  @IsNumber()
  price: number;

  @IsNumber()
  limit_people: number;

  @IsNumber()
  number_room: number;

  @IsNumber()
  number_bathroom: number;

  @IsNumber()
  number_bedroom: number;

  @IsString()
  accomodation_type: string; //건물 유형

  @IsString()
  building_type: string; //아파트인지, 주택인지

  @IsPositive()
  @IsNumber()
  x_coordinate: number;

  @IsPositive()
  @IsNumber()
  y_coordinate: number;

  @IsString()
  city: string;

  @IsString()
  gu: string;

  @IsString()
  dong: string;

  @IsString()
  street: string;

  @IsString()
  street_number: string;

  @IsString()
  post_code: string;

  @Transform(({ key, obj }) => {
    const value = obj[key].toLowerCase();
    if (value === 'true') return true;
    else if (value === 'false') return false;
    else return undefined;
  })
  @IsBoolean()
  contract: boolean;

  @Transform(({ key, obj }) => {
    const value = obj[key].toLowerCase();
    if (value === 'true') return true;
    else if (value === 'false') return false;
    else return undefined;
  })
  @IsBoolean()
  local_save: boolean;
}

export class PostPartialBase {
  @IsString()
  @IsOptional()
  basic_info?: string;

  @IsString()
  @IsOptional()
  benefit?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  end_day?: string | Date;

  @IsString()
  @IsOptional()
  extra_info?: string;

  @IsInt()
  @IsNumber()
  @IsOptional()
  max_duration?: number;

  @IsInt()
  @IsNumber()
  @IsOptional()
  min_duration?: number;

  @IsString()
  @IsOptional()
  position?: string;

  @IsString()
  @IsOptional()
  refund_policy?: string;

  @IsString()
  @IsOptional()
  rule?: string;

  @IsDateString()
  @IsOptional()
  start_day?: string | Date;

  @IsString()
  @IsOptional()
  title?: string;

  @IsInt()
  @IsNumber()
  @IsOptional()
  price?: number;

  @IsOptional()
  @IsString()
  accomodation_type?: string; //건물 유형

  @IsOptional()
  @IsString()
  building_type?: string; //아파트인지, 주택인지

  @IsOptional()
  @Transform(({ key, obj }) => {
    const value = obj[key].toLowerCase();
    if (value === 'true') return true;
    else if (value === 'false') return false;
    else return undefined;
  })
  @IsBoolean()
  contract?: boolean;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  x_coordinate?: number;

  @IsOptional()
  @IsPositive()
  @IsString()
  y_coordinate?: number;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  gu?: string;

  @IsOptional()
  @IsString()
  dong?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  street_number?: string;

  @IsOptional()
  @IsString()
  post_code?: string;

  @Transform(({ key, obj }) => {
    const value = obj[key].toLowerCase();
    if (value === 'true') return true;
    else if (value === 'false') return false;
    else return undefined;
  })
  @IsBoolean()
  @IsOptional()
  local_save?: boolean;
}

export class PostExportInterface extends PostBase {
  key: number;
  image_id: string[];
  postuser_id: string;
  post_date: Date | string;
  private: boolean;
  request: boolean;
}

export class PostInterface extends PostExportInterface {
  id: string;
  deleted: boolean;
  version: number;
}
