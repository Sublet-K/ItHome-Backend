import { reservationInterfaceStub } from '../../../stubs/mongodb.stub';

export const MongodbReservationService = jest.fn().mockReturnValue({
  createReservation: jest.fn().mockReturnValue(true),
  filterReservation: jest.fn().mockReturnValue([reservationInterfaceStub()]),
  getAllReservations: jest.fn().mockReturnValue([reservationInterfaceStub()]),
  deleteOneReservation: jest.fn().mockReturnValue(reservationInterfaceStub()),
  getReservationKey: jest.fn().mockReturnValue(1),
  getReservationMaxKey: jest.fn().mockReturnValue(1),
});
