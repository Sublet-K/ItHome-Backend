import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const roomOptionsStore = create(
	persist(
		set => ({
			roomOptinos: {
				price: 1,
				start_day: '2024-04-05T00:00:00.000Z',
				end_day: '2024-04-05T00:00:00.000Z',
				limit_people: 1,
				number_room: 1,
				number_bathroom: 1,
				number_bedroom: 1,
				accomodation_type: 'short',
				building_type: 'oneRoom',
				contract: 'borrow',
				city: '',
				gu: '',
				dong: '',
				alarm: '',
				school: '',
			},
			setRoomOptions: newRoomOptions =>
				set({
					roomOptions: newRoomOptions,
				}),
		}),
		{
			name: 'roomOptionsStore-storage',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
