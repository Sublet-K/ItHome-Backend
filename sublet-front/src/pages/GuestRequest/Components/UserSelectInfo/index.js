import { AccomodationType } from "./BasicInfo/AccomodationType";
import { LocationOnButton, SearchPriceButton, SearchDateButton } from "./BasicInfo/LocationPriceDate";
import { BuildingType } from "./RoomInfo/BuildingType";
import { Contract } from "./RoomInfo/Contract";
import { LimitPeople } from "./RoomInfo/LimitPeople";
import { NumberBathroom } from "./RoomInfo/NumberBathroom";
import { NumberBedroom } from "./RoomInfo/NumberBedroom";
import { NumberRoom } from "./RoomInfo/NumberRoom";
import { RequestWord } from "./RequestWord/UserRequestWord";
import { MoreDetails } from "./MoreDetails/MoreDetails";


import * as s from '../styles/GuestRequest.styles.js';

export function UserSelectInfo() {

	return (
		<div>
			<s.DetailTitle>* 기본 정보 입력</s.DetailTitle>
			<s.UserInfoContainer>
				<LocationOnButton />
				<SearchPriceButton />
			</s.UserInfoContainer>
			<s.UserInfoContainer2>
				<SearchDateButton />
				<AccomodationType />
			</s.UserInfoContainer2>
			<div>
				<s.DetailTitle>방 정보 입력</s.DetailTitle>
				<div>
					<Contract />
					<NumberRoom />
				</div>
				<div>
					<BuildingType />
					<LimitPeople />
				</div>
				<div>
					<NumberBathroom />
					<NumberBedroom />
					<RequestWord />
				</div>
				<MoreDetails />
			</div>
		</div>

	);
};