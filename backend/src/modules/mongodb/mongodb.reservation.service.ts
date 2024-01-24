import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ReservationExportInterface,
  ReservationInterface,
} from '@/interface/reservation.interface';
import { reservationIncrementKeyInterface } from '@/interface/incrementkey.interface';
import { UserInterface } from '@/interface/user.interface';
import {
  ReservationCreateDto,
  ReservationFilterDto,
} from '@/dto/reservation.dto';

@Injectable()
export class MongodbReservationService {
  RESERVATION_VERSION = 1;
  RESERVATION_INCREMENTKEY_VERSION = 1;
  constructor(private prisma: PrismaService) {}

  async createReservation(data: ReservationCreateDto, user: UserInterface) {
    const key = Number(await this.getReservationKey());
    console.log('key', key);
    const available = await this.filterReservation(data);

    const getDateDiff = (d1: string | Date, d2: string | Date) => {
      const date1 = new Date(d1);
      const date2 = new Date(d2);

      const diffDate = date1.getTime() - date2.getTime(); //gettime 함수는  number of milliseconds로 return함

      return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
    };
    const pay = getDateDiff(data.r_end_day, data.r_start_day) * data.pay;

    if (available.length < 1) {
      await this.prisma.reservation.create({
        data: {
          r_start_day: data.r_start_day,
          r_end_day: data.r_end_day,
          pay: pay,
          User: {
            connect: {
              user_id: user.user_id,
            },
          },
          Post: {
            connect: {
              key: Number(data.post_key),
            },
          },
          version: this.RESERVATION_VERSION,
          key: await this.getReservationKey(),
        },
      });
    } else {
      throw new Error('reserved date');
    }
    return true;
  }

  async filterReservation(data: ReservationFilterDto) {
    const reservation_date = {
      gte: new Date(data.r_start_day || '0'), //날짜 현재로 수정해서 지난건 안보이게?
      lte: new Date(data.r_end_day || '9999-12-31'),
    };

    const reservation_list: ReservationInterface[] =
      await this.prisma.reservation.findMany({
        where: {
          r_start_day: reservation_date,
          r_end_day: reservation_date,
          key: data.key,
          version: { gte: this.RESERVATION_VERSION },
          deleted: false,
        },
        include: {
          User: true, //query 받아서 결정하도록, 이거 다하면 너무 heavy함
          Post: {
            include: {
              postuser: true,
            },
          },
        },
      });
    return reservation_list;
  }

  async getAllReservations(user_id: string) {
    // 특정 유저의 모든 예약을 가져옴, 나중에는 Query Parameter을 이용해 필터하여 가져옴

    const reservation_list: ReservationInterface[] =
      await this.prisma.reservation.findMany({
        where: {
          version: { gte: this.RESERVATION_VERSION },
          deleted: false,
        },
        include: {
          User: true, //query 받아서 결정하도록, 이거 다하면 너무 heavy함
          Post: {
            include: {
              postuser: true,
            },
          },
        },
      });
    const final_list: ReservationInterface[] = [];
    reservation_list.map((reservation) => {
      if (reservation['User'].user_id == user_id) {
        final_list.push(reservation);
      }
    });

    return final_list;
  }

  async deleteOneReservation(key: number, user: UserInterface) {
    //const resKey=Number(key)
    console.log(key, user);
    await this.prisma.reservation.update({
      where: {
        key,
        User: {
          user_id: user['user_id'],
        },
        version: { gte: this.RESERVATION_VERSION },
        deleted: false,
      },
      data: {
        deleted: true,
      },
    });

    return true;
  }

  async getReservationKey() {
    // incrementKey 테이블의 첫 번째 데이터를 가져옴
    let data: reservationIncrementKeyInterface | null =
      await this.prisma.reservationIncrementKey.findFirst({
        where: {
          version: { gte: this.RESERVATION_INCREMENTKEY_VERSION },
        },
      });
    if (!data) {
      data = await this.prisma.reservationIncrementKey.create({
        data: {
          reservationKey: await this.getReservationMaxKey(),
          version: this.RESERVATION_INCREMENTKEY_VERSION,
        },
      });
      if (!data)
        throw Error("[mongodb.service:getReservationKey] can't create data");
    }
    const updated: reservationIncrementKeyInterface =
      await this.prisma.reservationIncrementKey.update({
        where: {
          version: { gte: this.RESERVATION_INCREMENTKEY_VERSION },
          id: data.id,
        },
        data: { reservationKey: { increment: 1 } },
      });

    // 증가된 postKey 값을 전달
    return updated.reservationKey;
  }

  async getReservationMaxKey() {
    const reservations: ReservationExportInterface[] =
      await this.prisma.reservation.findMany({});
    if (!reservations || reservations.length === 0) return 0;
    return reservations.reduce((prev, cur) => {
      return Math.max(prev, cur.key);
    }, reservations[0].key);
  }
}
