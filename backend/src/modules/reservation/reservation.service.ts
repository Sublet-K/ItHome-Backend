import { UserInterface } from '@/interface/user.interface';
import { Injectable } from '@nestjs/common';
import { ReservationCreateDto } from '@/dto/reservation.dto';
import { MongodbReservationService } from '../mongodb/mongodb.reservation.service';

@Injectable()
export class ReservationService {
  constructor(private db: MongodbReservationService) {}

  async createReservation(data: ReservationCreateDto, user: UserInterface) {
    const res = await this.db.createReservation(data, user);
    if (!res) {
      throw new Error(
        '[reservation.service:createReservation] reservation fail',
      );
    }
    return res;
  }

  async getAllReservation(user_id: string) {
    const res = await this.db.getAllReservations(user_id);
    return res;
  }

  async deleteOneReservation(key: number, user: UserInterface) {
    const res = await this.db.deleteOneReservation(key, user);
    return res;
  }
}
